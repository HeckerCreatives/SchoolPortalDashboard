'use client'
import StudentLayout from '@/components/layout/Student'
import { LayoutGrid } from 'lucide-react'
import Schedule from './Schedule'

export default function page() {
  return (
   <StudentLayout>
     <div className=' w-full max-w-[1240px] h-full flex flex-col gap-8 px-6'>

        <p className=' text-xs text-zinc-500'><a href="/student/dashboard">Dashboard</a> / Schedule</p>
        <Schedule/>
     </div>
   </StudentLayout>
  )
}
