import axios from 'axios'
import { Camera } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Info = {
    id: string
    levelid:string
        basicinfo: {
            firstname: string
            middlename: string
            lastname: string
            gender: string
            phonenumber: 9465756756765,
            telephonenumber: 789789789,
            address: string
            religion: string
            email: string
            civil: string
            section: string
            program:string
        },
        familyinfo: {
            mother: {
                firstname: string
                contact:string
            },
            father: {
                firstname: string
                lastname: string
                contact: string
            },
            guardian: {
                firstname: string
                lastname: string
                contact: string
            }
        },
        requirements: {
            form137: string
            tor: string,
            birthcertificate: string
        }
}

export default function Profile() {
        const [tab, setTab] = useState('Tab1')
    const [info, setInfo] = useState<Info>()
    

        useEffect(() => {
            const getData =  async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/studentuser/getstudentuserdetails`,{
                    withCredentials: true
                })
    
            console.log(response.data)
            setInfo(response.data.data)
    
            }
            getData()
        },[])
    
  return (
    <div className=' w-full'>
        <p className=' text-lg font-medium'>Profile</p>
        <div className=' flex mt-2'>
                    <div className=' flex flex-col gap-2 text-sm w-[400px]'>
                        <p onClick={() => setTab('Tab1')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab1' ? ' border-l-4 border-pink-500 font-semibold' : ''}`}>Personal Information</p>
                        <p onClick={() => setTab('Tab2')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab2' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Contact Information</p>
                        <p onClick={() => setTab('Tab3')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab3' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Family Information</p>
                        <p onClick={() => setTab('Tab4')} className={` cursor-pointer px-2 py-1 ${tab === 'Tab4' ? 'border-l-4 border-pink-500 font-semibold' : ''}`}>Credentials</p>
                    </div>
        
                    {tab === 'Tab1' && (
                        <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                            <div className=' flex flex-col gap-4 text-sm'>
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Firstname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.firstname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Lastname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.lastname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Middlename </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.middlename} </p>
                                </div>
        
                                {/* <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Birthdate </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.} </p>
                                </div> */}
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Gender </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.gender} </p>
                                </div>
        
                                {/* <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Age</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                                </div> */}
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Relegion</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.religion} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Civil Status</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.civil} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Program</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.program} </p>
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
                        <div className=' w-full h-auto gap-8 p-8 bg-white'>
                            <div className=' flex flex-col gap-4 text-sm'>
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Address </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.address} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Email </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.email} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Address </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.phonenumber} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Address </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.basicinfo.telephonenumber} </p>
                                </div>
        
                                
                            </div>
                        </div>
                    )}
        
                    {tab === 'Tab3' && (
                        <div className=' w-full h-auto bg-white grid grid-cols-2 gap-8 p-8'>
                            <div className=' flex flex-col gap-4 text-sm'>
                                <p className=' font-semibold'>Mother Information</p>
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Firstname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.mother.firstname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Maidenname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>test </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Phone no.</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.mother.contact}</p>
                                </div>
                                
                            </div>
        
                            <div className=' flex flex-col gap-4 text-sm'>
                            <p className=' font-semibold'>Father Information</p>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Firstname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.firstname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Lastname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.lastname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Phone no.</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.father.contact} </p>
                                </div>
                                
                            </div>
        
                            <div className=' flex flex-col gap-4 text-sm'>
                            <p className=' font-semibold'>Gurdian Information</p>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Firstname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.firstname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Lastname </p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.lastname} </p>
                                </div>
        
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-xs text-zinc-300'>Phone no.</p>
                                    <p className=' py-1 border-b-[1px] border-zinc-100'>{info?.familyinfo.guardian.contact} </p>
                                </div>
                                
                            </div>
        
        
                            
                        </div>
                    )}
        
                    {tab === 'Tab4' && (
                        <div className=' w-full h-auto bg-white grid grid-cols-4 gap-8 p-8'>
                            <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                                <div className=' w-full bg-white text-xs py-2'>
                                    <a href={`${process.env.NEXT_PUBLIC_API_URL}/${info?.requirements.birthcertificate}`} className=' underline'>Birth Certificate.pdf</a>
                                    {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                                </div>
                            </div>
        
                            <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                                <div className=' w-full bg-white text-xs py-2'>
                                    <a href={`${process.env.NEXT_PUBLIC_API_URL}/${info?.requirements.form137}`} className=' underline'>Form 137.pdf</a>
        
                                    {/* <p className=' underline text-zinc-400'>Birth Certificate</p> */}
                                </div>
                            </div>
        
                            {/* <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                                <div className=' w-full bg-white text-xs py-2'>
                                    <p className=' underline'>Good Moral.pdf</p>
                                </div>
                            </div>
        
                            <div className=' flex items-end justify-end w-full h-[200px] bg-zinc-100'>
                                <div className=' w-full bg-white text-xs py-2'>
                                    <p className=' underline'>Report Card.pdf</p>
                                </div>
                            </div> */}
                        </div>
                    )}
        
                    
                </div>
    </div>
  )
}
