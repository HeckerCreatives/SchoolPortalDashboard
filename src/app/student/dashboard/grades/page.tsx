import StudentLayout from '@/components/layout/Student'
import React from 'react'
import Grades from './Grades'
import ReportCard from './ReportCard'

export default function page() {
  return (
    <StudentLayout>
        <div className=' w-full max-w-[1240px] h-full flex flex-col gap-12 px-6'>
            <Grades/>
        </div>

        {/* <div className=' w-full'>
            <ReportCard/>
        </div> */}
    </StudentLayout>
  )
}
