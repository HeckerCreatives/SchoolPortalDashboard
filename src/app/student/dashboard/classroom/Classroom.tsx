'use client'
import { formatDate } from '@/hooks/helpers';
import { Assignment, Classroom } from '@/hooks/interface';
import useUserStore from '@/zustand/store';
import axios, { AxiosError } from 'axios';
import { ArrowLeft, ClipboardList, File, List, Send, Trash, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import studentClasroomStore from '@/zustand/classroomview';
import userClassroomid from '@/zustand/classroomid';
  

  const gradients = [
    "bg-gradient-to-r from-blue-500 to-purple-500",
    "bg-gradient-to-r from-green-500 to-teal-500",
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-violet-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    "bg-gradient-to-r from-rose-500 to-amber-500",
    "bg-gradient-to-r from-emerald-500 to-sky-500",
    "bg-gradient-to-r from-violet-500 to-purple-500",
  ];



export default function ClassList () {
    const [id, setId] = useState('')
    const [subjects, setSubjects] = useState<Classroom>()
    const [sectionid, setSectionId] = useState('')
    const [subjectid, setSubjectid] = useState('')
    
    const [fileName, setFileName] = useState<string | null>(null);
    const [files, setFiles] = useState<File | null>(null);
    const [assignment, setAssignment] = useState<Assignment[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { userId, setUserId, clearUserId } = useUserStore();
    const [submissions, setSubmissions] = useState()
    const router = useRouter()
    const { view , setView, clearView} = studentClasroomStore()
    const params = useSearchParams()
    const idSubject = params.get('subjectid')
    const idsection = params.get('sectionid')

    

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFiles(file)
    } else {
      setFileName(null);
      setFiles(null)

    }
  };


    const findSubject = subjects?.subjects.find((item) => item.subjectid === idSubject)

    useEffect(() => {
        const getSubjects = async () => {
            if(sectionid !== ''){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/section/getsubjectlistbystudent?section=6789ff6ac4a1da864a9e8fc3`,{
                    withCredentials: true
                })
    
                console.log(response.data)
                setSubjects(response.data.data)
            }
        }
        getSubjects()
    },[sectionid])

     const getRandomGradient = () => {
        const randomIndex = Math.floor(Math.random() * gradients.length);
        return gradients[randomIndex];
      };


      useEffect(() => {
        const getData =  async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedule/getstudentschedule`,{
                withCredentials: true
            })
    
        console.log(response.data)
        setSectionId(response.data.data[0].sectionid)
    
        }
        getData()
    },[])

    useEffect(() => {
        const getSubjects = async () => {
            if(idsection && idSubject !== undefined){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/getassignmentsstudent?subject=${idSubject}&section=${idsection}`,{
                    withCredentials: true
                })
    
                console.log(response.data)
                setAssignment(response.data.data)
            }
                
        }
        getSubjects()
    },[idSubject, idsection])

    const getAssignments = async () => {
        if(idsection && idSubject !== undefined){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/getassignmentsstudent?subject=${idSubject}&section=${idsection}`,{
                withCredentials: true
            })

            console.log(response.data)
            setAssignment(response.data.data)
        }
            
    }

    const submitAssingment = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/assignment/submitassignment`,{
                assignmentid: id,
                file: files
            },{
                withCredentials: true,
                headers: {
                'Content-Type': 'multipart/form-data',
              }
            })

            if ( response.data.message === 'success') {
                toast.success('Successfully submitted');
                setLoading(false)
                setOpen(false)
                getAssignments()
                
        
                }

            console.log(response.data)
        } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
                router.push('/')
                toast.error(axiosError.response.data.data);
              }

            if (axiosError.response && axiosError.response.status === 400) {
              toast.error(axiosError.response.data.data);                
            }

            if (axiosError.response && axiosError.response.status === 402) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 403) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 404) {
              toast.error(axiosError.response.data.data);                
            }
        } 

            
        }
    }

    const deleteSubmission = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/deletesubmission?assignmentid=${id}`,{
                withCredentials: true,
                headers: {
                'Content-Type': 'multipart/form-data',
              }
            })

            if ( response.data.message === 'success') {
                toast.success('Successfully deteled');
                setLoading(false)
                setOpen(false)
                getAssignments()
                
        
                }

            console.log(response.data)
        } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
                router.push('/')
                toast.error(axiosError.response.data.data);
              }

            if (axiosError.response && axiosError.response.status === 400) {
              toast.error(axiosError.response.data.data);                
            }

            if (axiosError.response && axiosError.response.status === 402) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 403) {
              toast.error(axiosError.response.data.data);
            }

            if (axiosError.response && axiosError.response.status === 404) {
              toast.error(axiosError.response.data.data);                
            }
        } 

            
        }
    }

  

  return (
    <div className=" w-full max-w-[1240px] p-4">
        {view === 'view1' ? (
            <>
            <h1 className="text-xl font-bold mb-4">Classroom</h1>
            <div className=" auto-cols-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects?.subjects.map((cls, index) => (
                <div onClick={() => {setId(subjects.section[0].sectionid), setView('view2'), setSubjectid(cls.subjectid), router.push(`?subjectid=${cls.subjectid}&sectionid=${subjects.section[0].sectionid}`)}} key={index} className={`text-white cursor-pointer ${getRandomGradient()} border border-gray-50 p-4 h-[150px] shadow-sm hover:border-b-4 hover:border-b-pink-500 transition-colors duration-300 flex items-center justify-center`}>
                    <div className="flex justify-between items-end w-full">
                        <div>
                            <div className=' w-12 aspect-square rounded-full bg-zinc-50 flex items-center justify-center'>
                                <p className="text-pink-500 font-semibold uppercase text-xs">{cls.subjectdetails.slice(0,3)}</p>
                            </div>
                            <h2 className="text-xl font-semibold">{cls.subjectdetails}</h2>
                            <h2 className="text-xs text-zinc-200">{subjects.section[0].section} </h2>
                            {/* <p className="text-gray-600">{cls.name}</p> */}
                        </div>
                        <div>
                            <p className="text-xs text-gray-200">{cls.teachername}</p>
                            {/* <p className="text-xs text-gray-500">{cls.instructor}</p> */}
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </>
        ): (
            <div className=' w-full flex flex-col gap-6'>
                <div className={`relative flex flex-col justify-end w-full h-[250px] ${getRandomGradient()} p-6 shadow-sm text-white`}>
                    <div className=' absolute top-6 left-6'>
                        <button onClick={() => clearView()} className=' p-2 rounded-full bg-pink-100 text-black'><ArrowLeft size={20}/></button>
                    </div>
                    <div className=' flex items-center justify-between'>
                        <div className=' w-full flex flex-col'>
                            <h2 className="text-4xl font-semibold">{findSubject?.subjectdetails}</h2>
                            <p className="text-gray-100 text-lg">{subjects?.section[0].section}</p>
                        </div>

                        <div className=' flex flex-col'>
                            <p className="text-xs text-gray-100">{findSubject?.teachername}</p>
                        </div>

                    </div>
                
                </div>
                <div className=' w-full flex flex-col gap-8'>
                    <p className=' font-semibold text-sm'>Assignments & Activities</p>

                    <div className=' w-full flex flex-col gap-2'>

                    {assignment.length === 0 ? (
                            <div className=' h-[200px] flex items-center justify-center w-full'>
                                <p className=' text-xs text-zinc-500'>No assignment or activities.</p>

                            </div>
                        ) : (
                            <>
                                {assignment.map((item, index) => {

                                const userSubmission = item.submissions.find((submission) => submission.student === userId);

                                    return (
                                        <div key={item._id} className=' relative flex items-start gap-4 w-full bg-white h-auto shadow-sm p-6'>
                                    <div className=' p-4 rounded-full bg-pink-100'>
                                        <ClipboardList size={20}/>

                                    </div>

                                    <div className=' w-[80%] flex flex-col gap-1'>
                                        <h2 className=' text-sm font-medium'>{item.title} </h2>
                                        <p className=' text-xs text-zinc-400'>{item.description}</p>
                                        <p className=' text-xs text-zinc-400 mt-2'>Deadline: {formatDate(item.duedate)} </p>
                                        {item.questdetails.length !== 0 && (
                                            <p className=' text-pink-400 text-xs mt-2 flex items-center gap-2'> <span className=' text-black'>Quest:</span>{item.questdetails[0].description} </p>

                                        )}

                                         {/* Display submission data if it exists */}
                                        {userSubmission && (
                                        <div className=" flex h-[32px] items-center gap-4 mt-2 border-collapse border-gray-200 border-[1px] w-fit">
                                          
                                            {userSubmission.file && (
                                            <p className="text-xs px-4 text-green-500">
                                               {userSubmission.file} submitted
                                            </p>
                                            )}

                                            <Dialog>
                                            <DialogTrigger className='h-full px-2 bg-red-600  text-white'>
                                                <Trash2 size={15}/>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                <DialogTitle>Delete submission</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete your submission?
                                                </DialogDescription>
                                                </DialogHeader>

                                                <div className=' w-full flex items-end justify-end gap-2'>
                                                    <button className=' bg-gray-100 px-4 py-2 text-xs'>Cancel</button>
                                                    <button disabled={loading} onClick={() => deleteSubmission(item._id)} className=' action-danger text-xs'>
                                                    
                                                           {loading === true && <span className=" loader"></span>}
                                            
                                                        Delete</button>
                                                </div>
                                            </DialogContent>
                                            </Dialog>




                                            
                                        </div>
                                        )}

                                        <div className=' w-full flex items-center gap-2 mt-8'>
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                            <label className="cursor-pointer">
                                                <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                />
                                                <div className="px-16 py-2 border border-gray-300 rounded-sm text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                                                {fileName ? `Selected: ${fileName}` : "Upload a file"}
                                                </div>
                                            </label>
                                            {/* {fileName && (
                                                <p className="text-sm text-gray-500">File selected: {fileName}</p>
                                            )} */}
                                            </div>

                                            <button onClick={() => submitAssingment(item._id)} className=' bg-pink-500 p-2 text-white rounded-sm '><Send size={16}/></button>
                                        </div>
                                    </div>

                                </div>

                                    )
                                
                                })}
                            </>
                        )}

                       
                        
                    </div>

                </div>

            </div>
        )}
      

      
    </div>
  );
};
