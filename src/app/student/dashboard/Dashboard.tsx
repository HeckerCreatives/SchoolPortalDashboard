import { Calendar, CalendarCheck, CircleUserRound, File, IdCard, Users } from 'lucide-react'
import React from 'react'

export default function Dashboard() {
  return (
    <div className=' w-full grid grid-cols-4 gap-4'>
        <a href='/student/dashboard/profile' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <CircleUserRound size={20}/>
            <p>View My Profile</p>
        </a>

        <a href='/student/dashboard/schedule' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <Calendar size={20}/>
            <p>View My Schedule</p>
        </a>

        <a href='/student/dashboard/grades' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <IdCard size={20}/>
            <p>View My Grades</p>
        </a>

        <a href='/student/dashboard/cor' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <File size={20}/>
            <p>View My COR</p>
        </a>

        <a href='/student/dashboard/evaluation' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <Users size={20}/>
            <p>Teacher Evaluation</p>
        </a>

        <a href='/student/dashboard/attendance' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <CalendarCheck size={20}/>
            <p>Attendance</p>
        </a>

        <a href='/student/dashboard/classroom' className=' w-full flex items-center justify-center gap-2 h-[80px] bg-white text-sm hover:underline hover:border-pink-500 border-b-4 border-r-4 transition-all duration-300'>
            <CalendarCheck size={20}/>
            <p>Classroom</p>
        </a>
    </div>
  )
}
