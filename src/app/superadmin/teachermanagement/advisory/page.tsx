'use client'
import Cards from '@/components/common/Cards';
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdviserTable from '../../staff/adviser/AdviserTable';
import AdvisoryTable from './AdvisoryTable';
import AdvisoryHistoryTable from './AdvisoryHistoryTable';

interface schoolyear {
    startyear: number;
    endyear: number;
  }

export default function page() {
  const [schoolyear, setSchoolYear] = useState<schoolyear>();

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
           
          }
      }
      schoolyear()
  },[])

  return (
    <SuperAdminLayout>
        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Cards title={'Current School year'} count={`SY ${schoolyear?.startyear}-${schoolyear?.endyear}`}/>
       </div>
       <AdvisoryTable/>
       <AdvisoryHistoryTable/>
    </SuperAdminLayout>
  )
}
