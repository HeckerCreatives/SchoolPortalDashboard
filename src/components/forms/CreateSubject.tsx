import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { AddSubject, createSubject } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Levels = {
    id: string
    level: string
    program:string
}

export default function CreateSubject() {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [levels, setlevels] = useState<Levels[]>([])
    const [program, setProgram] = useState('')


    
     //form validation
     const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<AddSubject>({
        resolver: zodResolver(createSubject),
        defaultValues: {
            
          },
    })

    //create admin
    const onSubmit = async (data: AddSubject) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subject/createsubject`,{
              name: data.name,
              level: data.level
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Creating subject....',
                success: `Created successfully`,
                error: 'Error while creating subject',
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

    useEffect(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/getallgradelevel`,
              { withCredentials: true }
            );

            console.log(res.data)
            setlevels(res.data.data)
      
          } catch (error) {
          
          
          }
        };
  
        getList();
    
  }, []);



  return (
    <Dialog open={modal} onOpenChange={setModal}>
    <DialogTrigger className=' light-btn'>
        <img src='/icons/plus-square.png' height={15} width={15}/>Create
    </DialogTrigger>
    <DialogContent className=' text-xs'>
        <DialogHeader>
        <DialogTitle className=' text-lg'>Create Subject</DialogTitle>
        <DialogDescription className=' text-xs'>
            Enter subject name below.
        </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col'>

        <label htmlFor="firstname" className=' mt-2'>Grade Level</label>
        <Select 
        onValueChange={(value) => setValue('level', value)}
        >
            <SelectTrigger className="input-primary">
                <SelectValue placeholder="Select grade level" />
             </SelectTrigger>
            <SelectContent className=' text-xs'>
                {levels.map((item, index) => (
                    <SelectItem onClick={() => setProgram(item.program)} key={item.id} value={item.id}>{item.level}</SelectItem>
                ))}
                          
                          
            </SelectContent>
             </Select>
            <p className=" text-[.6rem] text-red-500">{errors.level?.message}</p>


            <label htmlFor="firstname" className=' mt-2'>Subject name</label>
            <input type="text" placeholder='Name' className=' input-primary' {...register('name')}/>
            <p className=" text-[.6rem] text-red-500">{errors.name?.message}</p>


            <div className=' w-full flex items-end justify-end mt-6'>
                <button disabled={loading} className=' action-btn'>
                    {loading === true && <span className=' loader'></span> }
                Save</button>

            </div>

        </form>
    </DialogContent>
    </Dialog>
  )
}
