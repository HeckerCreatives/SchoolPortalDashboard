'use client'
import CreateScheduleTeacher from '@/components/forms/CreateSchedules'
import EditScheduleTeacher from '@/components/forms/EditScheduleTeacher'
import { DialogHeader } from '@/components/ui/dialog'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { formatDate } from '@/hooks/helpers'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import axios, { AxiosError } from 'axios'
import { Table, Plus, Edit, Trash2, File } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Graph from './Graph'

type Teachers = {
  id: string
  username:  string
  fullname:  string
  contact:  string
  address:  string
  email:  string
  dateofbirth: string
  gender: string
  role:  string
  status: string
}

const Day = [
'monday',
'tuesday',
'wednesday',
'thursday',
'friday'
]

type Schedule = {
id: string
day: string
starttime: string
endtime:string
teacher: string
subject: string
section: string
}

export default function page() {
  const router = useRouter()
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const params = useSearchParams()
    const refresh = params.get('state')
    const [day, setDay] = useState('');
    const [teacher, setTeacher] = useState<Teachers[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])

    const info = teacher.find((item) => item.id === id )

    // get schedule
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/schedule/getschedulebyteacher?teacherId=${id}`,
                { withCredentials: true }
              );
              setSchedule(res.data.data)
            
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
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, [id, refresh]);
    // get staff user list
    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/staffuserlist?page=0&limit=10000&filter=teacher&search=${search}&status=`,
                { withCredentials: true }
              );
             setTeacher(res.data.data.data)
             setId(res.data.data.data[0].id)
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
    }, [search]);

    //delete schedule
    const deleteSchedule = async (id: string) => {
      setLoading(true)
      router.push('?state=true')
      try {
          const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/deleteschedule?scheduleid=${id}`,{
              withCredentials: true,
              headers:{
                'Content-Type': 'application/json'
              }
          })

          const response = await toast.promise(request, {
              loading: 'Deleting schedule....',
              success: `Schedule deleted successfully`,
              error: 'Error while deleting schedule',
          });

          if (response.data.message === 'success'){
              setLoading(false)
              router.push('?state=false')
          }

          
      } catch (error) {
          setLoading(false)
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
      
    };


  const groupedSchedule = Day.reduce((acc, day) => {
    acc[day.toLowerCase()] = schedule.filter(item => item.day.toLowerCase() === day.toLowerCase());
    return acc;
  }, {} as { [key: string]: Schedule[] });

  
  return (
    <div className=' h-screen w-full flex items-center justify-center bg-zinc-50 overflow-y-auto'>
      <Graph/>
    </div>
  )
}
