import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import DashboardCards from './Cards'
import LongChart from '@/components/charts/LongChart'
import TeacherLayout from '@/components/layout/TeacherLayout'

export default function page() {
  return (
    <TeacherLayout>
        <DashboardCards/>
        <LongChart/>
    </TeacherLayout>
  )
}
