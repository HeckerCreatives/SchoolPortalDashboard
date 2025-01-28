import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import AdminTable from './AdminTable'


export default function page() {
  return (
    <SuperAdminLayout>
       <AdminTable/>
    </SuperAdminLayout>
  )
}
