import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDate, formatTimeRange } from '@/hooks/helpers';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, File, Plus, Trash, Trash2 } from 'lucide-react';
import EditScheduleTeacher from '@/components/forms/EditScheduleTeacher';
import { useForm } from 'react-hook-form';
import { editSchedule, UpdateSchedule } from '@/validations/validatiion';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateScheduleTeacher from '@/components/forms/CreateSchedules';
import CreateSchedulesSection from '@/components/forms/CreateSchedulesSection';

type List = {
  id: string
  name:  string
  status:  string
  gradelevel:  string
  program:  string
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

export default function Graph() {
    const router = useRouter()
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const params = useSearchParams()
    const refresh = params.get('state')
    const [day, setDay] = useState('');
    const [list, setList] = useState<List[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])

    const info = list.find((item) => item.id === id )

    // get schedule
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/schedule/getschedulebysection?section=${id}`,
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
                `${process.env.NEXT_PUBLIC_API_URL}/section/getallsections?page=0&limit=99999&search=${search}&filter&status`,
                { withCredentials: true }
              );
             setList(res.data.data.data)
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
    <>
    <div className=' w-full'>
        <div className=' flex flex-col gap-4 w-fit h-auto bg-white p-6 rounded-md text-xs'>
          <p className=' text-sm font-semibold'>Section Info</p>
          <div className=' flex flex-col gap-2'>
            <p className=' '>Name: <span className='font-medium'>{info?.name}</span></p>
            <p className=' '>Name: <span className='font-medium'>{info?.program}</span></p>
            <p className=' '>Name: <span className='font-medium'>{info?.gradelevel}</span></p>
          </div>

          <div className=' flex items-center gap-2 text-[.6rem]'>
            <a href={`/superadmin/teachermanagement/sectionscheduling/teacherschedule?id=${id}`} className=' action-btn'><File size={10}/>Download / Print</a>
          </div>
          

        </div>
      </div>
    <div className=' w-full  h-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4'>

        <Table className=' bg-white p-2 rounded-md'>
        <TableHeader>
            <TableRow>
              {Day.map((item, index) => (
              <TableHead key={index} className=' uppercase text-start w-[250px] border-collapse border-[1px] border-zinc-300'>{item}</TableHead>
              ))}
            </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className=''>
          {Day.map((day, index) => {
              const dayData = groupedSchedule[day.toLowerCase()];

              return (
                <TableCell key={index} className=' w-[100px] bg-white border-collapse border-[1px] border-zinc-300'
                >
                  <div className=' flex flex-col h-[500px] overflow-y-auto'>

                    <CreateSchedulesSection teacherid={id} day={day} >
                      <p onClick={() => {setDay(day)}} className=' cursor-pointer bg-pink-600 flex items-center gap-1 text-white px-2 py-1 rounded-sm w-fit text-[.6rem]'><Plus size={15}/>Add</p>
                    </CreateSchedulesSection>
                    {dayData && dayData.length > 0 ? (
                      dayData.map((item, index) => (
                          <div key={index} className=' relative mt-2 flex flex-col items-start justify-start w-[200px] bg-zinc-50 p-3 text-[.6rem]'>
                            <EditScheduleTeacher day={item.day} section={item.section} subject={item.subject} start={item.starttime} end={item.endtime} id={item.id} teacher={id}>
                              <p className=' cursor-pointer absolute top-2 right-8 bg-pink-600 p-1 rounded-sm text-white'><Edit size={10}/></p>
                            </EditScheduleTeacher>

                            <Dialog>
                            <DialogTrigger>
                              <p className=' cursor-pointer absolute top-2 right-2 bg-red-600 p-1 rounded-sm text-white'><Trash2 size={10}/></p>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete schedule
                                  and remove from the server.
                                </DialogDescription>
                              </DialogHeader>

                              <div className=' flex flex-col text-sm'>
                                <p>{item.subject}</p>
                                <p>{formatTimeRange(`${item.starttime} - ${item.endtime}`)}</p>
                                <p>{item.teacher}</p>
                                <p>{item.section}</p>

                              </div>
                              <div className=' w-full flex items-end justify-end'>
                                <button disabled={loading} onClick={() => deleteSchedule(item.id)} className=' action-danger text-xs'>
                                  {loading === true && <span className=' loader'></span> }
                                  Continue</button>

                              </div>
                            </DialogContent>
                          </Dialog>

                            <div>{item.subject}</div>
                            <div>{formatTimeRange(`${item.starttime} - ${item.endtime}`)}</div>
                            <div>{item.teacher}</div>
                            <div>{item.section}</div>
                          </div>
                      ))
                    ) : (
                      <p className=' text-[.7rem] text-zinc-500 mt-2'>No Schedule</p>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
          
       
       
        </TableBody>
        </Table>

        <div className=' flex flex-col gap-1 p-4 w-full h-full bg-white rounded-md'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder='Search' className=' input-primary text-xs mb-2' />
            <p className=' text-sm font-medium mb-2'>Section List</p>
            {list.map((item, index) => (
                <p key={item.id} onClick={() => setId(item.id)} className={`cursor-pointer marker:${id === item.id ? ' bg-pink-600 text-white' : ' bg-pink-50'} p-2 rounded-sm text-xs`}>{item.name}</p>
            ))}

            {loading === true && (
                <div className=' w-full flex items-center justify-center'>
                    <span className=' loader2'></span>
                </div>
            )}
        </div>

    </div>
     
    </>
  )
}
