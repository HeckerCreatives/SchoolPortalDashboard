import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import DashboardCards from './Cards'
import LongChart from '@/components/charts/LongChart'

export default function page() {
  return (
    <SuperAdminLayout>
        <DashboardCards/>
        <LongChart/>
    </SuperAdminLayout>
  )
}
