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
import EditSections from '@/components/forms/EditSection'
import CreateSchoolyear from '@/components/forms/CreateSchoolyear'
 

type Sy = {
   _id: string
    owner:string
    startyear: string
    endyear: string
    createdAt: string
    updatedAt: string
    currentstatus: string
}

export default function SyTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [list, setList] = useState<Sy[]>([])
    const params = useSearchParams()
    const refresh = params.get('state')
    const [modal, setModal] = useState(false)
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

    //sy list
    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/schoolyear/getschoolyear?page=${currentpage}&limit=10`,
                { withCredentials: true }
              );
          
            setLoading(false)
            console.log(res.data)
            setList(res.data.data.data)
            setTotalpage(res.data.data.totalpages)

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
    }, [currentpage,search, refresh]);



    return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' w-full flex items-center justify-between p-2 gap-2 text-xs'>
            <div className=' flex items-center gap-2 text-xs rounded-md text-black'>
               <CreateSchoolyear/>
            </div>
          {/* <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' input-primary' /> */}
          
        </div>
        <Table className=' mt-4'>
        {list.length === 0 && <TableCaption>No Data</TableCaption> }
        {loading === true &&  <TableCaption><span className=' loader2'></span></TableCaption> }
        <TableHeader>
            <TableRow>
         
            <TableHead>Id</TableHead>
            <TableHead>Start Year</TableHead>
            <TableHead>End Year</TableHead>
            <TableHead>Status</TableHead>
           
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
            
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.startyear}</TableCell>
                <TableCell>{item.endyear}</TableCell>
                <TableCell>{item.currentstatus}</TableCell>
               
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
