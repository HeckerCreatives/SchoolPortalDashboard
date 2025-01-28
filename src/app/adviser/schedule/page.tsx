'use client'
import TeacherLayout from '@/components/layout/TeacherLayout'
import React from 'react'
import Graph from './Graph'
import AdviserLayout from '@/components/layout/AdviserLayout'

export default function page() {
  return (
    <AdviserLayout>
        <Graph/>
    </AdviserLayout>
  )
}
