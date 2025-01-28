import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import LongChart from '@/components/charts/LongChart'
import TeacherLayout from '@/components/layout/TeacherLayout'
import AdviserLayout from '@/components/layout/AdviserLayout'
import FinanceLayout from '@/components/layout/Financelayout'
import Fees from './Fees'

export default function page() {
  return (
    <FinanceLayout>
      <Fees/>
    </FinanceLayout>
  )
}
