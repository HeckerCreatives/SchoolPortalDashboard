import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import GradeLevelTable from './GradeLevelTable'


export default function page() {
  return (
    <SuperAdminLayout>
       <GradeLevelTable/>
    </SuperAdminLayout>
  )
}
