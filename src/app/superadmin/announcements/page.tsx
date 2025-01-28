import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import AnnouncementsTable from './AnnouncementsTable'


export default function page() {
  return (
    <SuperAdminLayout>
        <AnnouncementsTable/>
    </SuperAdminLayout>
  )
}
