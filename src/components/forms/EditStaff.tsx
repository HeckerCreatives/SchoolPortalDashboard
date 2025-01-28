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

type Edit = {
    firstname: string,
    middlename: string ,
    lastname: string,
    address: string,
    contact: string,
    email: string,
    dateofbirth: string,
    gender: string
    id: string
}


export default function EditStaff( prop: Edit) {
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


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
            role: "admin",
            firstName: prop.firstname,
            middlename: prop.middlename ,
            lastName: prop.lastname,
            address: prop.address,
            contact: prop.contact,
            email: prop.email,
            dob: prop.dateofbirth,
            gender: prop.gender,
            username:'test123',
            password: 'dev123'
          },
      })

      const onSubmit = async (data: CreateStaff) => {
        setLoading(true)
       router.push('?state=true')
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/staffuser/editstaffuserdetails`,{
              dob: data.dob, // date of birth
              firstname: data.firstName,
              middlename: data.middlename,
              lastname: data.lastName,
              gender: data.gender,
              address: data.address,
              email: data.email,
              contact: data.contact,
              id: prop.id
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Updating account....',
                success: `Updated successfully`,
                error: 'Error while updating account',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                setCreateModal(false)
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
    <Dialog open={createModal} onOpenChange={setCreateModal}>
    <DialogTrigger className=' light-btn '>
        <img src='/icons/pen.png' width={15} height={15}/>Edit
    </DialogTrigger>
    <DialogContent className=' text-xs'>
        <DialogHeader>
        <DialogTitle className=' text-lg'>Edit Staff</DialogTitle>
        <DialogDescription className=' text-xs'>
            Edit staff details below.
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


                        {/* <label htmlFor="firstname" className=' mt-2'>Role</label>
                        <input type="text" disabled placeholder='Role' className=' input-primary' {...register('role')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.role?.message}</p>


                        <label htmlFor="email" className=' mt-2'>Username</label>
                        <input type="text" placeholder='Username' className=' input-primary' {...register('username')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.username?.message}</p>

                        <label htmlFor="email" className=' mt-2'>Password</label>
                        <input type="text" placeholder='Password' className=' input-primary' {...register('password')}/>
                        <p className=" text-[.6rem] text-red-500">{errors.password?.message}</p> */}


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
