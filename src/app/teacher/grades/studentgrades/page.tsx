import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import Gradeslayout from './Gradeslayout'
import TeacherLayout from '@/components/layout/TeacherLayout'

export default function page() {
  return (
    <TeacherLayout>
       <Gradeslayout/>
    </TeacherLayout>
  )
}
