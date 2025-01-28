import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import GradesTable from './Gradestable'

export default function page() {
  return (
    <SuperAdminLayout>
        <GradesTable/>
    </SuperAdminLayout>
  )
}
