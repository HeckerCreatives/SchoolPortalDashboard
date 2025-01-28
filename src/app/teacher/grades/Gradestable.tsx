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
import { useRouter } from 'next/navigation'
import { GradeLevels, Liststudentgrades, Sections } from '@/hooks/interface'
import { Eye } from 'lucide-react'

interface Sectionbyteacher {
  sectionid: string
  sectionName: string
  gradeLevelName: string
}

interface Teachersubjects  {
  id: string
  name: string
}
  

export default function GradesTable() {
    const [open, setOpen] = useState(false)
    const [selectedsection, setSelectedsection] = useState('')
    const [selectedsubject, setSelectedSubject] = useState('')
    const [list, setList] = useState<Liststudentgrades[]>([])
    const router = useRouter()
    const [subjects, setSubjects] = useState<Teachersubjects[]>([])
    const [section, setSection] = useState<Teachersubjects[]>([])


  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/getsubjectteacher`,
          { withCredentials: true }
        );
        setSubjects(res.data.data)

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

  }, []);

  useEffect(() => {
  const getList = async () => {
  try {

    if(selectedsubject !== '' ){
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/getsubjectsectionteacher?subjectid=${selectedsubject}`,
        { withCredentials: true }
      );
  
      setSection(res.data.data)
    }
   
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

  }, [selectedsubject]);

  useEffect(() => {
    const getList = async () => {
      try {
        if(selectedsection !== '' && selectedsubject !== '') {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/section/studentlistbysectionidteacher?sectionid=${selectedsection}&subjectid=${selectedsubject}`,
                { withCredentials: true }
              );
              
              console.log(res.data.data)
              setList(res.data.data.students)
        }
    
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

}, [selectedsection, selectedsubject]);


  return (
    <div className=' w-full bg-white p-4'>
        <div className=' flex items-center justify-between'>
            <div className=' flex items-center gap-4'>
             
                <Select value={selectedsubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className=" w-[150px] bg-zinc-100 text-xs">
                    <SelectValue placeholder="Subjects" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((item, index) => (
                    <SelectItem key={index} value={item.id}>{item.name}</SelectItem>

                    ))}
                    
                </SelectContent>
                </Select>

                <Select value={selectedsection} onValueChange={setSelectedsection}>
                <SelectTrigger className=" w-[150px] bg-zinc-100 text-xs">
                    <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                    {section.map((item, index) => (
                    <SelectItem key={index} value={item.id}>{item.name}</SelectItem>

                    ))}
                    
                </SelectContent>
                </Select>
            </div>
           

          <input type="text" name="" id=""  placeholder='Search' className=' input-primary bg-white' />



        </div>

    


    

    <Table className=' bg-white p-4 mt-6'>
        {list.length === 0 && (
        <TableCaption>No data.</TableCaption>

        )}
    <TableHeader>
        <TableRow>
        <TableHead className="">Student Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Action</TableHead>
        
        </TableRow>
    </TableHeader>
    <TableBody>

        {list.map((item, index) => (
            <TableRow key={item.id} className=' hover:bg-none'>
                <TableCell className="">{item.id}</TableCell>
                <TableCell className="">{item.fullname}</TableCell>
                <TableCell className="">
        
                    <a href={`/teacher/grades/studentgrades?id=${item.id}`} target='_blank' className="bg-pink-100 p-2 rounded-md flex items-center gap-2 w-fit"><Eye size={10}/> View Grades</a>
                </TableCell>
            </TableRow>

        ))}
        
       
    </TableBody>
    </Table>

   


    </div>
  )
}
