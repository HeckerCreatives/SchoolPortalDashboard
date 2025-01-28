import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import NewsTable from './NewsTable'

export default function page() {
  return (
    <SuperAdminLayout>
        <NewsTable/>
    </SuperAdminLayout>
  )
}
