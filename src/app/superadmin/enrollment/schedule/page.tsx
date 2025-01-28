'use client';
import Cards from '@/components/common/Cards';
import SuperAdminLayout from '@/components/layout/SuperadminLayout';
import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import ScheduleTable from './ScheduleTable';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface schoolyear {
  startyear: number;
  endyear: number;
}

export default function page() {
  const currentDate = new Date();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schoolyear, setSchoolYear] = useState<schoolyear>();
  const router = useRouter();
  
  useEffect(()=> {
    const schoolyear = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schoolyear/getcurrentschoolyear`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setSchoolYear(response.data.data)
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
      schoolyear()
  },[])

    const handleCreateSchedule = async () => {
      if (!date || !startTime || !endTime) {
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
          date: formattedDate,
          starttime: startTime,
          endtime: endTime,
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/examschedule/createexamschedule`, schedule, {
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

    
  return (
    <SuperAdminLayout>
       <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Cards title={'Current School year'} count={`SY ${schoolyear?.startyear}-${schoolyear?.endyear}`}/>
        <Cards title={'Current date'} count={currentDate.toLocaleString()}/>

       </div>

       <div className="w-full flex flex-wrap gap-4 mt-4">
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
            <button
              onClick={handleCreateSchedule}
              className=" action-btn"
            >
              Create Schedule
            </button>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white"
        />
      </div>

       <ScheduleTable/>
    </SuperAdminLayout>
  )
}
