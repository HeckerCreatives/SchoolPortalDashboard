import TeacherLayout from '@/components/layout/TeacherLayout'
import React from 'react'
import SubmissionTable from './TableSubmissions'

export default function page() {
  return (
    <TeacherLayout>
       <SubmissionTable/>
    </TeacherLayout>
  )
}
