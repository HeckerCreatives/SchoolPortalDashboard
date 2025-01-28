import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import ExamTable from './ExamTable'


export default function page() {
  return (
    <SuperAdminLayout>
        <ExamTable/>
    </SuperAdminLayout>
  )
}
