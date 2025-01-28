'use client'
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import React from 'react'
import ChatComponent from './Chatcomponent'

export default function page() {
  return (
    <SuperAdminLayout>
        <ChatComponent/>
    </SuperAdminLayout>
  )
}
