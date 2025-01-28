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
import { CreateAnnouncements, createAnnouncements, createEvents, CreateEvents, CreateNews, createNews } from '@/validations/validatiion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck } from 'lucide-react'



export default function CreateAnnouncement() {
    const [isValidated, setIsvalidated] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [program, setProgram] = useState('')
    const router = useRouter()

      //form validation
      const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<CreateAnnouncements>({
        resolver: zodResolver(createAnnouncements),
        defaultValues: {
            
          },
    })

    //create events
    const onSubmit = async (data: CreateAnnouncements) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subject/createsubject`,{
              name: ''
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Registering account....',
                success: `Registered successfully`,
                error: 'Error while registering account out',
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
  


    return (
        <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger className=' light-btn'>
            <img src='/icons/plus-square.png' height={15} width={15}/>Create
        </DialogTrigger>
        <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
            <DialogHeader>
            <DialogTitle className=' text-lg'>Create Announcement</DialogTitle>
            <DialogDescription className=' text-xs'>
                Enter news details below.
            </DialogDescription>
            </DialogHeader>
           
                <form onSubmit={handleSubmit(onSubmit)} className={` w-full flex flex-col`}>
                    

                    <label htmlFor="firstname" className=' mt-2'>Title</label>
                    <input type="text" placeholder='Title' className=' input-primary' {...register('title')}/>
                    <p className=" text-[.6rem] text-red-500">{errors.title?.message}</p>


                    <Tabs defaultValue="Text" className=" w-full text-xs mt-4">
                    <TabsList className=' text-xs'>
                        <TabsTrigger value="Text">Text</TabsTrigger>
                        <TabsTrigger value="Image">Image</TabsTrigger>
                        <TabsTrigger value="Video">Video</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Text" className=' w-full'>
                        <textarea placeholder='Content' className=' input-primary h-[100px] w-full' {...register('content')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.content?.message}</p>
                    </TabsContent>
                    <TabsContent value="Image">
                    <div className=' w-full h-[100px] bg-blue-50 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-md'>
                        <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                          <div className=' w-full h-full flex flex-col items-center justify-center gap-1 text-[.7rem]'>
                            <FileCheck size={20}/>
                            <p>Click to upload</p>
                            <p>Pdf (MAX. 5mb)</p>

                            <p className=' text-zinc-400 mt-2'></p>
                          </div>

                                <input
                                className=" hidden"
                                  type="file"
                                  id="dropzone-file"
                                  accept="application/pdf"
                                  {...register('image')}
                                />
                        </label>
                      </div>
                      <p className=" text-[.6rem] text-red-500">{errors.image?.message}</p>

                    </TabsContent>

                    <TabsContent value="Video" className=' w-full'>
                        <input placeholder='Video url' className=' input-primary w-full' {...register('video')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.video?.message}</p>
                    </TabsContent>
                    </Tabs>



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
