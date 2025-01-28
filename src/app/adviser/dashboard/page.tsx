import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import DashboardCards from './Cards'
import LongChart from '@/components/charts/LongChart'
import TeacherLayout from '@/components/layout/TeacherLayout'
import AdviserLayout from '@/components/layout/AdviserLayout'

export default function page() {
  return (
    <AdviserLayout>
        <DashboardCards/>
        <LongChart/>
    </AdviserLayout>
  )
}
