import StudentLayout from '@/components/layout/Student'
import React from 'react'
import ClassList from './Classroom'

export default function page() {
  return (
    <StudentLayout>
        <ClassList/>
    </StudentLayout>
  )
}
