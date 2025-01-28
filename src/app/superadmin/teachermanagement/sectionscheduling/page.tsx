'use client'
import Cards from '@/components/common/Cards';
import SuperAdminLayout from '@/components/layout/SuperadminLayout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Graph from './Graph';



export default function page() {


  return (
    <SuperAdminLayout>
      {/* <div className=' w-full'>
        <div className=' w-[50%] h-[200px] bg-white p-6 rounded-md'>
          <p className=' text-lg font-semibold'>Teacher Info</p>

        </div>
      </div> */}
       
     <Graph/>
    </SuperAdminLayout>
  )
}
