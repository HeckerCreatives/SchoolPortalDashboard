'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createEvents, CreateEvents, createNews, CreateNews, editEvents, EditEvents } from '@/validations/validatiion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck } from 'lucide-react'

type Props = {
    id: string
    title: string
    content: string
    image: string
}

export default function EditEvent( prop: Props) {
    const [isValidated, setIsvalidated] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [program, setProgram] = useState('')
    const router = useRouter()
    const [file, setFile] = useState<File>()

      //form validation
      const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<CreateNews>({
        resolver: zodResolver(createNews),
        defaultValues: {
            title: prop.title,
            content: prop.content
          },
    })

    //edit events
    const onSubmit = async (data: CreateNews) => {
        setLoading(true)
        router.push('?state=true')
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/announcement/editannouncement`,{
                title: data.title,
                content:data.content,
                image: data.image,
                announcement: prop.id,
                writer: data.writer
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Creating news....',
                success: `News created successfully`,
                error: 'Error while creating news',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                setModal(false)
                reset()
                router.push('?state=false')
            }
    
            
        } catch (error) {
            setLoading(false)
             if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string, data: string }>;
                        if (axiosError.response && axiosError.response.status === 401) {
                            toast.error(`${axiosError.response.data.data}`)     
                        }
    
                        if (axiosError.response && axiosError.response.status === 400) {
                            toast.error(`${axiosError.response.data.data}`)     
                                
                        }
    
                        if (axiosError.response && axiosError.response.status === 402) {
                            toast.error(`${axiosError.response.data.data}`)          
                                    
                        }
    
                        if (axiosError.response && axiosError.response.status === 403) {
                            toast.error(`${axiosError.response.data.data}`)              
                            
                        }
    
                        if (axiosError.response && axiosError.response.status === 404) {
                            toast.error(`${axiosError.response.data.data}`)             
                        }
                } 
            
        }
        
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          setValue('image', file, { shouldValidate: true }); // Correctly set the file value
          setFile(file)
        }
      };


      console.log(errors)


    return (
        <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger className=' light-btn'>
            <img src='/icons/pen.png' width={15} height={15}/>Edit
        </DialogTrigger>
        <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
            <DialogHeader>
            <DialogTitle className=' text-lg'>Edit News/Announcement</DialogTitle>
            <DialogDescription className=' text-xs'>
                Edit event/announcement details below.
            </DialogDescription>
            </DialogHeader>
           
                <form onSubmit={handleSubmit(onSubmit)} className={` w-full flex flex-col`}>
                    
                    <label htmlFor="firstname" className=' mt-2'>Title</label>
                    <input type="text" placeholder='Title' className=' input-primary' {...register('title')}/>
                    <p className=" text-[.6rem] text-red-500">{errors.title?.message}</p>


                    {/* <div className=' flex items-center gap-4'>
                        <div className=' flex flex-col gap-1 w-full'>
                            <label htmlFor="firstname" className=' mt-2'>Start Date</label>
                            <input type="date" placeholder='' className=' input-primary' {...register('start')}/>
                            <p className=" text-[.6rem] text-red-500">{errors.start?.message}</p>

                        </div>

                        <div  className=' flex flex-col gap-1 w-full'>
                            <label htmlFor="firstname" className=' mt-2'>End Date</label>
                            <input type="date" placeholder='' className=' input-primary' {...register('end')}/>
                            <p className=" text-[.6rem] text-red-500">{errors.end?.message}</p>

                        </div>

                    </div> */}
                
                    <label htmlFor="firstname" className=' mt-2'>Content</label>
                    <textarea placeholder='Content' className=' input-primary h-[100px] w-full' {...register('content')}/>
                    <p className=" text-[.6rem] text-red-500">{errors.content?.message}</p>

                    <label htmlFor="firstname" className=' mt-2'>Image</label>
                    <div className=' w-full h-[100px] bg-blue-50 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-md'>
                        <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                          <div className=' w-full h-full flex flex-col items-center justify-center gap-1 text-[.7rem]'>
                            <FileCheck size={20}/>
                            <p>Click to upload</p>
                            <p>Pdf (MAX. 5mb)</p>
                            <p>{file?.name}</p>

                            <p className=' text-zinc-400 mt-2'></p>
                          </div>

                                <input
                                className=" hidden"
                                  type="file"
                                  id="dropzone-file"
                                 accept="image/jpeg, image/png, image/jpg"
                                    onChange={(e) => {
                                        handleImageChange(e); 
                                        register('image').onChange(e);
                                      }}
                                />
                        </label>
                      </div>

                        <label htmlFor="firstname" className=' mt-2'>Current Image</label>
                      <div className=' w-full aspect-video overflow-hidden bg-zinc-300 rounded-md'
                        // style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${prop.image})`, backgroundSize:'cover', backgroundPosition:'center'}}
                        >

                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${prop.image}`} />
                     
                      </div>

                      <label htmlFor="firstname" className=' mt-2'>Published by:</label>
                        <input placeholder='Writer' className=' input-primary w-full' {...register('writer')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.writer?.message}</p>


                
                    <div className=' w-full flex items-end justify-end mt-6 gap-2'>
                        <button className=' action-btn'>
                            {loading === true && <span className=' loader'></span> }
                            Save</button>
                    </div>
                   
                </form>
          
           

                
           
        </DialogContent>
        </Dialog>
  )
}
