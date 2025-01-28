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
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Check, X } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
  
  interface schoolyear {
    startyear: number;
    endyear: number;
}

interface examschedule {
    id: string
    date: Date;
    starttime: string;
    endtime: string;
    schoolyear: schoolyear;
}

export default function ScheduleTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [schedule, setSchedule] = useState<examschedule []>()
    const router = useRouter();
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }

      useEffect(()=> {
        const schedule = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/examschedule/getexamschedule?page=${currentpage}&limit=10`,{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                setSchedule(response.data.data.data)
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
        schedule()
    },[currentpage])

    const handleEditSchedule = async (id: string) => {
        if (!date || !startTime || !endTime || !id) {
          toast.error('Please fill in all fields');
          return;
        }
  
        try {
            const adjustedDate = new Date(
                date.getTime() + 8 * 60 * 60 * 1000 
            );
            const formattedDate = adjustedDate
                .toISOString()
                .split('T')[0];          
            const schedule = {
            examid: id,
            date: formattedDate,
            starttime: startTime,
            endtime: endTime,
          };
  
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/examschedule/editexamschedule`, schedule, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          toast.success('Schedule created successfully!');
          setStartTime('');
          setEndTime('');
          setDate(new Date());
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

      const handleDeleteSchedule = async (id: string) => {
        if (!id) {
            toast.error('Invalid schedule ID.');
            return;
        }
    
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/examschedule/deleteschedule?examid=${id}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            toast.success('Schedule deleted successfully!');
            setSchedule((prev) => prev?.filter((item) => item.id !== id));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    router.push('/');
                    toast.error(axiosError.response.data.data);
                } else if (axiosError.response && axiosError.response.status === 400) {
                    const errorMessage = axiosError.response.data?.data;
                    toast.error(errorMessage);
                }
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    
  return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' flex items-center p-2 gap-2 rounded-full w-fit text-xs'>
         <p className=' text-sm'>History</p>
        
        </div>
        <Table className=' mt-4'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
            <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>SY</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {schedule && schedule.length > 0 ? (
                schedule.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            {`${item.starttime} - ${item.endtime}`}
                        </TableCell>
                        <TableCell>
                            {item.schoolyear && 
                                `${item.schoolyear.startyear} - ${item.schoolyear.endyear}`}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                            {/* Edit Button */}
                            <Dialog
                                     onOpenChange={(open) => {
                                        if (open) {
                                          setStartTime(item.starttime); 
                                          setEndTime(item.endtime);
                                          setDate(new Date(item.date)); 
                                        }
                                      }}
                            >
                                <DialogTrigger>
                                    <button className="bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition-all">
                                        Edit
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="text-xs w-full gap-4 mt-4">
                                    <DialogHeader>
                                        <DialogTitle>Edit Schedule</DialogTitle>
                                        <DialogDescription>
                                            Modify the schedule details as needed.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="w-full flex gap-4 mt-4">
                                        <div className="flex flex-col text-xs p-6 w-full max-w-[300px] bg-white h-auto">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="text"
                                            value={date?.toLocaleDateString()}
                                            readOnly
                                            className="bg-blue-50 p-2 rounded-md"
                                        />

                                        <label htmlFor="start-time" className="mt-2">
                                            Start Time
                                        </label>
                                        <input
                                            type="time"
                                            id="start-time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="bg-blue-50 p-2 rounded-md"
                                        />

                                        <label htmlFor="end-time" className="mt-2">
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            id="end-time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="bg-blue-50 p-2 rounded-md"
                                        />
                                        
                                        <div className="w-full flex items-end justify-end mt-4">
                                          <DialogClose>
                                            
                                            <button
                                            onClick={()=>handleEditSchedule(item.id)}
                                            className="bg-blue-500 px-4 py-2 rounded-md text-white"
                                            >
                                            Edit Schedule
                                            </button>
                                        </DialogClose>
                                        </div>
                                        </div>

                                        <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border bg-white"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {/* Delete Button */}
                            <Dialog>
                                <DialogTrigger>
                                    <button className="bg-red-100 px-4 py-2 rounded-md hover:bg-red-200 transition-all">
                                        Delete
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="text-xs">
                                    <DialogHeader>
                                        <DialogTitle>Delete Schedule</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. Confirm to delete this schedule.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="w-full flex items-end justify-end text-xs text-white mt-4">
                                      <DialogClose>
                                        <button onClick={()=>handleDeleteSchedule(item.id)} className="bg-blue-500 px-4 py-2 rounded-md">
                                            Continue
                                        </button>
                                      </DialogClose>
                                    </div>
                                    {/* <button className=' bg-blue-100 p-2 rounded-md flex items-center gap-2'><img src='/icons/eye.png' width={15} height={15}/>View</button> */}
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                        No schedules found.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>

        </Table>

        {schedule?.length !== 0 && (
            <div className=' w-full flex items-center justify-center'>
                <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
            </div>
        )}
        
    </div>
  )
}
