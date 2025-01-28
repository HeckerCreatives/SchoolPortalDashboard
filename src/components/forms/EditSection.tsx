import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { EditSection, editSection } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

  type Levels = {
    id: string
    level: string
    program:string
}

type Prop = {
    id: string
    level: string
    name: string
}

export default function EditSections(prop: Prop) {
    const [levels, setlevels] = useState<Levels[]>([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()





    useEffect(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/getallgradelevel`,
              { withCredentials: true }
            );

            console.log(res.data)
            setlevels(res.data.data)
      
          } catch (error) {
          
          
          }
        };
  
        getList();
    
    }, []);

       //form validation
       const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<EditSection>({
        resolver: zodResolver(editSection),
        defaultValues: {
           name: prop.name
          },
    })

    const onSubmit = async (data: EditSection) => {
        setLoading(true)
        router.push('?state=true')
        console.log(prop.id)
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/section/editsection`,{
                id: prop.id,
                name: data.name
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Updating section....',
                success: `Updating section`,
                error: 'Error while updating section',
            });
    
            if (response.data.message === 'success'){
                setLoading(false)
                setModal(false)
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
    <Dialog open={modal} onOpenChange={setModal}>
                    <DialogTrigger className=' light-btn'>
                      <img src='/icons/pen.png' width={15} height={15}/>Edit
                    </DialogTrigger>
                    <DialogContent className=' text-xs'>
                        <DialogHeader>
                        <DialogTitle className=' text-lg'>Edit Section</DialogTitle>
                        <DialogDescription className=' text-xs'>
                            Edit section details below.
                        </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col'>
                            
                           
                            <label htmlFor="firstname" className=' mt-2'>Section Name</label>
                            <input defaultValue={''} type="text" placeholder='Name' className=' input-primary' {...register('name')}
                            
                            />
                            <p className=" text-[.6rem] text-red-500">{errors.name?.message}</p>

    
                            <div className=' w-full flex items-end justify-end mt-6'>
                                <button className=' action-btn'>Save</button>
    
                            </div>
    
                        </form>
                    </DialogContent>
                    </Dialog>
  )
}
