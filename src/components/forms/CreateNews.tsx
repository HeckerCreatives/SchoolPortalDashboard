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
import { createEvents, CreateEvents, CreateNews, createNews } from '@/validations/validatiion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck } from 'lucide-react'



export default function CreateNewsHeadline() {
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
            
          },
    })

    //create news
    const onSubmit = async (data: CreateNews) => {
        router.push('?state=true')
        setLoading(true)
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/announcement/createannouncement`,{
              title: data.title,
              content:data.content,
              image: data.image,
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

    console.log(errors)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          setValue('image', file, { shouldValidate: true }); // Correctly set the file value
          setFile(file)
        }
      };
  


    return (
        <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger className=' light-btn'>
            <img src='/icons/plus-square.png' height={15} width={15}/>Create
        </DialogTrigger>
        <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
            <DialogHeader>
            <DialogTitle className=' text-lg'>Create</DialogTitle>
            <DialogDescription className=' text-xs'>
                Enter details below.
            </DialogDescription>
            </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className={` w-full flex flex-col`}>
                
                    <label htmlFor="firstname" className=' mt-2'>Title</label>
                    <input type="text" placeholder='Title' className=' input-primary' {...register('title')}/>
                    <p className=" text-[.6rem] text-red-500">{errors.title?.message}</p>

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
                                    accept="application/pdf,image/jpeg,image/png"
                                    onChange={(e) => {
                                        handleImageChange(e); 
                                        register('image').onChange(e);
                                      }}
                                />
                        </label>
                      </div>
                      <p className=" text-[.6rem] text-red-500">{errors.image?.message}</p>

                    <label htmlFor="firstname" className=' mt-2'>Published by:</label>
                    <input placeholder='Writer' className=' input-primary w-full' {...register('writer')}/>
                    <p className=" text-[.6rem] text-red-500">{errors.writer?.message}</p>



                    <div className=' w-full flex items-end justify-end mt-6 gap-2'>
                        <button className=' action-btn'>
                            {loading === true && <span className=' loader'></span> }
                            Create</button>
                    </div>
                   
                </form>
          
           

                
           
        </DialogContent>
        </Dialog>
  )
}
