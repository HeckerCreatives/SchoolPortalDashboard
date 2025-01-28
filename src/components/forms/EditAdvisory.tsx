'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { EditAdviser, editAdvisory } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'



type Levels = {
    id: string
    level: string
    program:string
}

type Adviser = {
    id: string
    fullname: string
}

type Section ={
    _id: string
    name: string
}

type Props = {
    id: string
    name: string
    section: string
}

export default function EditAdvisory( prop: Props) {
    const [createModal, setCreateModal] = useState(false)
    const [levels, setlevels] = useState<Levels[]>([])
    const [loading, setLoading] = useState(false)
    const [program, setProgram] = useState('')
    const router = useRouter()
    const [adviser, setAdviser] = useState<Adviser[]>([])
    const [section, setSection] = useState<Section[]>([])
    const getadviser = adviser.find((item) => item.fullname === prop.name)?.id

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

    useEffect(() => {
    
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/staffuserlist?page=0&limit=500&filter=adviser&search=&status=`,
                { withCredentials: true }
              );

              console.log(res.data)
              setAdviser(res.data.data.data)
             
            } catch (error) {
            setLoading(false)
              if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                  toast.error(`${axiosError.response.data.data}`);
                  router.push("/");
                }
              }
            }
          };
    
          getList();
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/section/getallsections?page=0&limit=500&search=&filter=active`,
                { withCredentials: true }
              );
          
            console.log(res.data)
            setSection(res.data.data.data)
            } catch (error) {
            setLoading(false)
              if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                  toast.error(`${axiosError.response.data.data}`);
                  router.push("/");
                }
              }
            }
          };
    
          getList();
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, []);

    
     //form validation
     const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<EditAdviser>({
        resolver: zodResolver(editAdvisory),
        defaultValues: {
            adviser: '',
        },
    })

    // Use useEffect to set the form value dynamically when getadviser changes
    useEffect(() => {
        if (getadviser) {
            reset({ adviser: getadviser }); // Update the form
        }
    }, [getadviser, reset]);
   
    //create advisory
    const edit = async (data: EditAdviser) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/advisory/editadvisoryteacher`,{
                id: prop.id,
                teacher: data.adviser// Teacher UserStaff ID
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Creating advisory....',
                success: `Created successfully`,
                error: 'Error while creating advisory',
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
            <img src='/icons/pen.png' width={15} height={15}/>Edit
        </DialogTrigger>
        <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
            <DialogHeader>
            <DialogTitle className=' text-lg'>Edit Advisory</DialogTitle>
            <DialogDescription className=' text-xs'>
                Edit advisory details below.
            </DialogDescription>
            </DialogHeader>
        
                <form onSubmit={handleSubmit(edit)} className={` w-full flex flex-col pb-4'}`}>

                    <p className=' text-lg font-medium'>{prop.section}</p>
                    
                    <label htmlFor="firstname" className=' mt-2'>Adviser</label>
                    <Select 
                   defaultValue={getadviser}
                    onValueChange={(value) => setValue('adviser', value)} {...register('adviser')}
                    >
                        <SelectTrigger className="w-full text-xs bg-blue-50">
                          <SelectValue placeholder="Select adviser" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                            {adviser.map((item, index) => (
                                <SelectItem  key={item.id} value={item.id}>{item.fullname}</SelectItem>
                            ))}
                          
                          
                        </SelectContent>
                    </Select>
                    <p className=" text-[.6rem] text-red-500">{errors.adviser?.message}</p>


                    <div className=' w-full flex items-end justify-end mt-6 gap-2'>
                    <button  className=' action-btn'>
                        {loading === true && <span className=' loader'></span> }
                        Save</button>
                    
                </div>


                  

                </form>
        
        </DialogContent>
        </Dialog>
  )
}
