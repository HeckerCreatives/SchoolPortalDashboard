'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import {  EditQuestTeacher, editQuestteacher } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props ={
   questtid: string
    qtitle:string
    qdescription: string
    points: string
 
}

export default function EditQuest( prop: Props) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<EditQuestTeacher>({
        resolver: zodResolver(editQuestteacher),
        defaultValues: {
            qtitle: prop.qtitle,
            qdesc: prop.qdescription,
            points: prop.points
          },
    })

const updateQuest = async (data: EditQuestTeacher) => {
    setLoading(true)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quest/updatequest`,{
           
            questid: prop.questtid,
            title: data.qtitle,
            description: data.qdesc,
            points: data.points,
            duedate: data.date
            
        },{
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
          }
        })

        if ( response.data.message === 'success') {
            toast.success('Successfully edited');
            window.location.reload()
            setLoading(false)
            setOpen(false)
    
            }

        console.log(response.data)
    } catch (error) {
    setLoading(false)
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
                router.push('/')
                toast.error(axiosError.response.data.data);
              }

            if (axiosError.response && axiosError.response.status === 400) {
              toast.error(axiosError.response.data.data);                
            }

            if (axiosError.response && axiosError.response.status === 402) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 403) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 404) {
              toast.error(axiosError.response.data.data);                
            }
        } 

        
    }
}

console.log(prop)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=''>
    <Edit size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-h-[80%] overflow-y-auto'>
        <DialogHeader>
        <DialogTitle>Edit Quest</DialogTitle>
        {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(updateQuest)} className=' w-full flex flex-col gap-1 text-sm'>
            <label htmlFor="">Title</label>
            <input type="text" placeholder='Title' className='input-primary w-full' {...register('qtitle')}/>
            <p className=" text-[.6rem] text-red-500">{errors.qtitle?.message}</p>


            <label htmlFor="">Description</label>
            <textarea placeholder='Description' className='input-primary w-full' {...register('qdesc')} />
            <p className=" text-[.6rem] text-red-500">{errors.qdesc?.message}</p>


        
            <label htmlFor="">Quest Points</label>
            <input type="text" placeholder='Description' className='input-primary w-full' {...register('points')}/>
            <p className=" text-[.6rem] text-red-500">{errors.points?.message}</p>

            <label htmlFor="">Quest End Date</label>
            <input type="date" placeholder='Description' className='input-primary w-full' {...register('date')}/>
            <p className=" text-[.6rem] text-red-500">{errors.date?.message}</p>


            <div className=' w-full flex items-end justify-end mt-4 gap-2'>
                <button  className=' action-btn text-xs'>
                    {loading === true &&(
                        <div className=' loader'></div>
                    )}
                    Save</button>

            </div>
        </form>
    </DialogContent>
    </Dialog>

    
  )
}
