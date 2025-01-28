import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import NewsTable from './NewsTable'
import EvaluationForm from '@/app/student/dashboard/evaluation/Form'
import { TeacherEvaluation } from './Evaluation'

export default function page() {
  return (
    <SuperAdminLayout>
        <TeacherEvaluation/>
    </SuperAdminLayout>
  )
}
