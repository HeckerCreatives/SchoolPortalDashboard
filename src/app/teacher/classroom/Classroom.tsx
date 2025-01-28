'use client'
import { gradients } from '@/hooks/data';
import axios from 'axios';
import { ArrowLeft, ClipboardList, Edit, Eye, List, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form';
import { CreateAssingment, createAssingmentteacher } from '@/validations/validatiion';
import { zodResolver } from '@hookform/resolvers/zod';
import { Assignment } from '@/hooks/interface';
import { formatDate } from '@/hooks/helpers';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import userAssignmentid from '@/zustand/assignment';
import EditAssignment from '@/components/forms/EditAssignment';
import EditQuest from '@/components/forms/EditQuest';
import { list } from 'postcss';
  
  

const classes = [
    { code: 'CS3218', name: 'Thesis I', section: 'BSCS-3A', instructor: 'Paul Matthew Bentor' },
    { code: 'NCVI', name: '', section: 'BSCS-4B', instructor: 'John Raymond Calderon' },
    { code: 'BSCS 4B', name: 'CS 4122', section: 'Loma de los Santos', instructor: '' },
    { code: 'CS 4121', name: 'Human Com...', section: '4B', instructor: 'Nicole Rivera' },
    { code: 'PROF ELEC 4 (21-1)', name: '', section: 'BSCS 4A & 4B', instructor: 'Fernando Quiroz' },
    { code: 'STCS CS3220', name: 'Opera...', section: '(CSSB 20-2)', instructor: 'Janeffer Saloonsolin' },
    { code: 'CS 3216', name: 'LABORATOR...', section: 'BSCS 3C', instructor: 'Fernando Quiroz' },
    { code: 'GEES', name: 'Environmental...', section: 'BSCS 3A', instructor: 'marienne' },
  ];

interface TeacherClassroom {
      _id: string
      name:string
      subjectdetails: {
          _id: string
          name: string
      },
      staffdetails: {
          _id: string
          firstname: string
          middlename: string
          lastname:string
      }
    }

export default function Classroom () {
    const [view, setView] = useState('view1')
    const [id, setId] = useState('')
    const [subjectid, setSubjectid] = useState('')
    const [subjects, setSubjects] = useState<TeacherClassroom[]>([])
    const [assignment, setAssignment] = useState<Assignment[]>([])
    const [addquest, setAddquest] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { assignmentId, setAssignmentId } = userAssignmentid();

    

    const findSubject = subjects.find((item) => item._id === id)

    useEffect(() => {
        const getSubjects = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/section/getsubjectlistbyteacher`,{
                    withCredentials: true
                })
    
                console.log(response.data)
                setSubjects(response.data.data)
        }
        getSubjects()
    },[])

    const {
            register,
            handleSubmit,
            setValue,
            reset,
            trigger,
            formState: { errors },
        } = useForm<CreateAssingment>({
            resolver: zodResolver(createAssingmentteacher),
            defaultValues: {
                
              },
        })

    const createAssingment = async (data: CreateAssingment) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/assignment/createassignment`,{
                subject: subjectid,
                section: id,
                title: data.title,
                description: data.desc,
                duedate: data.deadline,
                maxscore: data.score,
                ison: addquest,
                qtitle: data.qtitle,
                qdescription: data.qdesc,
                qpoints: data.qpoints,
            },{
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json',
              }
            })

            if ( response.data.message === 'success') {
                toast.success('Successfully created');
                setLoading(false)
                setOpen(false)
                getAssignments()
                
        
                }

            console.log(response.data)
        } catch (error) {
        setLoading(false)

            
        }
    }

    const deleteAssingment = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/deleteassignment?assignmentid=${id}`,{
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json',
              }
            })

            if ( response.data.message === 'success') {
                toast.success('Successfully deleted');
                setLoading(false)
                setOpen(false)
                getAssignments()
                
        
                }

            console.log(response.data)
        } catch (error) {
        setLoading(false)

            
        }
    }

    const deleteQuest = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quest/deletequest?questid=${id}`,{
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json',
              }
            })

            if ( response.data.message === 'success') {
                toast.success('Successfully deleted');
                setLoading(false)
                setOpen(false)
                getAssignments()
                
        
                }

            console.log(response.data)
        } catch (error) {
        setLoading(false)

            
        }
    }

    const getRandomGradient = () => {
        const randomIndex = Math.floor(Math.random() * gradients.length);
        return gradients[randomIndex];
      };

      useEffect(() => {
        const getSubjects = async () => {
            if(id && subjectid !== ''){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/getassignmentsteacher?subject=${subjectid}&section=${id}`,{
                    withCredentials: true
                })
    
                console.log(response.data)
                setAssignment(response.data.data)
            }
                
        }
        getSubjects()
    },[subjectid, id])

    const getAssignments = async () => {
        if(id && subjectid !== ''){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignment/getassignmentsteacher?subject=${subjectid}&section=${id}`,{
                withCredentials: true
            })

            console.log(response.data)
            setAssignment(response.data.data)
        }
            
    }
  

  return (
    <div className=" w-full p-4">
        {view === 'view1' ? (
            <>
            <h1 className="text-xl font-bold mb-4">Classroom</h1>
            <div className=" auto-cols-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((cls, index) => (
                 <div onClick={() => {setId(cls._id), setView('view2'), setSubjectid(cls.subjectdetails._id)}} key={index} className={`text-white cursor-pointer ${getRandomGradient()} border border-gray-50 p-4 h-[150px] shadow-sm hover:border-b-4 hover:border-b-pink-500 transition-colors duration-300 flex items-center justify-center`}>
                    <div className="flex justify-between items-end w-full">
                        <div>
                            <div className=' w-12 aspect-square rounded-full bg-zinc-50 flex items-center justify-center'>
                                <p className="text-pink-500 font-semibold uppercase text-xs">{cls.subjectdetails.name.slice(0,3)}</p>
                            </div>
                            <h2 className="text-xl font-semibold">{cls.subjectdetails.name}</h2>
                            <h2 className="text-xs text-zinc-200">{cls.name} </h2>
                            {/* <p className="text-gray-600">{cls.name}</p> */}
                        </div>
                        <div>
                            <p className="text-xs text-gray-200">{cls.staffdetails.firstname}</p>
                            {/* <p className="text-xs text-gray-500">{cls.instructor}</p> */}
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </>
        ): (
            <div className=' w-full flex flex-col gap-6'>
                <div className={` relative flex flex-col justify-end w-full h-[250px] ${getRandomGradient()} text-white p-6 shadow-sm`}>
                    <div className=' absolute top-6 left-6'>
                        <button onClick={() => setView('view1')} className=' p-2 rounded-full bg-pink-100 text-black'><ArrowLeft size={20}/></button>
                    </div>
                    <div className=' flex items-center justify-between'>
                        <div className=' w-[80%] flex flex-col'>
                            <h2 className="text-4xl font-semibold">{findSubject?.subjectdetails.name}</h2>
                            <p className="text-gray-200 text-sm">{findSubject?.name}</p>
                        </div>

                        <div className=' flex flex-col'>
                            <p className="text-sm text-gray-200">{findSubject?.staffdetails.firstname} {findSubject?.staffdetails.lastname}</p>
                        </div>

                    </div>
                
                </div>

               
                <div className=' w-full flex flex-col gap-8'>
                    <div className=' flex items-center gap-2'>
                       

                        <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className='action-btn text-xs'>
                           <Plus size={15}/>Create
                        </DialogTrigger>
                        <DialogContent className=' max-h-[80%] overflow-y-auto'>
                            <DialogHeader>
                            <DialogTitle>Create Assignment / Activities</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(createAssingment)} className=' w-full flex flex-col gap-1 text-sm'>
                                <label htmlFor="">Title</label>
                                <input type="text" placeholder='Title' className='input-primary w-full' {...register('title')}/>
                                <p className=" text-[.6rem] text-red-500">{errors.title?.message}</p>


                                <label htmlFor="">Description</label>
                                <textarea placeholder='Description' className='input-primary w-full' {...register('desc')} />
                                <p className=" text-[.6rem] text-red-500">{errors.desc?.message}</p>


                            
                                <label htmlFor="">Total score</label>
                                <input type="text" placeholder='Description' className='input-primary w-full' {...register('score')}/>
                                <p className=" text-[.6rem] text-red-500">{errors.score?.message}</p>


                                <label htmlFor="">Deadline</label>
                                <input type="date" placeholder='Date' className='input-primary w-full' {...register('deadline')}/>
                                <p className=" text-[.6rem] text-red-500">{errors.deadline?.message}</p>

                                <label htmlFor="">Add quest?</label>
                                <Select value={addquest} onValueChange={setAddquest}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent>
                                </Select>

                                {addquest === 'true' && (
                                    <>
                                     <label htmlFor="">Quest Title</label>
                                    <input type="text" placeholder='Title' className='input-primary w-full' {...register('qtitle')}/>
                                    <p className=" text-[.6rem] text-red-500">{errors.qtitle?.message}</p>


                                    <label htmlFor="">Quest Description</label>
                                    <textarea placeholder='Description' className='input-primary w-full' {...register('qdesc')} />
                                    <p className=" text-[.6rem] text-red-500">{errors.qdesc?.message}</p>

                                    <label htmlFor="">Quest Points</label>
                                    <textarea placeholder='Description' className='input-primary w-full' {...register('qpoints')} />
                                    <p className=" text-[.6rem] text-red-500">{errors.qpoints?.message}</p>
                                    </>
                                )}




                                <div className=' w-full flex items-end justify-end mt-4 gap-2'>
                                    <button className=' action-btn text-sm'>
                                        {loading === true &&(
                                            <div className=' loader'></div>
                                        )}
                                        Create</button>

                                </div>
                            </form>
                        </DialogContent>
                        </Dialog>


                    </div>
                    <p className=' font-semibold text-sm'>Assignments & Activities</p>

                    <div className=' w-full flex flex-col gap-2'>

                        {assignment.length === 0 ? (
                            <div className=' h-[200px] flex items-center justify-center w-full'>
                                <p className=' text-xs text-zinc-500'>No assignment or activities.</p>

                            </div>
                        ) : (
                            <>
                                {assignment.map((item, index) => (
                                <div key={item._id} className=' relative flex items-center gap-4 w-full bg-white h-auto shadow-sm p-6'>
                                    <div className=' p-4 rounded-full bg-pink-100'>
                                        <ClipboardList size={20}/>

                                    </div>

                                    <div className=' w-[80%] flex flex-col gap-1'>
                                        <h2 className=' text-sm font-medium'>{item.title} </h2>
                                        <p className=' text-xs text-zinc-400'>{item.description}</p>
                                        <p className=' text-xs text-zinc-400 mt-2'>Deadline: {formatDate(item.duedate)} </p>

                                        <div className=' flex items-center gap-2'>
                                        {item.questdetails.length !== 0 && (
                                            <>
                                            <p className=' text-pink-400 text-xs mt-2 flex items-center gap-2'> <span className=' text-black'>Quest:</span>{item.questdetails[0].description} </p>
                                            <EditQuest questtid={item.questdetails[0]._id} qtitle={item.questdetails[0].title} qdescription={item.questdetails[0].description} points={`${item.questdetails[0].points}`}/>
                                            

                                            <Dialog>
                                                <DialogTrigger className=''>
                                                <Trash2 size={15}/>

                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                    <DialogTitle>Delete quest</DialogTitle>
                                                        <DialogDescription>
                                                        Are you sure you want to delete this quest?
                                                    </DialogDescription>
                                                    </DialogHeader>
                                            
                                                    <div className=' w-full flex items-end justify-end gap-2'>
                                                        <button className=' bg-gray-100 px-4 py-2 text-xs'>Cancel</button>
                                                        <button disabled={loading} onClick={() => deleteQuest(item.questdetails[0]._id)}  className=' action-danger text-xs'>
                                                                                                
                                                                {loading === true && <span className=" loader"></span>}
                                                                                        
                                                            Delete</button>
                                                    </div>
                                                </DialogContent>
                                                </Dialog>
                                            </>

                                        )}
                                        </div>
                                       

                                        <div className=' flex items-center gap-2 mt-4'>

                                           <EditAssignment  title={item.title} description={item.description} duedate={item.duedate} maxscore={`${item.maxscore}`} assignmentid={item._id}/>

                                             <Dialog>
                                                <DialogTrigger className='action-danger text-[.6rem]'>
                                                    <Trash2 size={15}/>Delete

                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                    <DialogTitle>Delete assingment / activity</DialogTitle>
                                                        <DialogDescription>
                                                        Are you sure you want to delete this assignment / activity?
                                                    </DialogDescription>
                                                    </DialogHeader>
                                            
                                                    <div className=' w-full flex items-end justify-end gap-2'>
                                                        <button className=' bg-gray-100 px-4 py-2 text-xs'>Cancel</button>
                                                        <button disabled={loading} onClick={() => deleteAssingment(item._id)}  className=' action-danger text-xs'>
                                                                                                
                                                                {loading === true && <span className=" loader"></span>}
                                                                                        
                                                            Delete</button>
                                                    </div>
                                                </DialogContent>
                                                </Dialog>

                                        </div>
                                    </div>

                                    <button onClick={() => {setAssignmentId(item._id), router.push(`/teacher/classroom/viewsubmissions?assignmentid=${item._id}`)}} className=' absolute top-2 right-2 bg bg-pink-500 text-xs text-white p-2 flex items-center gap-1 rounded-sm'><Eye size={15}/>Submissions</button>
                                </div>
                            ))}
                            </>
                        )}

                        

                    
                        
                    </div>

                </div>

            </div>
        )}
      

      
    </div>
  );
};
