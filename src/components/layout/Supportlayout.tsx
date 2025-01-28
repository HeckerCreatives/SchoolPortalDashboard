'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LogIn } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setDate } from 'date-fns';

interface Data {
    _id: string
    username: string
    status: string
    auth: string
    fullname: string
    email: string
}

export default function Supportlayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const router = useRouter()
    const [data, setData] = useState<Data>()

    const logout = async () => {
        try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json'
            }
        })
    
        if(response.data.message === 'success'){
            router.push('/')
            toast.success('Logged out')
          }
    
    
        } catch (error) {
    
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
    
    }

    useEffect(() => {
        const getData = async () => {
         
            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/getuserdetails`,
                { withCredentials: true }
              );

              console.log(response.data)
              setData(response.data.data)
              
            } catch (error) {
              console.error('Error fetching messages:', error);
            }
        };
        getData();
      }, []);


  return (
    <div className=' w-full h-screen flex flex-col items-center bg-zinc-100' >

        <div className=' w-full h-full max-w-[1240px] flex flex-col gap-4 md:gap-8 bg-gray-50'>

            <header className=' bg-white w-full h-[70px] flex items-center justify-between px-4 md:px-6 border-b-2 border-gray-100'>

            <div className=' relative z-10 w-full flex items-center justify-start gap-2'>
               <div className=' w-10 aspect-square rounded-full bg-zinc-300'>

               </div>
               <p className=' text-lg font-medium'>logo</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className=' focus:ring-0'>
                    <div className=" flex items-center  gap-2 text-xs text-zinc-400">
                        <div className=" flex flex-col">
                            <p>{data?.username}</p>
                        </div>
                        <div className=" w-10 aspect-square rounded-full bg-zinc-200">
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuLabel className=' text-xs'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=' text-xs flex items-center gap-2'><button onClick={logout}  className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                 
                 
                </DropdownMenuContent>
            </DropdownMenu>

            </header>
            {children}
        </div>

    </div>
  )
}
