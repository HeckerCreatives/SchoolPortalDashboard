"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
  Menu,
  LogOut,
  PanelsTopLeft,
  ChevronRight,
  ChevronDown,
  LogIn,
  Files,
  LayoutGrid,
  Bell,
  Wallet,
  RefreshCcw
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
import { Info } from '@/hooks/interface'
import { ChatBox } from '../support/CustomerSupport'
import useUserStore from '@/zustand/store'
import Notifications from '../common/Notifications'

interface Wallet {
  _id: string,
  owner: string
  amount: number,
  createdAt: string,
  updatedAt: string
}

  

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const [info, setInfo] = useState<Info>()
  const { userId, setUserId, clearUserId } = useUserStore();
  const [wallet, setWallet] = useState<Wallet>()
  

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

  useEffect(() => {
    const getData =  async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/studentuser/getstudentuserdetails`,{
            withCredentials: true
        })

    console.log(response.data)
    setInfo(response.data.data)
    setUserId(response.data.data.id)

    }
    getData()
  },[])

  useEffect(() => {
    const getData =  async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/studentuser/getstudentuserdetails`,{
            withCredentials: true
        })

    console.log(response.data)
    setInfo(response.data.data)
    setUserId(response.data.data.id)

    }
    getData()
  },[])

  useEffect(() => {
    const getData =  async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/getstudentwallet`,{
            withCredentials: true
        })

    console.log(response.data)
    setWallet(response.data.data)

    }
    getData()
  },[])
  
  return (
      <div className="grid min-h-screen w-full overflow-hidden bg-blue-600 text-black ">
        
        <div className=" w-full relative h-screen flex flex-col overflow-y-auto bg-zinc-100">
            <div className=' flex items-center justify-center w-full border-b-[1px] bg-white '>
              <header className=" w-full max-w-[1240px] bg-white sticky top-0 z-50 flex h-14 items-center justify-between gap-4 bg-secondary p-4 lg:h-[80px] lg:px-6">
              <div className=' flex items-center w-full  gap-4 h-[74px] '>

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

                <p className=' text-lg font-medium'>Logo</p>


                <Breadcrumb />

              </div>

              <div className=' flex items-center gap-2'>

              <DropdownMenu>
                  <DropdownMenuTrigger className='relative bg-zinc-100 p-2 rounded-full'>
                    <Wallet size={20}/>
                   
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=' w-[300px]' >
                      <DropdownMenuLabel className=' text-xs'>Wallet</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className=' h-auto mb-1 p-4 flex items-start gap-2 bg-gray-100'>
                      
                        <div className=' text-xs w-full flex flex-col gap-1'>
                          <p className=' text-zinc-500 text-xs'>Your points</p>
                          <h2 className=' text-2xl font-semibold'>{wallet?.amount.toLocaleString()} <span className=' text-xs text-pink-500'>pts</span></h2>

                          <p className=' text-zinc-400 font-medium text-xs'>{(wallet?.amount || 0 ) / 10} php</p>

                          <button className=' action-btn flex items-center justify-center mt-2'>Convert</button>


                        </div>

                        <button className=' flex items-start h-full'>
                          <RefreshCcw size={20}/>
                        </button>
                      </DropdownMenuItem>

                      <DropdownMenuItem className=' h-auto mb-1 p-4 flex items-start gap-2 bg-gray-100'>
                      
                        <div className=' text-xs w-full flex flex-col gap-1'>
                          <p className=' text-zinc-500 text-xs'>Your load balance</p>
                          <h2 className=' text-2xl font-semibold'>1000.00 <span className=' text-xs text-pink-500'>php</span></h2>



                        </div>

                        <button className=' flex items-start h-full'>
                          <RefreshCcw size={20}/>
                        </button>
                      </DropdownMenuItem>

                    
                  </DropdownMenuContent>
              </DropdownMenu>

              <Notifications/>

              </div>

              

              <DropdownMenu>
                  <DropdownMenuTrigger className=' focus:ring-0'>
                      <div className=" flex items-center  gap-2 text-xs text-zinc-400">
                          <div className=" flex flex-col">
                              <p>{info?.basicinfo.firstname}</p>
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
            </div>
            <div className=' w-full flex items-center justify-center mt-8 '>
              <div className=' w-full max-w-[1240px] flex items-center px-6 gap-2 text-xs'>
                <a href="/student/enrollment" className={` flex ${path.includes('/student/enrollment') ? ' border-b-4 border-pink-500' : ''} bg-white p-2 items-center gap-2`}> 
                <Files size={15}/>
                  Enrollment</a>

                <a href="/student/dashboard" className={` flex ${path.includes('/student/dashboard') ? ' border-b-4 border-pink-500' : ''} bg-white p-2 items-center gap-2`}> 
                <LayoutGrid size={15}/>
                  Dashboard</a>
                
              </div>

            </div>
          
          <main className=" relative flex flex-1 flex-col items-center gap-4 p-4 lg:p-12 ">
              {children}
          </main>
        </div>

        <ChatBox/>
      </div>
  )
}

