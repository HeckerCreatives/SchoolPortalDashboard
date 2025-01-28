import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import RegistrarTable from './RegistrarTable'


export default function page() {
  return (
    <SuperAdminLayout>
      <RegistrarTable/>
    </SuperAdminLayout>
  )
}
