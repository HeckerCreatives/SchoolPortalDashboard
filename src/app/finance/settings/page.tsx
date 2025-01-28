import TeacherLayout from '@/components/layout/TeacherLayout'
import React from 'react'
import Changepassword from './Changepassword'
import FinanceLayout from '@/components/layout/Financelayout'

export default function page() {
  return (
    <FinanceLayout>
       <Changepassword/>
    </FinanceLayout>
  )
}
