import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import TeacherTable from './TeacherTable'


export default function page() {
  return (
    <SuperAdminLayout>
      <TeacherTable/>
    </SuperAdminLayout>
  )
}
