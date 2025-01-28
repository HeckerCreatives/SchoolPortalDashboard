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
import { AddSubject, createEnrollmentSched, CreateEnrollmentSched, createProgram, CreateProgram, createSubject, setSchoolYear, SetSchoolYear } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { list } from 'postcss'

type Program = {
    id: string
    name: string
}

export default function CreateEnrollmentSchedule() {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [list, setList] = useState<Program[]>([])
    const [program, setProgram] = useState('')

     //form validation
     const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<CreateEnrollmentSched>({
        resolver: zodResolver(createEnrollmentSched),
        defaultValues: {
            
          },
    })

    //create admin
    const onSubmit = async (data: CreateEnrollmentSched) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/enrollmentschedule/createenrollmentschedule`,{
                startdate: data.start,
                enddate: data.end,
                program: data.program
              
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Creating enrollemnt schedule....',
                success: `Created successfully`,
                error: 'Error while creating enrollment schedule',
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
              `${process.env.NEXT_PUBLIC_API_URL}/program/getallprogram?page=0&limit=99999`,
              { withCredentials: true }
            );

            console.log(res.data)
            setList(res.data.data)
      
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
        <DialogTitle className=' text-lg'>Create Enrollment Schedule</DialogTitle>
        <DialogDescription className=' text-xs'>
            Enter schedule details below.
        </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col'>
            <label htmlFor="firstname" className=' mt-2'>Start</label>
            <input type="date" placeholder='Name' className=' input-primary' {...register('start')}/>
            <p className=" text-[.6rem] text-red-500">{errors.start?.message}</p>

            <label htmlFor="firstname" className=' mt-2'>End</label>
            <input type="date" placeholder='Name' className=' input-primary' {...register('end')}/>
            <p className=" text-[.6rem] text-red-500">{errors.end?.message}</p>

            
            <label htmlFor="firstname" className=' mt-2'>Program</label>
                    <Select 
                   onValueChange={(value) => setValue('program', value)} {...register('program')}
                    >
                        <SelectTrigger className="w-full text-xs bg-blue-50">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                            {list.map((item, index) => (
                                <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))}
                          
                          
                        </SelectContent>
                    </Select>
                    <p className=" text-[.6rem] text-red-500">{errors.program?.message}</p>


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
