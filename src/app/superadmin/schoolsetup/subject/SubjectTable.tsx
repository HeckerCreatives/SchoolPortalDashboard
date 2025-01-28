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
import Pagination from '@/components/common/Pagination'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Check, X } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CreateSubject from '@/components/forms/CreateSubject'
import EditSubject from '@/components/forms/EditSubject'
  
  
interface entranceexam {
    id: string,
    ticketid: string
    username: string
    examstatus: string
    examscore: number
    fullname: string
    email: string
    address: string
    schedule: schedule
}

interface schedule {
  scheduleid: string
  starttime: string
  endtime: string
  date: Date
}

interface subject {
  id: string
  name: string
  createdAt: Date
  status: string
}

export default function SubjectTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState("")
    const router = useRouter()
    const [list, setList] = useState<subject[]>([])
    const [subjectName, setSubjectName] = useState('');
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
    const params = useSearchParams()
    const refresh = params.get('state')


    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }

      //subject list
    useEffect(() => {
      setLoading(true)
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/subject/getsubjects?page=${currentpage}&limit=10&search=${search}&status=active`,
              { withCredentials: true }
            );
        
          setLoading(false)
          setList(res.data.data.data)
          setTotalpage(res.data.data.totalPages)

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
  }, [currentpage,search, refresh]);

  const deleteSubject = async (id: string) => {
      setLoading(true)
      router.push('?state=true')
     
      try {
           const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subject/deletesubjects?id=${id}`, {
              withCredentials: true,
              headers:{
                  'Content-Type': 'application/json'
              }
          })
  
          const response = await toast.promise(request, {
              loading: 'Deleting subject....',
              success: `Deleted successfully`,
              error: 'Error while deleting subject',
          });
  
          if (response.data.message === 'success'){
              setLoading(false)
              router.push('?state=false')
              setModal(false)
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
      const getList = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/getallgradelevel`,
            { withCredentials: true }
          );

          console.log(res.data)
          // setlevels(res.data.data)
    
        } catch (error) {
        
        
        }
      };

      getList();

  }, []);

    return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' w-full flex items-center justify-between p-2 gap-2 text-xs'>
            <div className=' flex items-center gap-2 text-xs rounded-md text-black'>

                <CreateSubject/>

            </div>
          <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' bg-pink-50 p-2 rounded-md' />
          
        </div>
        <Table className=' mt-4'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
            <TableRow>
         
            <TableHead>Subject Name</TableHead>
            <TableHead>Created at</TableHead>
           
            <TableHead className=" w-[250px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {list.length > 0 && (
            list.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.name || "N/A"}</TableCell>
                <TableCell>
                  {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="flex flex-wrap items-center gap-2 w-[250px]">
                  {/* Edit Subject */}
                  <EditSubject
                    subjectId={data.id}
                    currentName={data.name}
                    onUpdate={() => {
                      router.push('?state=true'); // Trigger refresh
                    }}
                  />
                  {/* Delete Dialog */}
                  <Dialog>
                    <DialogTrigger className="light-btn">
                      <img src="/icons/info-circle.png" width={15} height={15} alt="Delete" />
                      Delete
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Subject</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this subject?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => deleteSubject(data.id)}
                          className="action-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>

            ))
          )}
       
        </TableBody>
        </Table>

        <div className=' w-full flex items-center justify-center'>
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        </div>

        
    </div>
  )
}
