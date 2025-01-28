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
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CreateSection from '@/components/forms/CreateSection'
import EditSection from '@/components/forms/EditSection'
import EditSections from '@/components/forms/EditSection'
 

type Sections = {
    id: string
    name: string
    status: string
    students: string
    gradelevel: string
    program: string
}

export default function SectionTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [list, setList] = useState<Sections[]>([])
    const params = useSearchParams()
    const refresh = params.get('state')
    const [modal, setModal] = useState(false)
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }

    //section list
    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/section/getallsections?page=${currentpage}&limit=10&search=${search}&filter&status=active`,
                { withCredentials: true }
              );
          
            setLoading(false)
            console.log(res.data)
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

    const deleteSection = async (id: string) => {
        setLoading(true)
        router.push('?state=true')
       
        try {
             const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/section/deletesection?id=${id}&status=inactive`, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    
            const response = await toast.promise(request, {
                loading: 'Deleting section....',
                success: `Deleted successfully`,
                error: 'Error while deleting section',
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

               <CreateSection/>

            </div>
          <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' input-primary' />
          
        </div>
        <Table className=' mt-4'>
        {list.length === 0 && <TableCaption>No Data</TableCaption> }
        {loading === true &&  <TableCaption><span className=' loader2'></span></TableCaption> }
        <TableHeader>
            <TableRow>
         
            <TableHead>Section Name</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Program</TableHead>
           
            <TableHead className=" w-[250px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((item, index) => (
                <TableRow key={index}>
            
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.gradelevel}</TableCell>
                <TableCell>{item.program}</TableCell>
                <TableCell className=' flex flex-wrap w-[250px] items-center gap-2'>
                    
                  <EditSections id={item.id} level={item.gradelevel} name={item.name}/>
    
                    <Dialog open={modal} onOpenChange={setModal}>
                    <DialogTrigger className=' danger-btn'>
                        <img src='/icons/info-circle.png' width={15} height={15}/>Delete
                    </DialogTrigger>
                    <DialogContent className=' text-xs'>
                        <DialogHeader>
                        <DialogTitle className=' text-lg text-red-600'>Delete Section</DialogTitle>
                        <DialogDescription className=' text-xs'>
                            Are you sure you want to delete this section.
                        </DialogDescription>
                        </DialogHeader>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="firstname" className=' mt-2'>Program</label>
                            <input disabled={true} defaultValue={item.program} type="text" placeholder='Name' className=' input-primary' 
                            />

                            <label htmlFor="firstname" className=' mt-2'>Grade Level</label>
                            <input disabled={true} defaultValue={item.gradelevel} type="text" placeholder='Name' className=' input-primary' 
                            />
                            <label htmlFor="firstname" className=' mt-2'>Section Name</label>
                            <input disabled={true} defaultValue={item.name} type="text" placeholder='Name' className=' input-primary'
                            />
    
                            <div className=' w-full flex items-end justify-end mt-6'>
                                <button onClick={() => deleteSection(item.id)} className=' action-danger'>
                                {loading === true && <span className=' loader'></span> }
                                    
                                <img src='/icons/trashwhite.png' width={20} height={20}/>
                                Delete</button>
    
                            </div>
    
                        </div>
                    </DialogContent>
                    </Dialog>
    
                    
                </TableCell> 
            </TableRow>
            ))}
        
       
        </TableBody>
        </Table>

        {list.length !== 0 && (
           <div className=' w-full flex items-center justify-center'>
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
        </div>
        )}
        
    </div>
  )
}
