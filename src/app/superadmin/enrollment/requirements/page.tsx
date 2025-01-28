import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import RequirementTable from './RequirementTable'

export default function page() {
  return (
    <SuperAdminLayout>
      <RequirementTable/>
    </SuperAdminLayout>
  )
}
