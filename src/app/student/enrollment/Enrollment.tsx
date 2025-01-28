import { Camera, Info } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios, { AxiosError } from 'axios'
import { formatTimeRange } from '@/hooks/helpers'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ]

type Info = {
    id: string
    levelid:string
        basicinfo: {
            firstname: string
            middlename: string
            lastname: string
            gender: string
            phonenumber: 9465756756765,
            telephonenumber: 789789789,
            address: string
            religion: string
            email: string
            civil: string
            section: string
            program:string
        },
        familyinfo: {
            mother: {
                firstname: string
                contact:string
            },
            father: {
                firstname: string
                lastname: string
                contact: string
            },
            guardian: {
                firstname: string
                lastname: string
                contact: string
            }
        },
        requirements: {
            form137: string
            tor: string,
            birthcertificate: string
        }
}

type Section = {
    id: string
    name: string
    program:string
    level: string
    status: string
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

export default function Enrollment() {
    const [tab, setTab] = useState('Tab1')
    const [info, setInfo] = useState<Info>()
    const [section, setSection] = useState<Section[]>([])
    const [sectionid, setSectionid] = useState('')
    const [schedule, setSchedule] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(false)
        const router = useRouter()
    
    
    
 
    useEffect(() => {
        const getData =  async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/studentuser/getstudentuserdetails`,{
                withCredentials: true
            })

        console.log(response.data)
        setInfo(response.data.data)

        }
        getData()
    },[])

    useEffect(() => {
        const getData =  async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/section/getsectionbygradelevelst?level=${info?.levelid}`,{
                withCredentials: true
            })

        console.log(response.data)
        setSection(response.data.data)

        }
        getData()
    },[info])

    useEffect(() => {
        const getData =  async () => {
            if(sectionid !== ''){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/getschedulebysectionst?section=${sectionid}`,{
                    withCredentials: true
                })
    
            console.log(response.data)
            setSchedule(response.data.data)
            }
            

        }
        getData()
    },[sectionid])

    const groupedSchedule = Day.reduce((acc, day) => {
        acc[day.toLowerCase()] = schedule.filter(item => item.day.toLowerCase() === day.toLowerCase());
        return acc;
      }, {} as { [key: string]: Schedule[] });


      const enroll = async () => {
        setLoading(true)
        router.push('?state=true')
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/section/selectsection`,{
                sectionid: sectionid
            },{
                withCredentials: true,
                headers:{
                  'Content-Type': 'application/json'
                }
            })
  
            const response = await toast.promise(request, {
                loading: 'Processing....',
                success: `Successfully enrolled`,
                error: 'Error while proceesing your enrollment request',
            });
  
            if (response.data.message === 'success'){
                setLoading(false)
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
    <div className=' w-full h-full flex flex-col'>
        <div className=' flex flex-col'>
            <p className=' text-2xl font-medium'>SY 2024-2025 Enrollment is now open.</p>
            <p className=' text-xs text-red-600'>Enrollment ends on Dec.25</p>
        </div>

        <p className=' mt-8 text-lg font-medium'>Profile</p>
        <div className=' flex mt-2'>
            <div className=' flex flex-col gap-2 text-sm w-[400px]'>
                <p onClick={() => setTab('Tab1')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab1' ? ' border-l-4 border-pink-500 font-semibold' : ''}`}>Personal Information</p>
                <p onClick={() => setTab('Tab2')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab2' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Contact Information</p>
                <p onClick={() => setTab('Tab3')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab3' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Family Information</p>
                <p onClick={() => setTab('Tab4')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab4' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Credentials</p>
            </div>

            {tab === 'Tab1' && (
                <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                    <div className=' flex flex-col gap-4 text-sm'>
                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.firstname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.lastname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Middlename </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.middlename} </p>
                        </div>

                        {/* <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Birthdate </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.} </p>
                        </div> */}

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Gender </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.gender} </p>
                        </div>

                        {/* <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Age</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div> */}

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Relegion</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.religion} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Civil Status</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.civil} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-400'>Program</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.program} </p>
                        </div>

                        
                    </div>

                    <div className=' flex flex-col w-full h-full bg-zinc-50 text-xs p-4'>
                        <p>Picture</p>

                        <div className=' w-full h-full flex items-center justify-center'>
                            <div className=' w-[100px] h-[100px] rounded-full bg-zinc-300 flex items-center justify-center'>
                                <Camera size={40} color='white'/>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {tab === 'Tab2' && (
                <div className=' w-full h-auto gap-8 p-8 bg-white'>
                    <div className=' flex flex-col gap-4 text-sm'>
                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Address </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.address} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Email </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.email} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Address </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.phonenumber} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Address </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.telephonenumber} </p>
                        </div>

                        
                    </div>
                </div>
            )}

            {tab === 'Tab3' && (
                <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                    <div className=' flex flex-col gap-4 text-sm'>
                        <p className=' font-semibold'>Mother Information</p>
                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.mother.firstname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Maidenname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.mother.contact}</p>
                        </div>
                        
                    </div>

                    <div className=' flex flex-col gap-4 text-sm'>
                    <p className=' font-semibold'>Father Information</p>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.firstname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.lastname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.contact} </p>
                        </div>
                        
                    </div>

                    <div className=' flex flex-col gap-4 text-sm'>
                    <p className=' font-semibold'>Gurdian Information</p>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.firstname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.lastname} </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.contact} </p>
                        </div>
                        
                    </div>


                    
                </div>
            )}

            {tab === 'Tab4' && (
                <div className=' w-full h-auto bg-white grid grid-cols-4 gap-8 p-8'>
                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/${info?.requirements.birthcertificate}`} className=' underline'>Birth Certificate.pdf</a>
                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>

                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/${info?.requirements.form137}`} className=' underline'>Form 137.pdf</a>

                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>

                    {/* <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Good Moral.pdf</p>
                        </div>
                    </div>

                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Report Card.pdf</p>
                        </div>
                    </div> */}
                </div>
            )}

            
        </div>

        <p className=' mt-8 text-lg font-medium'>Schedule Details</p>

        <div className=' flex flex-col gap-2 mt-4'>
            <label htmlFor="" className=' text-zinc-400 text-xs'>Select Section</label>
            <Select>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
                {section.map((item, index) => (
                <SelectItem onClick={() => setSectionid(item.id)} key={index} value={item.id}>{item.name}</SelectItem>

                ))}
                
            </SelectContent>
            </Select>

        </div>

        <div className=' w-full h-auto bg-white mt-4 p-4'>
            <Table className=' p-2 rounded-md'>
                    <TableHeader>
                        <TableRow className=''>
                          {Day.map((item, index) => (
                          <TableHead key={index} className=' uppercase text-start font-semibold text-xs text-black w-[250px]  border-collapse border-[1px]'>{item}</TableHead>
                          ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow className=' '>
                     {Day.map((day, index) => {
                                const dayData = groupedSchedule[day.toLowerCase()];
                    
                                // Sort dayData by starttime
                                const sortedDayData = dayData
                                  ? [...dayData].sort((a, b) => {
                                      const aTime = parseInt(a.starttime.replace(':', ''), 10);
                                      const bTime = parseInt(b.starttime.replace(':', ''), 10);
                                      return aTime - bTime;
                                    })
                                  : [];
                    
                                return (
                                  <TableCell key={index} className=' w-[100px] border-[1px] border-zinc-300 bg-white'>
                                    <div className=' flex flex-col h-auto'>
                                      {sortedDayData && sortedDayData.length > 0 ? (
                                        sortedDayData.map((item, index) => (
                                          <div key={index} className=' relative mt-2 flex flex-col items-start justify-start w-[200px] bg-zinc-50 p-3 text-[.6rem]'>
                                            <p className=' font-semibold text-xs'>{item.subject}</p>
                                            <p>{formatTimeRange(`${item.starttime} - ${item.endtime}`)}</p>
                                            <p>{item.teacher}</p>
                                            <p>{item.section}</p>
                                          </div>
                                        ))
                                      ) : (
                                        <p className=' text-[.7rem] text-zinc-500 mt-2'>No Schedule</p>
                                      )}
                                    </div>
                                  </TableCell>
                                );
                              })}
                    </TableRow>
                      
                   
                   
                </TableBody>
            </Table>
        </div>

        <div className=' max-w-[450px] text-xs text-zinc-400 flex gap-2 mt-8'>
            <Info className=' w-12 '/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia error modi sit cumque delectus est, illo repellat! Dolor inventore aperiam iure dolore quos neque cum nemo deserunt natus accusamus.</p>
        </div>

        <div className=' flex items-center gap-2 text-sm mt-12'>
            <button disabled={loading} onClick={enroll} className=' action-btn flex items-center justify-center gap-2'>
            {loading === true && <span className=' loader'></span> }
                Enroll now</button>
            <button className=' px-4 py-2 bg-zinc-200 rounded-sm'>Print </button>
        </div>
        
    </div>
  )
}

