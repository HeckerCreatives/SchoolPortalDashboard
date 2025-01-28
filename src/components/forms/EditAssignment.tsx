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
import { CreateAssingment, createAssingmentteacher, EditAssingment, editAssingmentteacher } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props ={
   assignmentid: string
    title:string
    description: string
    duedate: string
    maxscore: string
 
}

export default function EditAssignment( prop: Props) {
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
    } = useForm<EditAssingment>({
        resolver: zodResolver(editAssingmentteacher),
        defaultValues: {
            title: prop.title,
            desc: prop.description,
            deadline: prop.duedate.split('T')[0],
            score: prop.maxscore as any
          },
    })

const editAssingment = async (data: EditAssingment) => {
    setLoading(true)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/assignment/editassigment`,{
            assignmentid: prop.assignmentid,
            title: data.title,
            description: data.desc,
            duedate: data.deadline,
            maxscore: data.score,
           
        },{
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
          }
        })

        if ( response.data.message === 'success') {
            toast.success('Successfully edited');
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
    <DialogTrigger className='action-btn text-[.6rem]'>
    <Edit size={15}/>Edit
    </DialogTrigger>
    <DialogContent className=' max-h-[80%] overflow-y-auto'>
        <DialogHeader>
        <DialogTitle>Edit Assignment / Activities</DialogTitle>
        {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(editAssingment)} className=' w-full flex flex-col gap-1 text-sm'>
            <label htmlFor="">Title</label>
            <input type="text" placeholder='Title' className='input-primary w-full' {...register('title')}/>
            <p className=" text-[.6rem] text-red-500">{errors.title?.message}</p>


            <label htmlFor="">Description</label>
            <textarea placeholder='Description' className='input-primary w-full' {...register('desc')} />
            <p className=" text-[.6rem] text-red-500">{errors.desc?.message}</p>


        
            <label htmlFor="">Total score</label>
            <input type="text" placeholder='Description' className='input-primary w-full' {...register('score')}/>
            <p className=" text-[.6rem] text-red-500">{errors.score?.message}</p>


            <label htmlFor="">Deadline</label>
            <input type="date" placeholder='Date' className='input-primary w-full' {...register('deadline')}/>
            <p className=" text-[.6rem] text-red-500">{errors.deadline?.message}</p>

          




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
