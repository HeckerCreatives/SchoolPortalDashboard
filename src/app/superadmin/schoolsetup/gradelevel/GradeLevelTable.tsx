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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CreateGradeLevelForm from '@/components/forms/CreateGradeLevel'
import EditGradeLevelForm from '@/components/forms/EditGradeLevel'  


type FormData = {
    program: string
    gradelevel: string
}  

interface program {
    id: string
    name: string
}

interface gradelevel {
  id: string
  programid: string
  program: string
  level: string
  status: string
  createdAt: Date
}

interface editgradelevel {
  id: string
  program: string
  name: string
}


export default function GradeLevelTable() {
    const [tab, setTab] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const [isValidated, setIsvalidated] = useState(false)
    const [formData, setFormData] = useState([{ program: '', gradelevel: '' }]);
    const [createModal, setCreateModal] = useState(false);
    const [list, setList] = useState<program[]>([]);
    const [levelList, setLevelList] = useState<gradelevel[]>([]);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentEditData, setCurrentEditData] = useState<editgradelevel | null>(null);
    const [modal, setModal] = useState(false)
  
    const router = useRouter();
    const params = useSearchParams();
    const refresh = params.get('state');
  
    // get programs
    useEffect(() => {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/program/getallprogram`, { withCredentials: true });
            setLoading(false);
            setList(res.data.data);
          } catch (error) {
            setLoading(false);
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
    }, [refresh]);

    // get grade levels
    useEffect(() => {
        setLoading(true);
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gradelevel/gradelevellist?page=${currentpage}&limit=10&search=${search}&filter=active`, { withCredentials: true });
              setLoading(false);
              setLevelList(res.data.data.data);
              setTotalpage(res.data.data.totalPages);
            } catch (error) {
              setLoading(false);
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
      }, [currentpage,search,refresh]);
  
    const handleAddForm = () => {
      const lastForm = formData[formData.length - 1];
      const isFormComplete = Object.values(lastForm).every((value) => value !== '');
      if (!isFormComplete) {
        toast.error("Please fill in all fields before adding a new form.");
        return;
      }
      setFormData([...formData, { program: '', gradelevel: '' }]);
    };
  
    const handleRemoveForm = (index: number) => {
      setFormData(formData.filter((_, i) => i !== index));
    };
  
    const handleChange = (index: number, field: keyof FormData, value: string) => {
      setFormData((prevFormData) => {
        const newFormData = [...prevFormData];
        if (typeof value === 'string') {
          (newFormData[index][field] as string) = value;
        }
        return newFormData;
      });
    };
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
  
    const handleSubmit = async () => {
      const isFormComplete = formData.every((form) => form.program && form.gradelevel);
      if (!isFormComplete) {
        toast.error("Please fill in all fields.");
        return;
      }
  
      const dataToSend = formData.map((item) => ({
        program: item.program,
        name: item.gradelevel,
      }));
  
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/creategradelevel`,
          { data: dataToSend },
          { withCredentials: true }
        );
  
        if (res.status === 200) {
          toast.success("Grade levels created successfully!");
          setCreateModal(false);
          router.push('?state=false'); // Refresh the page
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string; data: string }>;
          toast.error(axiosError.response?.data.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    const handleEditSubmit = async (data: { id: string; program: string; name: string }) => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/gradelevel/editgradelevel`,
          { gradelevel: data.id, program: data.program, name: data.name },
          { withCredentials: true }
        );
    
        if (res.status === 200) {
          setEditModal(false);
          setCurrentEditData(null);
          router.push('?state=true'); // Trigger refresh
          toast.success('Grade Level updated successfully!');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string; data: string }>;
          toast.error(axiosError.response?.data.message || 'Something went wrong.');
        }
      } finally {
        setLoading(false);
      }
    };

    const deletegradelevel = async (id: string) => {
      setLoading(true)
      router.push('?state=true')
      try {
           const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gradelevel/deletegradelevel?gradelevel=${id}`, {
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

    return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' w-full flex items-center justify-between p-2 gap-2 text-xs'>
            <div className=' flex items-center gap-2 text-xs rounded-md text-black'>

                <Dialog open={createModal} onOpenChange={setCreateModal}>
                <DialogTrigger className=' light-btn'>
                   <img src='/icons/plus-square.png' height={15} width={15}/>Create
                </DialogTrigger>
                <DialogContent className=' text-xs max-h-[700px] overflow-y-auto '>
                    <DialogHeader>
                    <DialogTitle className=' text-lg'>Create Grade Level</DialogTitle>
                    <DialogDescription className=' text-xs'>
                        Enter subject name below.
                    </DialogDescription>
                    </DialogHeader>
                  
                    <CreateGradeLevelForm
                        list={list}
                        formData={formData}
                        setFormData={setFormData}
                        handleRemoveForm={handleRemoveForm}
                        handleChange={handleChange}
                        handleAddForm={handleAddForm}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        />
                   
                </DialogContent>
                </Dialog>

            </div>
          <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' bg-pink-50 p-2 rounded-md' />
          
        </div>
        <Table className=' mt-4'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
            <TableRow>
         
            <TableHead>Grade Level</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Created at</TableHead>
           
            <TableHead className=" w-[250px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {levelList.length > 0 && (
              levelList.map((data) => (
                <TableRow >
                
                <TableCell>{data.level}</TableCell>
                <TableCell>{data.program}</TableCell>
               <TableCell>{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}</TableCell>
              <TableCell className=' flex flex-wrap w-[250px] items-center gap-2'>
       
                  <Dialog open={editModal} onOpenChange={setEditModal}>
                        <DialogTrigger>
                          <button
                            className="light-btn"
                            onClick={() => {
                              setEditModal(true);
                              setCurrentEditData({
                                id: data.id,
                                program: data.programid,
                                name: data.level,
                              });
                            }}
                          >
                            <img src="/icons/pen.png" width={15} height={15} />
                            Edit
                          </button>
                        </DialogTrigger>

                        {currentEditData && (
                          <EditGradeLevelForm
                            programList={list}
                            gradeLevelData={currentEditData}
                            onSubmit={handleEditSubmit}
                            onClose={() => {
                              setEditModal(false);
                              setCurrentEditData(null);
                            }}
                            loading={loading}
                          />
                        )}
                  </Dialog>
                 

                  <Dialog>
                  <DialogTrigger>
                      <button className='danger-btn '><img src='/icons/info-circle.png' width={15} height={15}/>Delete</button>
                  </DialogTrigger>
                  <DialogContent className=' text-xs'>
                      <DialogHeader>
                      <DialogTitle className=' text-lg text-red-600'>Delete Grade Level</DialogTitle>
                      <DialogDescription className=' text-xs'>
                          Are you sure you want to delete this grade level.
                      </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end mt-4">
                          <button
                            onClick={() => deletegradelevel(data.id)}
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
