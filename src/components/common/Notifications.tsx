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
import { Bell, Trash2 } from 'lucide-react'
import axios from 'axios'
import { formatDate } from '@/hooks/helpers'
import toast from 'react-hot-toast'

interface User {
    userId: string;
    userType: string;
}

interface Receiver {
    isRead: boolean;
    userId: string;
    userType: string;
    _id: string;
}

interface Notification {
    sender: User;
    _id: string;
    receiver: Receiver[];
    title: string;
    content: string;
    sendToAll: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Notifications() {
    const [notif, setNotif] = useState<Notification[]>([])
    const [open, setOpen] = useState(false)

    const unread = notif.filter((item) => item.receiver[0].isRead === false)

    useEffect(() => {
        const getData =  async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/getstudentnotification`,{
                withCredentials: true
            })
    
        setNotif(response.data.data)
    
        }
        getData()
      },[])

      const readNotif = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/readnotification`,{
                withCredentials:true
            })

            console.log(response.data)
        } catch (error) {
            
        }
      }

      useEffect (() => {
        if(open === true){
            readNotif()
            getData()
        }
      },[open])

      const getData =  async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/getstudentnotification`,{
            withCredentials: true
        })

    setNotif(response.data.data)
    }

    const deleteNotif = async () => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/deletereceiverfromnotification`,{
              withCredentials:true
          })

          if(response.data.message === 'success'){
            toast.success('All notifications deleted')
            getData()
          }
      } catch (error) {
          
      }
    }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className='relative bg-zinc-100 p-2 rounded-full'>
                    <Bell size={20}/>
                    {unread.length !== 0 && (
                        <div className=' absolute top-0 right-0 w-4 aspect-square rounded-full bg-red-600 -translate-y-1 translate-x-1 flex items-center justify-center'>
                            <p className=' text-[.6rem] text-white'>{unread.length}</p>
                        </div>

                        )}
                    
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=' relative w-[300px] max-h-[400px] overflow-y-auto' >
                      <DropdownMenuLabel className=' text-xs z-30 bg-white flex items-center justify-between'>
                        Notifications
                       
                        {notif.length !== 0 && (
                          <button onClick={deleteNotif} className=' text-red-600 flex items-center gap-1 text-[.7rem] underline'><Trash2 size={12}/> Delete All</button>

                        )}
                        </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {notif.length === 0 ? (
                        <div className=' h-[100px] flex items-center justify-center'>
                            <p className=' text-xs text-zinc-500 flex items-center gap-1'><Bell size={12}/>No notifications</p>
                        </div>
                      ) : (
                        <>
                        {notif.map((item, index) => (
                            <DropdownMenuItem key={item._id} className=' mb-1 flex items-center gap-2 bg-gray-100'>
                            <div className=' p-4 bg-gray-200 rounded-full'>
                              <Bell size={20}/>
                            </div>
    
                            <div className=' text-xs w-full flex flex-col'>
                              <p className=' font-medium'>{item.title}</p>
    
                              <div className='flex flex-col gap-1 text-[.6rem] text-zinc-600'>
                                <p className=' '>{item.content}</p>
                              </div>

                              <p className=' text-[.5rem] text-zinc-500'>{new Date(item.createdAt).toDateString()}</p>
    
                            </div>
                            </DropdownMenuItem>
                        ))}
                        

                       
                        </>
                      )}
                      
                  
                  
                  </DropdownMenuContent>
              </DropdownMenu>
  )
}
