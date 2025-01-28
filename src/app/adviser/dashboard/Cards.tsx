"use client"
import Cards from '@/components/common/Cards'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { setSchoolYear, SetSchoolYear, updateSchoolYear, UpdateSchoolYear } from '@/validations/validatiion'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type SchoolYear = {
  id: string
  startyear: number
  endyear: number
}

type Sy = {
  _id: string
   owner:string
   startyear: string
   endyear: string
   createdAt: string
   updatedAt: string
   currentstatus: string
}

export default function DashboardCards() {
  const router = useRouter();
  const [sy, setSY] = useState<SchoolYear>()
  const [currentsy, setCurrentSY] = useState('')
  const [startyear, setStartYear] = useState<number>(0);
  const [endyear, setEndYear] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Sy[]>([])
  const param = useSearchParams()
  const refresh = param.get('state')
  const [modal, setModal] = useState(false)

    


  //form validation
  const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
  } = useForm<UpdateSchoolYear>({
      resolver: zodResolver(updateSchoolYear),
      defaultValues: {
          sy: currentsy
        },
  })
  

  //set new school year
  const setNewSchoolYear = async (data: UpdateSchoolYear) => {
    setLoading(true)
    router.push('?state=true')
    try {
        const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schoolyear/setcurrentschoolyear?id=${data.sy}`,{
            withCredentials: true,
            headers:{
              'Content-Type': 'application/json'
            }
        })

        const response = await toast.promise(request, {
            loading: 'Updating SY....',
            success: `SY updated successfully successfully`,
            error: 'Error while updating SY',
        });

        if (response.data.message === 'success'){
            setLoading(false)
            router.push('?state=false')
            setModal(false)
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
    <div className=' w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <div className=' flex items-start gap-2 bg-white p-6 h-auto max-w-[350px] w-auto rounded-md text-sm '>
            <div className=' flex flex-col gap-2 w-full'>
              <p className=' text-xs text-zinc-400 font-light'>School Year</p>
              {sy === null || sy === undefined ? (
                <h2 className=' font-semibold ~text-xl/2xl'>No Current SY</h2>
              ) : (
                <h2 className=' font-semibold ~text-xl/2xl'>SY {sy?.startyear} - {sy?.endyear}</h2>
              )}
            </div>
            <div className=' w-fit mt-4'>
               
                  <Dialog open={modal} onOpenChange={setModal}>
                        <DialogTrigger className=' action-btn w-fit text-xs'>
                            Update
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Set New School Year</DialogTitle>
                            <DialogDescription className=' text-red-600'>
                                This action cannot be undone. This will permanently delete user applications credentials, requirements & staff schedules in previous school year.
                            </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(setNewSchoolYear)} className=' flex flex-col text-xs'>

                              <p>Current Sy: {sy?.startyear} - {sy?.endyear}</p>
                                <label htmlFor="firstname" className=' mt-2'>SY</label>
                                <Select 
                                defaultValue={currentsy}
                                  onValueChange={(value) => setValue('sy', value)} {...register('sy')}
                                >
                                    <SelectTrigger className="w-full text-xs bg-blue-50">
                                      <SelectValue placeholder="Select SY" />
                                    </SelectTrigger>
                                    <SelectContent className=' text-xs'>
                                        {list.map((item, index) => (
                                            <SelectItem  key={item._id} value={item._id}>SY {item.startyear} - {item.endyear}</SelectItem>
                                        ))}
                                      
                                      
                                    </SelectContent>
                                </Select>
                                <p className=" text-[.6rem] text-red-500">{errors.sy?.message}</p>



                                <div className=' w-full flex items-end justify-end mt-6'>
                                    <button className=' action-danger'>
                                    {loading === true && <span className=' loader'></span> }
                                      Continue</button>
                                </div>
                            </form>

                           
                        </DialogContent>
                  </Dialog>

                        

            </div>
        </div>
        <Cards title={'Total Apllications'} count={99999}/>
        <Cards title={'Approved Apllications'} count={99999}/>
        <Cards title={'Rejected Apllications'} count={99999}/>
        <Cards title={'Total Examinees'} count={99999}/>
        <Cards title={'Examinees Passed'} count={99999}/>
        <Cards title={'Examinees Failed'} count={99999}/>
        <Cards title={'Total Enrolled'} count={99999}/>
        <Cards title={'Total Not Enrolled'} count={99999}/>
        

    </div>
  )
}
