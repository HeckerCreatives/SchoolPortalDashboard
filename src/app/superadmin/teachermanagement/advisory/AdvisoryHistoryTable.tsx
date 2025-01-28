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
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  
interface entranceexam {
    id: string,
    ticketid: string
    username: string
    examstatus: string
    examscore: number
    fullname: string
    email: string
    address: string
    schedule: schedule
}

interface schedule {
    scheduleid: string
    starttime: string
    endtime: string
    date: Date
}

export default function AdvisoryHistoryTable() {
    const [tab, setTab] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [entranceExam, setEntranceExam] = useState<entranceexam[]>([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [process1, setProcess1] = useState("")

    const [status, setStatus] = useState("")
    const [score, setScore] = useState<number>(0)
    const router = useRouter()
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }

    //   useEffect(()=> {
    //     const entranceexam = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/entranceexam/getentranceexamstatus?page=${currentpage}&limit=10&search=${search}&filter=${filter}`,{
    //                 withCredentials: true,
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             })

    //             setEntranceExam(response.data.data.data)
    //             setTotalpage(response.data.data.totalPages)
    //         } catch (error) {
    //             if (axios.isAxiosError(error)) {
    //                 const axiosError = error as AxiosError<{ message: string, data: string }>;
    //                 if (axiosError.response && axiosError.response.status === 401) {
    //                     router.push('/')
    //                     toast.error(axiosError.response.data.data);
    //                 }
    
    //                   if (axiosError.response && axiosError.response.status === 400) {
    //                     const errorMessage = axiosError.response.data?.data;
    //                     toast.error(errorMessage);
                
    //                 }
    //             } 
    //         }
    //     }
    //     entranceexam()
    // },[currentpage, search, filter])
    


    const setEntranceExamStatus = async (ticketid: string, status: string, score: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/entranceexam/setentranceexamstatus?ticketid=${ticketid}&status=${status}&score=${score}`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          toast.success('Exam status updated successfully');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 400) {
              toast.error('Failed to update exam status. Please try again.');
            } else if (axiosError.response && axiosError.response.status === 401) {
              toast.error('Unauthorized request. Please log in again.');
            } else {
              toast.error('Something went wrong. Please try again later.');
            }
          }
        }
      }


      const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const numberValue = value ? Number(value) : 0
        setScore(numberValue)
      }

    return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <p className=' text-sm font-medium'>Advisory History</p>
       
        <Table className=' mt-4'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
            <TableRow>
         
            <TableHead>Teacher</TableHead>
            <TableHead>S.Y</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Section</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow >
            
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
           
        </TableRow>
       
        </TableBody>
        </Table>

        <div className=' w-full flex items-center justify-center'>
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        </div>

        
    </div>
  )
}
