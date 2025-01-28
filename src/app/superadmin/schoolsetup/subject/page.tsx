import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import SubjectTable from './SubjectTable'

export default function page() {
  return (
    <SuperAdminLayout>
       <SubjectTable/>
    </SuperAdminLayout>
  )
}
