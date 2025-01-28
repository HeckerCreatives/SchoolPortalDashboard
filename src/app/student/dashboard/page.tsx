import StudentLayout from '@/components/layout/Student'
import React from 'react'
import Dashboard from './Dashboard'

export default function page() {
  return (
    <StudentLayout>
        <div className=' w-full max-w-[1240px] h-full flex flex-col gap-12 px-6'>
            <Dashboard/>
        </div>
    </StudentLayout>
  )
}
