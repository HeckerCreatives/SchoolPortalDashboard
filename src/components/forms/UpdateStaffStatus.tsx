import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Status = {
    id: string
    name: string
    status: string
}

export default function UpdateStaffStatus( prop: Status) {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const updateStatus = async () => {
        setLoading(true)
        router.push('?state=true')

       
        try {
             const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/staffuser/banunbanstaffuser?id=${prop.id}&status=${prop.status === 'active' ? 'inactive' : 'active'}`,{
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Updating status....',
                success: `Updated successfully`,
                error: 'Error while updating status',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                setModal(false)
                router.push('?state=false')

            }
    
            
        } catch (error) {
            setLoading(false)
             if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string, data: string }>;
                        if (axiosError.response && axiosError.response.status === 401) {
                            toast.error(`${axiosError.response.data.data}`)
                            router.push('/')
                        }
    
                        if (axiosError.response && axiosError.response.status === 400) {
                            toast.error(`${axiosError.response.data.data}`)     
                                
                        }
    
                        if (axiosError.response && axiosError.response.status === 402) {
                            toast.error(`${axiosError.response.data.data}`)          
                                    
                        }
    
                        if (axiosError.response && axiosError.response.status === 403) {
                            toast.error(`${axiosError.response.data.data}`)              
                            
                        }
    
                        if (axiosError.response && axiosError.response.status === 404) {
                            toast.error(`${axiosError.response.data.data}`)             
                        }
                } 
            
        }
        
    };


  return (
    <Dialog open={modal} onOpenChange={setModal}>
    <DialogTrigger className=' light-btn'>
      <img src='/icons/info-circle.png' width={15} height={15}/> Status
    </DialogTrigger>
    <DialogContent className=' text-xs'>
        <DialogHeader>
        <DialogTitle className=' text-lg'>Update Staff Status</DialogTitle>
        <DialogDescription className=' text-xs'>
           Are you sure you want to {prop.status === 'active' ? 'ban' : 'unban'} this staff?
        </DialogDescription>
        </DialogHeader>
        <p className=' text-lg font-medium'>{prop.name}</p>

        <div className=' w-full flex items-end justify-end'>
            {prop.status === 'active' ? (
                <button onClick={updateStatus} className=' action-danger w-fit'>Ban</button>
            ): (
                <button onClick={updateStatus} className=' action-btn w-fit'>Unban</button>
            )}
        </div>                   
    </DialogContent>
    </Dialog>

  )
}
