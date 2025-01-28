"use client"
import React, { useEffect } from 'react'
import Link from "next/link"
import {
  Menu,
  LogOut,
  PanelsTopLeft,
  ChevronRight,
  ChevronDown,
  LogIn
} from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import home from '/icons/home.png'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { adviser, superadmin, teacher } from '@/routes/route'
import { Breadcrumb } from '../ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

  

export default function AdviserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const router = useRouter()

  const breadcrumd = superadmin.find((item) => path.includes(item.path))?.name

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
  
  return (
      <div className="grid min-h-screen w-full lg:grid-cols-[300px_1fr] overflow-hidden bg-blue-600 text-black ">
        <div className=" hidden lg:block">
          <div className=" relative flex h-full max-h-screen flex-col gap-2 bg-primary"
          style={{backgroundImage: "url(/assets/BG.png)"}}
          > <div className=' absolute w-full h-screen bg-white z-0 border-r-[1px] shadow-sm border-zinc-200'></div>
             <div className=' relative z-10 w-full flex items-center justify-start gap-2 p-8'>
               <div className=' w-10 aspect-square rounded-full bg-zinc-950'>

               </div>
               <p className=' text-lg font-medium'>logo</p>
            </div>
            <div className=" relative z-10 flex-1 mt-4 overflow-y-auto">
              <nav className=" flex flex-col px-2 text-sm lg:px-6 ">

                {adviser.map((item, index) => (
                    <div key={index}>
                   
                    <a key={index} href={item.path} className={` flex items-center gap-2 p-3 rounded-md ${path.includes(item.path) ? ' bg-pink-50 text-pink-600' : 'text-zinc-500'}`}>{item.icon}{item.name}</a>
                    </div>
                ))}

              </nav>
            </div>
            
          </div>
        </div>
        <div className=" relative h-screen flex flex-col overflow-y-auto bg-zinc-50">
          <header className=" sticky top-0 z-50 flex h-14 border-b-[1px] bg-white items-center justify-between gap-4 bg-secondary p-4 lg:h-[60px] lg:px-6">
            <div className=' flex items-center gap-4 h-[74px]'>

              <Sheet>
                <SheetTrigger className=' lg:hidden block text-black'>
                  <Menu size={15}/>
                </SheetTrigger>
                <SheetContent side="left" className=" flex flex-col bg-primary border-none bg-white"
               
                >
                  
                  <div className=' flex items-center gap-2 text-white p-4'>
                    <div className=' relative z-10 w-full flex items-center justify-start gap-2 text-black'>
                        <div className=' w-10 aspect-square rounded-full bg-zinc-950'>

                        </div>
                        <p className=' text-lg font-medium'>logo</p>
                    </div>
                  </div>
                  <nav className=" flex flex-col gap-2 px-2 text-sm font-medium">
                      {adviser.map((item, index) => (
                        <div key={index}>
                        
                        <a key={index} href={item.path} className={` flex items-center gap-2 p-3 rounded-md text-xs ${path.includes(item.path) ? ' bg-pink-50 text-pink-600' : 'text-zinc-500'}`}>{item.icon}{item.name}</a>

                       
                        </div>
                    ))}
                  </nav>
                
                </SheetContent>
              </Sheet>

              <p className=' text-xs font-medium'>Dashboard / {breadcrumd}</p>


              <Breadcrumb />

            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className=' focus:ring-0'>
                    <div className=" flex items-center  gap-2 text-xs text-zinc-400">
                        <div className=" flex flex-col">
                            <p>Adviser</p>
                        </div>
                        <div className=" w-10 aspect-square rounded-full bg-zinc-200">
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuLabel className=' text-xs'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=' text-xs flex items-center gap-2'><button onClick={logout} className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                 
                 
                </DropdownMenuContent>
            </DropdownMenu>
            
          
            

         
            
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 p-4 lg:p-12 ">
              {children}
          </main>
        </div>
      </div>
  )
}
