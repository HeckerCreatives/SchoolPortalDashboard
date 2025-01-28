import TeacherLayout from '@/components/layout/TeacherLayout'
import React from 'react'
import Changepassword from './Changepassword'
import FinanceLayout from '@/components/layout/Financelayout'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'

export default function page() {
  return (
    <SuperAdminLayout>
       <Changepassword/>
    </SuperAdminLayout>
  )
}
