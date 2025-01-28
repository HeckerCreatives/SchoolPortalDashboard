'use client'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
  
type SchoolYear = {
    id: string
    startyear: number
    endyear: number
}

export default function page() {
    const router = useRouter();

    const [schoolYear, setSchoolYear] = useState<SchoolYear>()
    const [startyear, setStartYear] = useState<number>(0);
    const [endyear, setEndYear] = useState<number>(0);
    
    useEffect(() => {
            const timeoutId = setTimeout(() => {
              const getList = async () => {
                try {
                  const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/schoolyear/getcurrentschoolyear`,
                    { withCredentials: true }
                  );
                  setSchoolYear(res.data.data)
                
                } catch (error) {
               
                  if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string; data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                      toast.error(`${axiosError.response.data.data}`);
                      router.push("/");
                    }
                  }
                }
              };
        
              getList();
            }, 500); 
    
            return () => clearTimeout(timeoutId);
    }, []);

    console.log(schoolYear)

  return (
    <SuperAdminLayout>
       <div className=' w-full flex gap-4'>

            <div className=' flex items-start gap-2 bg-white p-6 h-auto max-w-[350px] w-auto rounded-md text-sm '>
                <div className=' flex flex-col gap-2 w-full'>
                    <p className=' text-xs text-zinc-400 font-light'>Current School Year</p>
                    <h2 className=' font-semibold ~text-xl/2xl'>SY {schoolYear?.startyear} - {schoolYear?.endyear}</h2>
                    {/* <p className=' text-xs text-zinc-400 font-light'>Since last week</p> */}

                    <div className=' w-full mt-4'>
                        

                        <Dialog>
                        <DialogTrigger className=' action-btn w-fit'>
                            Update
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Set New School Year</DialogTitle>
                            <DialogDescription className=' text-red-500'>
                                This action cannot be undone. This will permanently delete user applications credentials & requirements in previous school year.
                            </DialogDescription>
                            </DialogHeader>

                            <form action="" className=' flex flex-col text-xs'>
                                <label htmlFor="">Start Year</label>
                                <input 
                                type="number" 
                                name="" 
                                id="" 
                                value={startyear}
                                onChange={(e) => setStartYear(Number(e.target.value))                                }
                                className=' input-primary'/>

                                <label htmlFor="">End Year</label>
                                <input 
                                type="number" 
                                name="" 
                                id="" 
                                value={endyear}
                                onChange={(e) => setEndYear(Number(e.target.value))}
                                className=' input-primary'/>                                <div className=' w-full flex items-end justify-end mt-6'>
                                    <button className=' action-btn'>Save</button>
                                </div>
                            </form>

                           
                        </DialogContent>
                        </Dialog>

                    </div>

                </div>
                <div className=' w-16 aspect-square rounded-full bg-pink-50 flex items-center justify-center'>
                    <img src="/icons/users-inactive.png" width={22} height={22} alt="users" />
                </div>
            </div>

            <div className=' flex items-start gap-2 bg-white p-6 h-auto max-w-[350px] w-auto rounded-md text-sm '>
                <div className=' flex flex-col gap-2 w-full'>
                    <p className=' text-xs text-zinc-400 font-light'>Enrollment Date</p>
                    <h2 className=' font-semibold ~text-xl/2xl'>SY 2024-2025</h2>

                    <p>00/00/00 - 00/00/00</p>
                    {/* <p className=' text-xs text-zinc-400 font-light'>Since last week</p> */}

                    <div className=' w-full mt-4'>
                        
                        <Dialog>
                        <DialogTrigger className=' action-btn w-fit'>
                            Update
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Set New Enrollment Schedule</DialogTitle>
                            <DialogDescription className=' text-red-500'>
                               
                            </DialogDescription>
                            </DialogHeader>

                            <form action="" className=' flex flex-col text-xs'>
                                <label htmlFor="">Start</label>
                                <input type="date" name="" id="" className=' input-primary'/>

                                <label htmlFor="">Start</label>
                                <input type="date" name="" id="" className=' input-primary'/>

                                <div className=' w-full flex items-end justify-end mt-6'>
                                    <button className=' action-btn'>Save</button>
                                </div>
                            </form>

                           
                        </DialogContent>
                        </Dialog>
                    </div>

                </div>
                <div className=' w-16 aspect-square rounded-full bg-pink-50 flex items-center justify-center'>
                    <img src="/icons/users-inactive.png" width={22} height={22} alt="users" />
                </div>
            </div>

            <div className=' flex items-start gap-2 bg-white p-6 h-auto max-w-[350px] w-auto rounded-md text-sm '>
                <div className=' flex flex-col gap-2 w-full'>
                    <p className=' text-xs text-zinc-400 font-light'>Staff Schedule</p>
                    <h2 className=' font-semibold ~text-xl/2xl'>SY 2024-2025</h2>
                    <div className=' w-full mt-4'>
                        
                        <Dialog>
                        <DialogTrigger className=' action-btn w-fit'>
                            Reset
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Reset Schedule</DialogTitle>
                            <DialogDescription className=' text-red-500'>
                                This action cannot be undone. This will permanently reset all the staff schedules.
                            </DialogDescription>
                            </DialogHeader>

    
                                <div className=' w-full flex items-end justify-end mt-6 text-xs'>
                                    <button className=' action-danger'>Continue</button>
                                </div>
                        
                        </DialogContent>
                        </Dialog>
                    </div>

                </div>
                <div className=' w-16 aspect-square rounded-full bg-pink-50 flex items-center justify-center'>
                    <img src="/icons/users-inactive.png" width={22} height={22} alt="users" />
                </div>
            </div>
       </div>
    </SuperAdminLayout>
  )
}
