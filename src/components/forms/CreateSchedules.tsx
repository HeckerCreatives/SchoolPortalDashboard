import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editSchedule, UpdateSchedule } from '@/validations/validatiion';

type Teachers = {
    id: string
    username:  string
    fullname:  string
    contact:  string
    address:  string
    email:  string
    dateofbirth: string
    gender: string
    role:  string
    status: string
}

type Program = {
  id: string
  name: string
}

type GradeLevel = {
  id: string
  level: string
  program: string
}

type Section = {
  id: string
  name: string
  program: string
  level: string
}

type Subject = {
  id: string
  name: string
}

type Schedule = {
    id: string
    day: string
    starttime: string
    endtime:string
    teacher: string
    subject: string
    section: string
  }

  type Props = {
    teacherid: string
    day: string
    children?: React.ReactNode; // Add children here
  };

  const Day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ]

export default function CreateScheduleTeacher(prop: Props) {
    const [modal, setModal] = useState(false)
    const router = useRouter()
    
    const [modal2, setModal2] = useState(false)
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    
    const [selectedProgram, setSelectedProgram] = useState('')
    const [selectedGradeLevel, setSelectedGradeLevel] = useState('')
    const [selectedSection, setSelectedSection] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [day, setDay] = useState('');

    const [teacher, setTeacher] = useState<Teachers[]>([])
    const [program, setProgram] = useState<Program[]>([])
    const [gradeLevel, setGradeLevel] = useState<GradeLevel[]>([])
    const [section, setSection] = useState<Section[]>([])
    const [subject, setSubject] = useState<Subject[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])

    const info = teacher.find((item) => item.id === id )

     // get staff user list
     useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/staffuserlist?page=0&limit=10000&filter=teacher&search=${search}&status=`,
                { withCredentials: true }
              );
             setTeacher(res.data.data.data)
             setId(res.data.data.data[0].id)
             setLoading(false)

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
    }, [search]);
    // get program list
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/program/getallprogram`,
              { withCredentials: true }
            );
            
            setProgram(res.data.data)
          
          } catch (error) {
         
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
    // get grade level
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/getgradelevelbyprogram?program=${selectedProgram}`,
              { withCredentials: true }
            );
            
            setGradeLevel(res.data.data)
          
          } catch (error) {
         
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
  }, [selectedProgram]);
    // get section
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/section/getsectionbygradelevel?level`,
              { withCredentials: true }
            );
            
            setSection(res.data.data)
          
          } catch (error) {
         
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
  }, [selectedGradeLevel]);
   // get subjects
   useEffect(() => {
    const timeoutId = setTimeout(() => {
      const getList = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/subject/getsubjects?status=active`,
            { withCredentials: true }
          );
          
          setSubject(res.data.data.data)
        
        } catch (error) {
       
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
} = useForm<UpdateSchedule>({
    resolver: zodResolver(editSchedule),
    defaultValues: {
        day: prop.day
      },
})

  //edit schedule
  const onSubmit = async (data: UpdateSchedule) => {
      setLoading(true)
      router.push('?state=true')
      try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schedule/createschedule`,{
            teacher: prop.teacherid,
            subject: data.subject,
            section: data.section,
            day: prop.day,
            starttime: data.start,
            endtime: data.end
          }, {
              withCredentials: true,
              headers:{
                  'Content-Type': 'application/json'
              }
          })

          const response = await toast.promise(request, {
              loading: 'Creating schedule....',
              success: `Schedule created successfully`,
              error: 'Error while creating schedule',
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

  useEffect(() => {
    if(prop.day){
      reset({
        day: prop.day
      })
    }
  },[prop.day, reset])

  return (
    <Dialog open={modal} onOpenChange={setModal}>
                <DialogTrigger className=' flex items-start'>
                   {prop.children}
                </DialogTrigger>
                <DialogContent className=' text-xs'>
                    <DialogHeader>
                    <DialogTitle className=' text-lg'>Create Schedule</DialogTitle>
                    <DialogDescription className=' text-xs'>
                        Enter schedule details below.
                    </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} action="" className=' w-full flex flex-col'>
                        {/* <label htmlFor="firstname" className=' mt-2'>Program</label>
                        <Select
                        defaultValue={prop.program}
                        onValueChange={(value) => setValue('program', value)} {...register('program')}
                      >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                          {program.map((program) => (
                            <SelectItem key={program.id} value={program.id}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.program?.message}</p> */}

{/* 
                        <label htmlFor="firstname" className=' mt-2'>Grade level</label>
                        <Select
                        defaultValue={prop.level}
                        onValueChange={(value) => setValue('level', value)} {...register('level')}

                      >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select Grade Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeLevel.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.level?.message}</p> */}


                        <label htmlFor="firstname" className=' mt-2'>Section</label>
                        <Select
                      
                        onValueChange={(value) => setValue('section', value)} {...register('section')}

                      >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select Grade Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {section.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.section?.message}</p>


                        <label htmlFor="firstname" className=' mt-2'>Subject</label>
                        <Select
                    
                        onValueChange={(value) => setValue('subject', value)} {...register('subject')}
                      >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subject.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.subject?.message}</p>

                      <label htmlFor="firstname" className=' mt-2'>Day</label>
                        <Select
                        defaultValue={prop.day}
                        onValueChange={(value) => setValue('day', value)} {...register('day')}
                      >
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select Grade Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {Day.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className=" text-[.6rem] text-red-500">{errors.day?.message}</p>


                        <div className=' w-full flex items-center gap-4 mt-2'>
                            <div className=' w-full'>
                                <label htmlFor="firstname" className=' mt-2'>Start</label>
                                <input 
                                type="time" 
                              
                                {...register('start')}
                                className=' input-primary w-full' />
                                <p className=" text-[.6rem] text-red-500">{errors.start?.message}</p>


                            </div>
                            <div className=' w-full'>
                                <label htmlFor="firstname" className=' mt-2'>End</label>
                                <input 
                                type="time" 
                                {...register('end')}
                                className=' input-primary w-full' />
                                <p className=" text-[.6rem] text-red-500">{errors.end?.message}</p>
                            </div>

                        </div>

                       

                        <div className=' w-full flex items-end justify-end mt-6'>
                            <button disabled={loading} type="submit" className=' action-btn'>
                              {loading === true && <span className=' loader'></span> }
                              Save</button>

                        </div>

                    </form>
                </DialogContent>
      </Dialog>
  )
}
