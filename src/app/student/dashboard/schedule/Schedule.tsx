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
import axios from 'axios'
import { formatTimeRange } from '@/hooks/helpers'

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

export default function Schedule() {
      const [schedule, setSchedule] = useState<Schedule[]>([])

      const groupedSchedule = Day.reduce((acc, day) => {
        acc[day.toLowerCase()] = schedule.filter(item => item.day.toLowerCase() === day.toLowerCase());
        return acc;
      }, {} as { [key: string]: Schedule[] });
  

  useEffect(() => {
    const getData =  async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/getstudentschedule`,{
            withCredentials: true
        })

    console.log(response.data)
    setSchedule(response.data.data)

    }
    getData()
},[])


  return (
    <div className=' w-full'>
         <p className='text-lg font-medium'>Schedule</p>

           <div className=' w-full h-auto bg-white mt-4 p-4'>
                      <Table className=' p-2 rounded-md'>
                              <TableHeader>
                                  <TableRow className=''>
                                    {Day.map((item, index) => (
                                    <TableHead key={index} className=' uppercase text-start font-semibold text-xs text-black w-[250px]  border-collapse border-[1px]'>{item}</TableHead>
                                    ))}
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                              <TableRow className=' '>
                               {Day.map((day, index) => {
                                          const dayData = groupedSchedule[day.toLowerCase()];
                              
                                          // Sort dayData by starttime
                                          const sortedDayData = dayData
                                            ? [...dayData].sort((a, b) => {
                                                const aTime = parseInt(a.starttime.replace(':', ''), 10);
                                                const bTime = parseInt(b.starttime.replace(':', ''), 10);
                                                return aTime - bTime;
                                              })
                                            : [];
                              
                                          return (
                                            <TableCell key={index} className=' w-[100px] border-[1px] border-zinc-300 bg-white'>
                                              <div className=' flex flex-col h-auto'>
                                                {sortedDayData && sortedDayData.length > 0 ? (
                                                  sortedDayData.map((item, index) => (
                                                    <div key={index} className=' relative mt-2 flex flex-col items-start justify-start w-[200px] bg-zinc-50 p-3 text-[.6rem]'>
                                                      <p className=' font-semibold text-xs'>{item.subject}</p>
                                                      <p>{formatTimeRange(`${item.starttime} - ${item.endtime}`)}</p>
                                                      <p>{item.teacher}</p>
                                                      <p>{item.section}</p>
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
                  </div>
    </div>
  )
}
