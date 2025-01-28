'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { Assignments, GradeLevels, Liststudentgrades, Sections } from '@/hooks/interface'
import { Eye, Plus } from 'lucide-react'
import userAssignmentid from '@/zustand/assignment'

interface Sectionbyteacher {
  sectionid: string
  sectionName: string
  gradeLevelName: string
}

interface Teachersubjects  {
  id: string
  name: string
}
  

export default function SubmissionTable() {
    const [open, setOpen] = useState(false)
    const [list, setList] = useState<Assignments[]>([])
    const router = useRouter()
    const params = useSearchParams()
    const id = params.get('assignmentid')
    const { assignmentId } = userAssignmentid();
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleCheckboxChange = (id: string) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    };
    




  useEffect(() => {
    const getList = async () => {
        if(id !== undefined) {
            try {
        
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/assignment/viewsubmissions?assignmentid=${id}`,
                    { withCredentials: true }
                  );
                  console.log(res.data)
                  setList(res.data.data)
           
    
          } catch (error) {
        
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string; data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                toast.error(`${axiosError.response.data.data}`);
                router.push("/");
              }
            }
          }
        }

      
    };

    getList();

  }, []);

  const addScore = async (assignmentid: string, studentid: string) => {
    setLoading(true)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/assignment/addscore`,{
            assignmentid: assignmentid,
            studentid: studentid,
            score: score
        },{
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
          }
        })

        if ( response.data.message === 'success') {
            getList()
            toast.success('Score added successfully');
            setLoading(false)
            setOpen(false)
    
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


const getList = async () => {
    if(id !== undefined) {
        try {
    
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/assignment/viewsubmissions?assignmentid=${id}`,
                { withCredentials: true }
              );
              console.log(res.data)
              setList(res.data.data)
       

      } catch (error) {
    
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string; data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`);
            router.push("/");
          }
        }
      }
    }

  
};

const sendPoints = async () => {
        try {
    
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/quest/sendpoints`,{
                    questid: list[0]?.quest[0].id,
                    points: list[0]?.quest[0].points,
                    students: selectedIds
                },
                { withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                      }
                 }
              );
              console.log(res.data)
              setList(res.data.data)
       

      } catch (error) {
    
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string; data: string }>;
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
  
};


return (
    <div className=' w-full bg-white p-4'>
        {list[0]?.quest.length !== 0 && (
            <div className=' flex flex-col gap-2 text-xs'>
                <p className=' text-lg font-semibold text-pink-500'>Quest</p>
                <p>{list[0]?.quest[0]?.descrtiption}</p>
                <p className=' text-zinc-500'>Points:{list[0]?.quest[0].points}</p>

                {list[0]?.quest[0].status === 'Active' ? (
                    <>
                    <button onClick={() => sendPoints()} className=' action-btn w-fit'>Send points</button>

                    <p className=' text-red-500 '>Note: Please select a student below who completed the quest.</p>
                    </>
                ) : (
                    <p className=' text-green-500 text-xs'>Completed</p>
                )}

                
            </div>
        )}
        

    


    

    <Table className=' bg-white p-4 mt-6'>
        {list.length === 0 && (
        <TableCaption>No data.</TableCaption>

        )}
    <TableHeader>
        <TableRow>
        <TableHead className="">Select</TableHead>
        <TableHead className="">Student Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Score</TableHead>
        <TableHead>Action</TableHead>
        
        </TableRow>
    </TableHeader>
    <TableBody>

        {list[0]?.submissions.map((item, index) => (
            <TableRow key={index} className=' hover:bg-none'>
                <TableCell className="">
                    <input type="checkbox" 
                     checked={selectedIds.includes(item.student)} 
                     onChange={() => handleCheckboxChange(item.student)}
                    name="" id="" />
                </TableCell>
                <TableCell className="">{item.studentDetails.firstName} {item.studentDetails.lastName}</TableCell>
                <TableCell className=" ">
                    <a href={`${process.env.NEXT_PUBLIC_API_URL}/${item.file}`} target='_blank' className='px-4 py-2 bg-gray-100 rounded-sm w-fit flex items-center gap-2'><Eye size={15}/>{item.file}</a>
                </TableCell>
                <TableCell className="">{item.score}</TableCell>
                <TableCell className="">
                    
                    <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger className='action-btn text-xs'>
                                                <Plus size={15}/> Add score
                                            </DialogTrigger>
                                            <DialogContent className=' flex flex-col gap-2'>
                                                <DialogHeader>
                                                <DialogTitle>Add score</DialogTitle>
                                                <DialogDescription>
                                                </DialogDescription>
                                                </DialogHeader>

                                                <label htmlFor="" className=' text-xs'>Score</label>

                                                <input value={score} onChange={(e) => setScore(e.target.valueAsNumber)} type="number"  className='input-primary' />

                                                <div className=' w-full flex items-end justify-end gap-2 mt-4'>
                                                    <button className=' bg-gray-100 px-4 py-2 text-xs'>Cancel</button>
                                                    <button onClick={() => addScore(list[0]._id,item.student)} disabled={loading} className=' action-btn text-xs'>
                                                    
                                                           {loading === true && <span className=" loader"></span>}
                                            
                                                        Save</button>
                                                </div>
                                            </DialogContent>
                                            </Dialog>
                </TableCell>
                {/* <TableCell className="">
        
                    <a href={`/teacher/grades/studentgrades?id=${item.id}`} target='_blank' className="bg-pink-100 p-2 rounded-md flex items-center gap-2 w-fit"><Eye size={10}/> View Grades</a>
                </TableCell> */}
            </TableRow>

        ))}
        
       
    </TableBody>
    </Table>

   


    </div>
  )
}
