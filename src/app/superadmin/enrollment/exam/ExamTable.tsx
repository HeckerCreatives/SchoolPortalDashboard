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
export default function ExamTable() {
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

      useEffect(()=> {
        const entranceexam = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/entranceexam/getentranceexamstatus?page=${currentpage}&limit=10&search=${search}&filter=${filter}`,{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                setEntranceExam(response.data.data.data)
                setTotalpage(response.data.data.totalPages)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        router.push('/')
                        toast.error(axiosError.response.data.data);
                    }
    
                      if (axiosError.response && axiosError.response.status === 400) {
                        const errorMessage = axiosError.response.data?.data;
                        toast.error(errorMessage);
                
                    }
                } 
            }
        }
        entranceexam()
    },[currentpage, search, filter])
    


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
        <div className=' flex items-center p-2 gap-2 rounded-full w-fit text-xs'>
          <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' bg-zinc-50 p-2 rounded-md' />
          <select
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className='bg-zinc-50 p-2 pr-1 rounded-md'>
            <option value="">Filter by status</option>
            <option value="a">View All</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="passed">Passed</option>
        </select>
        </div>
        <Table className=' mt-4'>
        {entranceExam?.length === 0 && <TableCaption>No Data</TableCaption> }
        <TableHeader>
            <TableRow>
            <TableHead>Ticket Id</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Exam Status</TableHead>
            <TableHead>Exam Score</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {entranceExam.length > 0 && (
            entranceExam.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.username}</TableCell>
                <TableCell>{exam.fullname}</TableCell>
                <TableCell>
                {new Date(exam.schedule.date).toLocaleDateString()} {exam.schedule?.starttime} -{' '}
                  {exam.schedule?.endtime}
                </TableCell>
                <TableCell>{exam.examstatus}</TableCell>
                <TableCell>{exam.examscore || 0}/100</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger>
                      <button className="bg-blue-100 p-2 rounded-md">Results</button>
                    </DialogTrigger>
                    <DialogContent className="text-xs">
                      <DialogHeader>
                        <DialogTitle>Exam Results</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="score">Score</label>
                        <input
                          type="number"
                          id="score"
                          value={score}
                          onChange={handleScoreChange}
                          placeholder="Enter Score"
                          className="bg-blue-50 p-2 rounded-md"
                        />
                      </div>
                      <div className="w-full grid grid-cols-2 gap-4 text-xs">
                        <div
                          onClick={() => { setProcess1('Approved'); setStatus("passed") }}
                          className={`cursor-pointer w-full flex flex-col gap-2 items-center justify-center h-auto p-4 bg-green-50 rounded-md ${
                            process1 === 'Approved' && 'border-2 border-blue-100'
                          }`}
                        >
                          <div className="w-10 aspect-square rounded-full bg-green-200 flex items-center justify-center text-green-600">
                            <Check size={20} />
                          </div>
                          <p>Passed</p>
                        </div>
                        <div
                          onClick={() => { setProcess1('Rejected'); setStatus("failed")}}
                          className={`cursor-pointer w-full flex flex-col gap-2 items-center justify-center h-auto p-4 bg-red-50 rounded-md ${
                            process1 === 'Rejected' && 'border-2 border-blue-100'
                          }`}
                        >
                          <div className="w-10 aspect-square rounded-full bg-red-200 flex items-center justify-center text-red-600">
                            <X size={20} />
                          </div>
                          <p>Failed</p>
                        </div>
                      </div>
                      <div className="w-full flex items-end justify-end text-xs text-white mt-2">
                        <button onClick={() => setEntranceExamStatus(exam.ticketid, status, score)} className="bg-blue-500 px-4 py-2 rounded-md">Submit</button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) }
        </TableBody>
        </Table>

        {entranceExam.length !== 0 && (
          <div className=' w-full flex items-center justify-center'>
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        </div>
        )}
         
    </div>
  )
}
