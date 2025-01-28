import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import GradesTable from './Gradestable'
import TeacherLayout from '@/components/layout/TeacherLayout'

export default function page() {
  return (
    <TeacherLayout>
        <GradesTable/>
    </TeacherLayout>
  )
}
