'use client'
import StudentLayout from '@/components/layout/Student'
import React from 'react'
import Profile from './Profile'
import { LayoutGrid } from 'lucide-react'

export default function page() {
  return (
   <StudentLayout>
     <div className=' w-full max-w-[1240px] h-full flex flex-col gap-8 px-6'>

        <p className=' text-xs text-zinc-500'><a href="/student/dashboard">Dashboard</a> / Profile</p>
        <Profile/>

     </div>
   </StudentLayout>
  )
}
