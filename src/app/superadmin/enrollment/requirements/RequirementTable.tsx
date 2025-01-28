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
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
  

const tabs = [
    { label: 'On Progress', process: 'pending' },
    { label: 'Approved', process: 'approved' },
    { label: 'Rejected', process: 'denied' },
]

  interface Requirements {
    id: string
    ticketid: string,
    ticketusername: string,
    fullname: string
    address: string
    gender?: string
    email: string
    phonenumber: number
    telephonenumber: number
    mother: string
    father: string
    program: string
    level: string
    form137: string
    birthcertificate: string
    status: string
    denyreason: string
}

export default function RequirementTable() {
    const [tab, setTab] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [process1, setProcess1] = useState('pending')
    const [listLoad, setListload] = useState(false)
    const [denyreason, setDenyReason] = useState("")
    const [denyapprove, setDenyapprove] = useState("")

    const [requirements, setRequirements] = useState<Requirements []>()


    const router = useRouter();

    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
      useEffect(() =>{
        const requirements = async () => {
            setListload(true)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requirement/getrequirements?page=${currentpage}&limit=10&filter=${process1}`,{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        }
                })
                setListload(false)
                setTotalpage(response.data.data.totalPages)
                setRequirements(response.data.data.data)
            } catch (error) {
                 if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        router.push('/')
                        toast.error(axiosError.response.data.data);
                    }

                      if (axiosError.response && axiosError.response.status === 400) {
                        const errorMessage = axiosError.response.data?.data;
                        toast.error(errorMessage);
                
                    }
                } 
                
            }
        }
        requirements()
    },[currentpage, process1])

    const ApproveRequirements = async (id: string,) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requirement/approvedenyrequirement?id=${id}&status=approved&denyreason=${denyreason}`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if ( response.data.message === 'success') {
                toast.success(response.data.message) 
            }
            
            if ( response.data.message === 'failed') {
                toast.error(response.data.data)   
            }

        } catch (error) {
             if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        router.push('/')
                        toast.error(axiosError.response.data.data)      
                    }

                      if (axiosError.response && axiosError.response.status === 400) {
                        const errorMessage = axiosError.response.data?.message;
                        toast.error(errorMessage)      
                    }
                } 
            
        }
    }

    const DenyRequirements = async (id: string, reason: string) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/requirement/approvedenyrequirement?id=${id}&status=deny&denyreason=${reason}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.message === 'success') {
                toast.success(response.data.message);
            }
    
            if (response.data.message === 'failed') {
                toast.error(response.data.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    router.push('/');
                    toast.error(axiosError.response.data.data);
                }
    
                if (axiosError.response && axiosError.response.status === 400) {
                    const errorMessage = axiosError.response.data?.data;
                    toast.error(errorMessage);
                }
            }
        } finally {
            setDenyReason("")
            setDenyapprove("")
        }
    };
    

  return (
    <div className=' w-full flex flex-col text-xs bg-white p-4 rounded-md'>
        <div className=' flex items-center bg-blue-50 p-2 gap-2 rounded-full w-fit text-xs'>
            {tabs.map((item, index) => (
                <button key={index} onClick={() => {setTab(index); setProcess1(item.process)}} className={`p-2 px-2 ${index === tab && ' bg-pink-600 text-white'} rounded-full`}>{item.label}</button>
            ))}
        
        </div>
        <Table className=' mt-4'>
        {requirements?.length === 0 && <TableCaption>No Data</TableCaption> }
        {/* {loading === true &&  <TableCaption><span className=' loader2'></span></TableCaption> } */}
        <TableHeader>
            <TableRow>
            <TableHead>ticket Id</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {listLoad ? (
            <>LOADING DATA</>
        ) : (
            <>
            {requirements?.map((data, idx) => (
                <TableRow key={idx}>
                <TableCell>{data.ticketusername}</TableCell>
                <TableCell>{data.fullname}</TableCell>
                <TableCell className="flex items-center gap-2">
                    <Dialog>
                    <DialogTrigger>
                        <button className="bg-blue-100 p-2 rounded-md">Process</button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Process Application</DialogTitle>
                        <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <div className="w-full grid grid-cols-2 gap-4 text-xs">
                        <div
                            onClick={()=> setDenyapprove("approved")}
                            className={`cursor-pointer w-full flex flex-col gap-2 items-center justify-center h-auto p-4 bg-green-50 rounded-md ${
                            denyapprove === "approved" && "border-2 border-blue-100"
                            }`}
                        >
                            <div className="w-10 aspect-square rounded-full bg-green-200 flex items-center justify-center text-green-600">
                            <Check size={20} />
                            </div>
                            <p>Approved</p>
                        </div>

                        <div
                            onClick={() => setDenyapprove("deny")}
                            className={`cursor-pointer w-full flex flex-col gap-2 items-center justify-center h-auto p-4 bg-red-50 rounded-md ${
                            denyapprove === "deny" && "border-2 border-blue-100"
                            }`}
                        >
                            <div className="w-10 aspect-square rounded-full bg-red-200 flex items-center justify-center text-red-600">
                            <X size={20} />
                            </div>
                            <p>Reject</p>
                        </div>
                        </div>
                        <textarea onChange={(e) => setDenyReason(e.target.value)} value={denyreason} className='border-2 rounded-lg p-4' placeholder='deny reason'>

                        </textarea>

                        <div className="w-full flex items-end justify-end text-xs text-white mt-2">
                            <DialogClose>
                            <button
                                className="bg-blue-500 px-4 py-2 rounded-md"
                                onClick={() => {
                                    if (denyapprove === 'approved') {
                                        ApproveRequirements(data.id);
                                    } else if (denyapprove === 'deny') {
                                        if (!denyreason.trim()) {
                                            toast.error('Please provide a reason for denial.');
                                            return;
                                        }
                                        DenyRequirements(data.id, denyreason);
                                    }
                                }}
                                >
                                Submit
                            </button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
                            <button className="bg-blue-100 p-2 rounded-md flex items-center gap-2 hover:bg-blue-200 transition-all">
                                <img src="/icons/eye.png" width={15} height={15} />
                                View
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Requirements Details</DialogTitle>
                            </DialogHeader>
                            <div className="p-6 space-y-6 text-sm text-gray-700">
                                {/* Personal Information */}
                                <div className="flex gap-8 mb-4 border-b pb-4">
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Full Name:</strong> {data.fullname}</p>
                                        <p><strong className="font-semibold">Address:</strong> {data.address}</p>
                                        <p><strong className="font-semibold">Email:</strong> {data.email}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Gender:</strong> {data.gender}</p>
                                        <p><strong className="font-semibold">Phone Number:</strong> {data.phonenumber}</p>
                                        <p><strong className="font-semibold">Telephone Number:</strong> {data.telephonenumber}</p>
                                    </div>
                                </div>

                                {/* Family Information */}
                                <div className="flex gap-8 mb-4 border-b pb-4">
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Mother's Name:</strong> {data.mother}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Father's Name:</strong> {data.father}</p>
                                    </div>
                                </div>

                                
                                {/* Status and Deny Reason */}
                                <div className="flex gap-8 mb-4 border-b pb-4">
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Grade Level:</strong> {data.level}</p>
                                    </div>
                                        <div className="w-1/2">
                                            <p><strong className="font-semibold">Program:</strong> {data.program}</p>
                                        </div>
                                </div>

                                {/* Status and Deny Reason */}
                                <div className="flex gap-8 mb-4 border-b pb-4">
                                    <div className="w-1/2">
                                        <p><strong className="font-semibold">Status:</strong> {data.status}</p>
                                    </div>
                                    {data.denyreason && (
                                        <div className="w-1/2">
                                            <p><strong className="font-semibold">Deny Reason:</strong> {data.denyreason}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Documents */}
                                <div className="flex gap-8">
                                    <div className="w-1/2">
                                        <p>
                                            <strong className="font-semibold">Form 137:</strong>{" "}
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL}/${data.form137}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline hover:text-blue-700 transition-all"
                                            >
                                                View Document
                                            </a>
                                        </p>
                                    </div>
                                    <div className="w-1/2">
                                        <p>
                                            <strong className="font-semibold">Birth Certificate:</strong>{" "}
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL}/${data.birthcertificate}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline hover:text-blue-700 transition-all"
                                            >
                                                View Document
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </TableCell>
                </TableRow>
            ))}
            </>
        )}
        </TableBody>

        </Table>

        {requirements?.length !== 0 && (
            <div className=' w-full flex items-center justify-center'>
                <Pagination currentPage={0} total={totalpage} onPageChange={handlePageChange}/>
            </div>
        )}
        
    </div>
  )
}
