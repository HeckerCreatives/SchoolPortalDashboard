import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import FinanceTable from './FinanceTable'


export default function page() {
  return (
    <SuperAdminLayout>
      <FinanceTable/>
    </SuperAdminLayout>
  )
}
