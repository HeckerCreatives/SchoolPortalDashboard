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
import { CreateAdviser, createAdvisory } from '@/validations/validatiion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

  
type FormData = {
    gradelevel: string
    name: string
    program: string
}  

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
    id: string
    name: string
}

export default function CreateAdvisory() {
    const [createModal, setCreateModal] = useState(false)
    const [levels, setlevels] = useState<Levels[]>([])
    const [loading, setLoading] = useState(false)
    const [program, setProgram] = useState('')
    const router = useRouter()
    const [adviser, setAdviser] = useState<Adviser[]>([])
    const [sections, setSection] = useState<Section[]>([])

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
                `${process.env.NEXT_PUBLIC_API_URL}/section/getallsections?page=0&limit=500&search=&filter=&status=active`,
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
    } = useForm<CreateAdviser>({
        resolver: zodResolver(createAdvisory),
        defaultValues: {
            adviser:'',
            sectionname:'',
            level:''
        },
    })

    console.log(errors)
    console.log(program)
   
    //create advisory
    const create = async (data: CreateAdviser) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/advisory/createadvisory`,{
                program: program,
                gradelevel: data.level, // Grade Level ID
                section: data.sectionname,// Section ID
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
            <img src='/icons/plus-square.png' height={15} width={15}/>Create
        </DialogTrigger>
        <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
            <DialogHeader>
            <DialogTitle className=' text-lg'>Create Advisory</DialogTitle>
            <DialogDescription className=' text-xs'>
                Enter advisory details below.
            </DialogDescription>
            </DialogHeader>
        
                <form onSubmit={handleSubmit(create)} className={` w-full flex flex-col pb-4'}`}>
                    
                    <label htmlFor="firstname" className=' mt-2'>Grade Level</label>
                    <Select 
                   onValueChange={(value) => setValue('level', value)} {...register('level')}
                    >
                        <SelectTrigger className="w-full text-xs bg-blue-50">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                            {levels.map((item, index) => (
                                <SelectItem onClick={() => setProgram(item.program)} key={item.id} value={item.id}>{item.level}</SelectItem>
                            ))}
                          
                          
                        </SelectContent>
                    </Select>
                    <p className=" text-[.6rem] text-red-500">{errors.level?.message}</p>


                    <label htmlFor="firstname" className=' mt-2'>Section</label>
                    <Select 
                    onValueChange={(value) => setValue('sectionname', value)} {...register('sectionname')}
                    >
                        <SelectTrigger className="w-full text-xs bg-blue-50">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                            {sections.map((item, index) => (
                                <SelectItem  key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))}
                          
                          
                        </SelectContent>
                    </Select>

                  
                  <p className="text-[.6rem] text-red-500">{errors.sectionname?.message}</p>

                    <label htmlFor="firstname" className=' mt-2'>Adviser</label>
                    <Select 
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
                    <button disabled={loading}  className=' action-btn'>
                        {loading === true && <span className=' loader'></span> }
                        Save</button>
                    
                </div>


                  

                </form>
        
        </DialogContent>
        </Dialog>
  )
}
