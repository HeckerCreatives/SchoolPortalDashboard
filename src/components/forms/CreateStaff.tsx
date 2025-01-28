import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { createStaff, CreateStaff } from '@/validations/validatiion'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Create = {
    role: string,
    name: string
  
}


export default function CreateStaffAccount( prop: Create) {
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


     //form validation
     const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<CreateStaff>({
        resolver: zodResolver(createStaff),
        defaultValues: {
            role: prop.role,
          },
    })

    //create admin
    const onSubmit = async (data: CreateStaff) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/registerstaff`,{
              "username": data.username,
              "password": data.password,
              "role": data.role, // teacher, adviser, finance, registrar, admin, superadmin, 
              "dob": data.dob, // date of birth
              "firstname": data.firstName,
              "middlename": data.middlename,
              "lastname": data.lastName,
              "gender": data.gender,
              "address": data.address,
              "email": data.email,
              "contact": data.contact
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Registering account....',
                success: `Registered successfully`,
                error: 'Error while registering account out',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                setCreateModal(false)
                reset()
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

  return (
    <Dialog open={createModal} onOpenChange={setCreateModal}>
                <DialogTrigger className=' light-btn'>
                   <img src='/icons/plus-square.png' height={15} width={15}/>
                    Create
                </DialogTrigger>
                <DialogContent className=' text-xs max-h-[700px] overflow-y-auto'>
                    <DialogHeader>
                    <DialogTitle className=' text-lg'>Create {prop.name}</DialogTitle>
                    <DialogDescription className=' text-xs'>
                        Enter {prop.role} details below.
                    </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col'>
                        <label htmlFor="firstname" className=' mt-2'>Firstname</label>
                        <input type="text" placeholder='Firstname' className=' input-primary' {...register('firstName')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.firstName?.message}</p>


                        <label htmlFor="lastname" className=' mt-2'>Lastname</label>
                        <input type="text" placeholder='Lastname' className=' input-primary' {...register('lastName')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.lastName?.message}</p>


                        <label htmlFor="middlename" className=' mt-2'>Middlename</label>
                        <input type="text" placeholder='Middlename' className=' input-primary' {...register('middlename')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.middlename?.message}</p>


                        <label htmlFor="phoneno" className=' mt-2'>Phone no.</label>
                        <input type="number" placeholder='Phone no.' className=' input-primary' {...register('contact')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.contact?.message}</p>


                        <label htmlFor="address" className=' mt-2'>Address</label>
                        <input type="text" placeholder='Address' className=' input-primary' {...register('address')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.address?.message}</p>


                        <label htmlFor="email" className=' mt-2'>Email</label>
                        <input type="email" placeholder='Email' className=' input-primary' {...register('email')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.email?.message}</p>

                        <label htmlFor="email" className=' mt-2'>Date of birth</label>
                        <input type="date" placeholder='Email' className=' input-primary' {...register('dob')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.dob?.message}</p>

                        <p className=" text-black mt-4">Gender</p>
                        <Select onValueChange={(value) => setValue('gender', value)} {...register('gender')}>
                        <SelectTrigger className="w-full text-xs">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.gender?.message}</p>


                        <label htmlFor="firstname" className=' mt-2'>Role</label>
                        <input type="text" disabled placeholder='Role' className=' input-primary' {...register('role')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.role?.message}</p>


                        <label htmlFor="email" className=' mt-2'>Username</label>
                        <input type="text" placeholder='Username' className=' input-primary' {...register('username')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.username?.message}</p>

                        <label htmlFor="email" className=' mt-2'>Password</label>
                        <input type="text" placeholder='Password' className=' input-primary' {...register('password')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.password?.message}</p>


                        <div className=' w-full flex items-end justify-end mt-6'>
                            <button disabled={loading} className=' action-btn'>
                              {loading === true && <span className=' loader'></span> }
                              Save</button>

                        </div>

                    </form>
                </DialogContent>
    </Dialog>
  )
}
