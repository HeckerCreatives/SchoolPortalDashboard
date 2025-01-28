'use client'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
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
  

export default function Fees() {
    const router = useRouter()

    useEffect(() => {
        const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollmentfee/initializefee`,
                { withCredentials: true }
              );
              
            
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

    }, []);

    useEffect(() => {
        const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollmentfee/getfee`,
                { withCredentials: true }
              );
              
            
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

    }, []);
  return (
    <div className=' w-full grid grid-cols-3 gap-4'>
        <div className=' w-full h-[500px] bg-white shadow-sm p-6 flex flex-col text-sm'>

            <div className=' flex items-center justify-between'>
                <h2 className=' font-medium'>Elementary <span className=' text-xs text-zinc-500'>(Enrollment Fees)</span></h2>
                

                <Dialog>
                <DialogTrigger className='p-2 bg-pink-100 rounded-md'>
                    <Plus size={15}/>
                </DialogTrigger>
                <DialogContent className=' text-sm'>
                    <DialogHeader>
                    <DialogTitle>Add fees</DialogTitle>
                    <DialogDescription>
                      
                    </DialogDescription>

                    <div className=' flex flex-col gap-1 mt-4 text-xs'>
                        <label htmlFor="">Name</label>
                        <input type="text" className=' input-primary' placeholder='Name'/>

                        <label htmlFor="" className=' mt-2'>Amount</label>
                        <input type="number" className=' input-primary' placeholder='Name'/>

                    </div>
                    </DialogHeader>
                </DialogContent>
                </Dialog>

            </div>

        </div>

        <div className=' w-full h-[500px] bg-white shadow-sm p-6 flex flex-col text-sm'>

            <div className=' flex items-center justify-between'>
                <h2 className=' font-medium'>High School <span className=' text-xs text-zinc-500'>(Enrollment Fees)</span></h2>
                <button className=' p-2 bg-pink-100 rounded-md'>
                    <Plus size={15}/>
                </button>
            </div>

        </div>

        <div className=' w-full h-[500px] bg-white shadow-sm p-6 flex flex-col text-sm'>

            <div className=' flex items-center justify-between'>
                <h2 className=' font-medium'>Senior High School <span className=' text-xs text-zinc-500'>(Enrollment Fees)</span></h2>
                <button className=' p-2 bg-pink-100 rounded-md'>
                    <Plus size={15}/>
                </button>
            </div>

        </div>

    </div>
  )
}
