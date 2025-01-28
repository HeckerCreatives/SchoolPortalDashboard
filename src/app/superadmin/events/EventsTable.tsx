'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Pagination from '@/components/common/Pagination'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Check, X } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CreateNews from '@/components/forms/CreateNews'
import EditNews from '@/components/forms/EditNews'
import CreateEvent from '@/components/forms/CreateEvent'
import EditEvent from '@/components/forms/EditEvent'
  
type Data = {
    content: string
createdAt: string
id: string
image: string
title: string
} 

export default function EventsTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const refresh = params.get('state')
    const [list, setList] = useState<Data[]>([])
    const [modal, setModal] = useState(false)
    
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }

      useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/event/getevents?page=${currentpage}&limit=10`,
                { withCredentials: true }
              );
              console.log(res.data)
              setTotalpage(res.data.data.totalpages);
              setList(res.data.data.data)
            setLoading(false)

            } catch (error) {
            setLoading(false)
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
    }, [currentpage, refresh]);

    const deleteEvent = async (id: string) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/deleteevent?event=${id}`,{
                withCredentials: true,
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Deleting event....',
                success: `Event deleted successfully`,
                error: 'Error while deleting event',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                router.push('?state=false')
                setModal(false)
            }
    
            
        } catch (error) {
            setLoading(false)
            setModal(false)
             if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string, data: string }>;
                        if (axiosError.response && axiosError.response.status === 401) {
                            toast.error(`${axiosError.response.data.data}`)
                            router.push('/')   
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
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' w-full flex items-center justify-between p-2 gap-2 text-xs'>
            <div className=' flex items-center gap-2 text-xs rounded-md text-black'>
                <CreateEvent/>
              

            </div>
          {/* <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' bg-blue-50 p-2 rounded-md' /> */}
          
        </div>
        <Table className=' mt-4'>
        {list.length === 0 && <TableCaption>No Data</TableCaption> }
        {loading === true &&  <TableCaption><span className=' loader2'></span></TableCaption> }
        <TableHeader>
            <TableRow>
         
            <TableHead>Title</TableHead>
            <TableHead className=' flex w-[400px]'>Content</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className=" w-[250px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={item.id}>
            
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.image}</TableCell>
                <TableCell className=' flex flex-wrap w-[250px] items-center gap-2'>
                    
                   <EditEvent id={item.id} title={item.title} content={item.content} image={item.image}/>
    
                    <Dialog open={modal} onOpenChange={setModal}>
                    <DialogTrigger className=' danger-btn'>
                       <img src='/icons/info-circle.png' width={15} height={15}/>Delete
                    </DialogTrigger>
                    <DialogContent className=' text-xs'>
                        <DialogHeader>
                        <DialogTitle className=' text-lg text-red-600'>Delete Event</DialogTitle>
                        <DialogDescription className=' text-xs'>
                            Are you sure you want to delete this event.
                        </DialogDescription>
                        </DialogHeader>
                        <div className=' w-full flex flex-col'>
                            
    
                            <div className=' w-full flex items-end justify-end mt-6'>
                            <button disabled={loading} onClick={() => deleteEvent(item.id)} className=' action-danger'>
                            {loading === true && <span className=' loader'></span> }
                            Delete</button>
    
                            </div>
    
                        </div>
                    </DialogContent>
                    </Dialog>
    
                    
                </TableCell> 
            </TableRow>
            ))}
        
       
        </TableBody>
        </Table>

        {list.length !== 0 && (
            <div className=' w-full flex items-center justify-center'>
                <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
            </div>
        )}
        
    </div>
  )
}
