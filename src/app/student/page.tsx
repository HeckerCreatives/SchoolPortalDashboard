'use client'
import StudentLayout from '@/components/layout/Student'
import { Files, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'
import NoEnrollment from './NoEnrollment'
import Enrollment from './Enrollment'
import Dashboard from './dashboard/Dashboard'

export default function page() {
    const [tab, setTab] = useState('Tab1')


  return (
    <StudentLayout>
       <div className=' w-full max-w-[1240px] h-full flex flex-col gap-12 px-6'>

        {/* <div className=' flex items-center gap-2'>
            <button onClick={() => setTab('Tab1')} className={` flex ${tab === 'Tab1' ? ' border-b-4 border-pink-500' : ''} bg-white p-2 items-center gap-2`}>
                <Files size={15}/>
                <p className=' text-xs'>Enrollment</p>
            </button>

            <button onClick={() => setTab('Tab2')} className={` flex ${tab === 'Tab2' ? ' border-b-4 border-pink-500' : ''} bg-white p-2 items-center gap-2`}>
                <LayoutGrid size={15}/>
                <p className=' text-xs'>Dashboard</p>
            </button>
        </div> */}

        {tab === 'Tab1' && (
            <>
             {/* <NoEnrollment/> */}
            <Enrollment/>
            </>
            
        )}

        {tab === 'Tab2' && (
            <>
            <Dashboard/>
            </>
            
        )}

       
        
       </div>
    </StudentLayout>
  )
}
