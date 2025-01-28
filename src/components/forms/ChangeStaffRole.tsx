import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type Status = {
    id: string
    role: string
    name: string
}

export default function ChangeStaffRole( prop: Status) {
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [modal, setModal] = useState(false)


  const changeRole = async () => {
    setLoading(true)
    router.push('?state=true')
   
    try {
         const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/staffuser/editstaffrole`,{
          role: role,
          id: prop.id
        }, {
            withCredentials: true,
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const response = await toast.promise(request, {
            loading: 'Updating role....',
            success: `Updated successfully`,
            error: 'Error while updating role',
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

useEffect(() => {
  setRole(prop.role)
},[prop.role])

  return (
    <Dialog open={modal} onOpenChange={setModal}>
                <DialogTrigger className=' light-btn'>
                   <img src='/icons/user-inactive.png' height={15} width={15}/>Change Role
                </DialogTrigger>
                <DialogContent className=' text-xs'>
                    <DialogHeader>
                    <DialogTitle className=' text-lg'>Change Role</DialogTitle>
                    <DialogDescription className=' text-xs'>
                      Are you sure you want to change role on the selected staff?
                    </DialogDescription>
                    </DialogHeader>
                    <p className=' text-lg font-medium'>{prop.name}</p>
                    <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className=" input-primary">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="adviser">Adviser</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="registrar">Registrar</SelectItem>
                    </SelectContent>
                    </Select>

                    <div className=' w-full flex items-end justify-end mt-6'>
                        <button disabled={loading} onClick={changeRole} className=' action-btn'>
                        {loading === true && <span className=' loader'></span> }
                          Save</button>
                    </div>

                </DialogContent>
                </Dialog>

  )
}
