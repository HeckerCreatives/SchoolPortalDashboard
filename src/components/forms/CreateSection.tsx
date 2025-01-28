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
import { createSection, CreateSection, createStaff, CreateStaff } from '@/validations/validatiion'
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

export default function CreateSections() {
    const [isValidated, setIsvalidated] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [levels, setlevels] = useState<Levels[]>([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [program, setProgram] = useState('')
    const router = useRouter()
    const [formData, setFormData] = useState<FormData[]>([{gradelevel: '',name:'', program: ''}]);


    //add form
    const handleAddForm = () => {
        const lastForm = formData[formData.length - 1];
      
        // Check if any field in the last form is empty
        const isFormComplete = Object.values(lastForm).every(value => value !== '');
    
        setIsvalidated(isFormComplete)
      
        if (!isFormComplete) {
          toast.error("Please fill in all fields before adding a new form.");
          return; // Prevent adding a new form if validation fails
        }
      
        // Add a new form if validation passes
        setFormData([...formData, { gradelevel: '', name:'', program:''}]);
    };

    //remove from
    const handleRemoveForm = (index: number) => {
        setFormData(formData.filter((_, i) => i !== index));
    };

  
    const handleChange = (index: number, field: keyof FormData, value: string) => {
        setFormData((prevFormData) => {
            const newFormData = [...prevFormData];
            if (field === 'gradelevel') {
                // Update gradelevel and program based on selected gradelevel
                const selectedLevel = levels.find((level) => level.id === value);
                newFormData[index].program = selectedLevel ? selectedLevel.program : '';
            }
            (newFormData[index][field] as string) = value;
            return newFormData;
        });
    };
    


    useEffect(() => {
        setFormData([{ gradelevel: '', name:'', program:''}])
    }, [createModal])

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

   
    //create section
    const create = async () => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/section/createsection`,{
            name: "10 - St. Edmund Campion",
            gradelevel: "6744138640da6d346727f5b7", 
            program: "6744138640da6d346727f5a6"
            }, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Creating section....',
                success: `Created successfully`,
                error: 'Error while creating section',
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

    const createMultiple = async () => {
        setLoading(true);
        router.push('?state=true');
    
        try {
            // Map formDataArray to API requests
            const requests = formData.map((data) => 
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/section/createsection`, data, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            );
    
            // Use Promise.all to handle all requests
            const responses = await toast.promise(
                Promise.all(requests), // Wait for all requests
                {
                    loading: 'Creating sections...',
                    success: 'All sections created successfully!',
                    error: 'Error while creating sections.',
                }
            );
    
            // Check individual responses
            const allSuccessful = responses.every((res) => res.data.message === 'success');
            if (allSuccessful) {
                setLoading(false);
                setCreateModal(false);
                router.push('?state=false');
            }
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response) {
                    // Handle specific status codes
                    toast.error(axiosError.response.data.data || 'An error occurred');
                } else {
                    toast.error('Network error or no response from server.');
                }
            } else {
                toast.error('An unexpected error occurred.');
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
            <DialogTitle className=' text-lg'>Create Section</DialogTitle>
            <DialogDescription className=' text-xs'>
                Enter section details below.
            </DialogDescription>
            </DialogHeader>
            {formData.map((item, index) => (
                <div key={index} className={` w-full flex flex-col ${formData.length > 1 && ' border-b-[1px] border-blue-200m pb-4'}`}>
                    

                    <label htmlFor="firstname" className=' mt-2'>Grade Level</label>
                    <Select 
                    value={item.gradelevel}
                    onValueChange={(value) => handleChange(index, 'gradelevel', value)}
                    >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent className=' text-xs'>
                            {levels.map((item, index) => (
                                <SelectItem onClick={() => setProgram(item.program)} key={item.id} value={item.id}>{item.level}</SelectItem>
                            ))}
                          
                          
                        </SelectContent>
                      </Select>

                    <label htmlFor="firstname" className=' mt-2'>Section Name</label>
                    <input type="text" placeholder='Name' className=' input-primary'
                    value={item.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    />


                    {index !== 0 && (
                        <div className=' w-full flex items-end justify-end text-[.7em] mt-2'>
                            <button onClick={() => handleRemoveForm(index)} className=' bg-red-500 px-2 py-1 rounded-md flex items-center gap-1 text-white '><img src='/icons/trashwhite.png' height={15} width={15}/>Remove</button>
                        </div>
                    )}
                    

                </div>
            ))}

           

                <div className=' w-full flex items-end justify-end mt-6 gap-2'>
                    <button onClick={createMultiple} className=' action-btn'>
                        {loading === true && <span className=' loader'></span> }
                        Save</button>
                    <button onClick={handleAddForm} className=' light-btn'><img src='/icons/plus-square.png' width={15} height={15}/>Add Form</button>
                </div>
           
        </DialogContent>
        </Dialog>
  )
}
