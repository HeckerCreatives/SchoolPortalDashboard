import React from 'react'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import ProgramTable from './ProgramTable'

export default function page() {
  return (
    <SuperAdminLayout>
      <ProgramTable/>
    </SuperAdminLayout>
  )
}
