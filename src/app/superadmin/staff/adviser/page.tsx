import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import AdviserTable from './AdviserTable'


export default function page() {
  return (
    <SuperAdminLayout>
      <AdviserTable/>
    </SuperAdminLayout>
  )
}
