import { Camera, Info } from 'lucide-react'
import React, { useState } from 'react'
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

const Day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ]

export default function Enrollment() {
    const [tab, setTab] = useState('Tab1')
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
                <p onClick={() => setTab('Tab2')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab2' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Family Information</p>
                <p onClick={() => setTab('Tab3')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab3' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Credentials</p>
            </div>

            {tab === 'Tab1' && (
                <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                    <div className=' flex flex-col gap-4 text-sm'>
                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Middlename </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Birthdate </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Gender </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Age</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-500'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
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
                <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                    <div className=' flex flex-col gap-4 text-sm'>
                        <p className=' font-semibold'>Mother Information</p>
                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Middlename </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>
                        
                    </div>

                    <div className=' flex flex-col gap-4 text-sm'>
                    <p className=' font-semibold'>Father Information</p>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Firstname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Lastname </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Middlename </p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>

                        <div className=' flex flex-col gap-2'>
                            <p className=' text-xs text-zinc-300'>Phone no.</p>
                            <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                        </div>
                        
                    </div>

                    
                </div>
            )}

            {tab === 'Tab3' && (
                <div className=' w-full h-auto bg-white grid grid-cols-4 gap-8 p-8'>
                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Birth Certificate.pdf</p>
                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>

                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Form 137.pdf</p>
                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>

                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Good Moral.pdf</p>
                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>

                    <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                        <div className=' w-full bg-white text-xs py-2'>
                            <p className=' underline'>Report Card.pdf</p>
                            {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                        </div>
                    </div>
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
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>

        </div>

        <div className=' w-full h-[200px] bg-white mt-4 p-4'>
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
                    
                    </TableRow>
                      
                   
                   
                </TableBody>
            </Table>
        </div>

        <div className=' max-w-[450px] text-xs text-zinc-400 flex gap-2 mt-8'>
            <Info className=' w-12 '/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia error modi sit cumque delectus est, illo repellat! Dolor inventore aperiam iure dolore quos neque cum nemo deserunt natus accusamus.</p>
        </div>

        <div className=' flex items-center gap-2 text-sm mt-12'>
            <button className=' action-btn'>Enroll now</button>
            <button className=' px-4 py-2 bg-zinc-200 rounded-sm'>Print </button>
        </div>
        
    </div>
  )
}

