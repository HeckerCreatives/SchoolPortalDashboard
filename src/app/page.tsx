'use client'
import axios, { AxiosError } from "axios";
import { ChevronLeft, ChevronRight, CircleHelp, Eye, EyeOff, File, FileText, FileUser, ImageUp, LogIn, Phone, UserRound } from "lucide-react";
import { Span } from "next/dist/trace";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Home() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [showpassword, setShowpassword] = useState('password')


  const handleLogin = async () => {
    setLoading(true)
    if ( password === '' ){
      setLoading(false)

    }

    if ( username === '' ){
      setLoading(false)

    }

    if ( password !== '' && username !== ''){
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/login?username=${username}&password=${password}`,{
           withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
          }
        })
        if ( response.data.message === 'success' && response.data.data.auth === 'superadmin') {
        router.push('/superadmin/dashboard')
        toast.success(response.data.message);
        setLoading(false)
        setUsername('')
        setPassword('')
        setLoading(false)

        }

        if ( response.data.message === 'success' && response.data.data.auth === 'teacher') {
          router.push('/teacher/dashboard')
          toast.success(response.data.message);
          setLoading(false)
          setUsername('')
          setPassword('')
          setLoading(false)
  
          }

          if ( response.data.message === 'success' && response.data.data.auth === 'adviser') {
            router.push('/adviser/dashboard')
            toast.success(response.data.message);
            setLoading(false)
            setUsername('')
            setPassword('')
            setLoading(false)
    
            }

            if ( response.data.message === 'success' && response.data.data.auth === 'student') {
              router.push('/student/enrollment')
              toast.success(response.data.message);
              setLoading(false)
              setUsername('')
              setPassword('')
              setLoading(false)
      
              }

              if ( response.data.message === 'success' && response.data.data.auth === 'finance') {
                router.push('/finance/dashboard')
                toast.success(response.data.message);
                setLoading(false)
                setUsername('')
                setPassword('')
                setLoading(false)
        
                }

                if ( response.data.message === 'success' && response.data.data.auth === 'support') {
                  router.push('/chatsupport')
                  toast.success(response.data.message);
                  setLoading(false)
                  setUsername('')
                  setPassword('')
                  setLoading(false)
          
                  }

         if ( response.data.message === 'success' && response.data.data.auth === 'ticket') {
        setLoading(false)
        toast.success(response.data.message);
        setUsername('')
        setPassword('')
        setLoading(false)

        }

        if (response.data.message === 'failed') {
          setLoading(false)
          toast.error(response.data.data);

        }
        
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
    
  }


  return (
    <div className=" h-screen w-full bg-pink-50 flex items-center justify-center overflow-x-hidden p-4">

      <div className=" w-full max-w-[1040px] grid grid-cols-1 md:grid-cols-2 h-auto bg-white p-4 rounded-2xl">

        <div className=" w-full h-full">
            <div className=" h-full w-full flex flex-col justify-center gap-4 p-8 py-20">
              <div className=" flex items-center gap-2">
                <div className=" w-[40px] aspect-square bg-black rounded-full">
                </div>
                <h1 className=" text-sm font-medium mt-2 w-[100px]">lorem ipsum</h1>
              </div>

              <div className=" flex flex-col gap-2">
                <h1 className=" text-4xl font-bold mt-2 w-full ">Welcome to lorem ipsum</h1>
                <p className=" text-xs text-zinc-400">SY 2025 Enrollment application is now open! <a href="/" className=" font-semibold text-pink-600 underline">Enroll Now</a></p>
              </div>


               

                <div className=" w-full h-auto flex flex-col gap-1 text-xs text-black mt-8 ">
                  <label htmlFor=""  className=" ">Username</label> 
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className=" input-primary" />

                  <label htmlFor="" className=" mt-2 ">Password</label> 
                  {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className=" input-primary " /> */}

                  <div className=' w-full relative'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} maxLength={20} type={showpassword} placeholder='Password' className=' input-primary w-full' />
                        {showpassword === 'password' ? (
                        <p onClick={() => setShowpassword('text')} className=' cursor-pointer absolute top-[7px] right-2 text-pink-400 p-1'><EyeOff size={15}/></p>
                        
                        ) : (
                        <p onClick={() => setShowpassword('password')} className=' cursor-pointer absolute top-[7px] right-2 text-pink-400 p-1'><Eye size={15}/></p>

                        )}
                    </div>

                  <button onClick={handleLogin} className=" p-3 bg-pink-600 text-xs font-medium text-white rounded-md mt-6 flex items-center justify-center gap-2"> 
                    {loading === true && <span className=" loader"></span>}
                    Sign in
                  </button>
                </div>

                {/* <hr className=" my-4"/>

                <button className=" btn-outline">Enrollment Portal <img src="/icons/arrow-right.png" width={15} height={15} /></button>
                <button className=" btn-outline">Application Portal <img src="/icons/arrow-right.png" width={15} height={15} /></button> */}
            </div>
        </div>

        <div className=" w-full h-full rounded-xl"
        style={{backgroundImage: "url(/bg.jpg)", backgroundSize:'cover'}}
        >

        </div>

      </div>
     
    </div>
  );
}
