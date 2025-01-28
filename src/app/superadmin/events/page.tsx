import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import EventsTable from './EventsTable'


export default function page() {
  return (
    <SuperAdminLayout>
        <EventsTable/>
    </SuperAdminLayout>
  )
}
