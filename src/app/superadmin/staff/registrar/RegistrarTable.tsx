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
import { createStaff, CreateStaff } from '@/validations/validatiion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { string } from 'zod'
import { formatDate } from '@/hooks/helpers'
import EditStaff from '@/components/forms/EditStaff'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import ChangeStaffRole from '@/components/forms/ChangeStaffRole'
import CreateStaffAccount from '@/components/forms/CreateStaff'
import UpdateStaffStatus from '@/components/forms/UpdateStaffStatus'

 type Staff = {
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
  

export default function RegistrarTable() {
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [search, setSearch] = useState("")
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [staff, setStaff] = useState<Staff[]>([])
    const [filter, setFilter] = useState('')
    const params = useSearchParams()
    const refresh = params.get('state')
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [role, setRole] = useState('')
    const [staffName, setStaffname] = useState('')

    const handleSelect = (id: string) => {
      setSelectedId((prev) => (prev === id ? null : id)); // Toggle selection
    };
    
    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

    //admin list
    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/staffuserlist?page=${currentpage}&limit=10&filter=registrar&search=${search}&status=${filter}`,
                { withCredentials: true }
              );
              setStaff(res.data.data.data);
              setTotalpage(res.data.data.totalPages);
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
    }, [currentpage, filter, search, refresh]);

    //reset currentpage
    useEffect(() => {
        setCurrentpage(0)
    },[filter, search])

    //status color
    const setColor = (data: string) => {
        if(data === 'active'){
            return 'text-blue-300'
        } else {
            return 'text-red-300'
        }
    }

      


    return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' w-full flex md:flex-row flex-col items-center justify-between p-2 gap-2 text-xs'>
            <div className=' flex flex-wrap items-center gap-2 text-xs rounded-md text-black'>
                
            <ChangeStaffRole id={selectedId || ''} role={role} name={staffName}/>


                <CreateStaffAccount role={'registrar'} name={'Registrar'}/>

                <DropdownMenu>
                <DropdownMenuTrigger className=' focus:ring-0 light-btn'>
                    <img src='/icons/filter.png' width={15} height={15}/> Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem onClick={() => setFilter('')} className=' text-xs flex items-center gap-2 cursor-pointer'>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('active')} className=' text-xs flex items-center gap-2 cursor-pointer'>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('inactive')} className=' text-xs flex items-center gap-2 cursor-pointer'>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
          <input type="text" name="" id="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' input-primary' />
          
        </div>
        <Table className=' mt-4'>
        
        {staff.length === 0 && <TableCaption>No Data</TableCaption> }
        {loading === true &&  <TableCaption><span className=' loader2'></span></TableCaption> }
        <TableHeader>
            <TableRow>
            
            <TableHead>
                Select
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone no.</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date of birth</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {staff.map((item, index) => (
                 <TableRow key={item.id}>
                 <TableCell>
                 <input 
                    checked={selectedId === item.id}
                    onChange={() => {handleSelect(item.id),setRole(item.role), setStaffname(item.fullname)}}
                    type="checkbox" name="" id="" />
                 </TableCell>
                 <TableCell>{item.username}</TableCell>
                 <TableCell>{item.fullname}</TableCell>
                 <TableCell>{item.email}</TableCell>
                 <TableCell>{item.contact}</TableCell>
                 <TableCell>{item.address ? item.address.slice(0,20) : ''}</TableCell>
                 <TableCell>{item.dateofbirth ? formatDate(item.dateofbirth) : ''}</TableCell>
                 <TableCell className={`${setColor(item.status)}`}>{item.status}</TableCell>
                 <TableCell className=' flex items-center gap-2'>

                    <EditStaff firstname={item.fullname ? item.fullname.split(' ')[0] : ''} middlename={item.fullname ? item.fullname.split(' ')[1] : ''} lastname={item.fullname ? item.fullname.split(' ')[2] : ''} address={item.address} contact={`${item.contact}`} email={item.email} dateofbirth={item.dateofbirth ? formatDate(item.dateofbirth) : ''} gender={item.gender} id={item.id}/>
                     
     
                    <UpdateStaffStatus id={item.id} name={item.fullname} status={item.status}/>
                 </TableCell> 
             </TableRow>
            ))}
       
       
        </TableBody>
        </Table>

        {staff.length !== 0 && (
            <div className=' w-full flex items-center justify-center'>
                <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
            </div>
        )}
       

        
    </div>
  )
}


