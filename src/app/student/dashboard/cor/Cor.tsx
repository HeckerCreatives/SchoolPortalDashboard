'use client'
import { Info, StudentGrades, SY } from '@/hooks/interface'
import axios, { AxiosError } from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { File } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useReactToPrint } from 'react-to-print'


export default function Cor() {
  const [info, setInfo] = useState<Info>()
  const [sy, setSy] = useState<SY>()
  const [grades, setGrades] = useState<StudentGrades>()
  const currentdate = new Date()
  const componentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  
  const router = useRouter()

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

useEffect(() => {
  const getData =  async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schoolyear/getschoolyearstudent`,{
          withCredentials: true
      })

  console.log(response.data)
  setSy(response.data.data)

  }
  getData()
},[])

useEffect(() => {
  const getList = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/getsubjectgradestudent`,
        { withCredentials: true }
      );

      console.log(res.data)
      setGrades(res.data.data)

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

// Function to download PDF
const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('COR.pdf');
};


  return (

    <>
    <div className=' flex items-center mb-8'>
        <button onClick={handleDownloadPDF} className=' action-btn text-xs'><File size={12}/>Download Pdf</button>
    </div>

    <div id='cor' className="p-8 border border-gray-300" ref={contentRef}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">Lorem Ipsum</h1>
        <h2 className="text-lg font-semibold">Academics</h2>
        {/* <h3 className="text-base">The Registrar</h3> */}
        <h4 className="text-lg font-semibold mt-4">CERTIFICATION OF REGISTRATION</h4>
        {/* <p className="text-sm italic">Special Health Sciences Senior High School (Bridging Program)</p> */}
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold">Student Id :</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>{info?.id}</p>

        
        </div>
        <div className="col-span-2">
          <label className="block font-semibold">Full Name</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>{info?.basicinfo.firstname} {info?.basicinfo.middlename} {info?.basicinfo.lastname}</p>
          
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold">Program :</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>{info?.basicinfo.program}</p>

        
        </div>
        <div className="col-span-2">
          <label className="block font-semibold">School Year</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>SY : {sy?.startyear}-{sy?.endyear}</p>
          
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold">Grade Level/Section</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>{grades?.details[0].lvlsection}</p>
        </div>

        <div>
          <label className="block font-semibold">Adviser</label>
          <p className=' w-full bg-white p-2 border-[1px] border-zinc-300'>{grades?.details[0].adviser}</p>
        </div>
        {/* <div>
          <label className="block font-semibold">Course</label>

          <input
            type="text"
            className="w-full border border-gray-300 p-2 text-sm"
          />
        </div> */}
      </div>

      {/* Subjects and Fees */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Subjects Table */}
        <div>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">SUBJECTS</th>
                <th className="border border-gray-300 p-2">UNIT/S</th>
              </tr>
            </thead>
            <tbody className=' text-xs'>
              {grades?.grade.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.subject}</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fees Table */}
        <div>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">FEES</th>
                <th className="border border-gray-300 p-2">P</th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {[
                "Tuition",
                "R.L.E.",
                "Laboratory",
                "Computer Lab",
                "Registration",
                "Library",
                "Medical/Dental",
                "Athletic",
                "Guidance",
                "Developmental",
                "Publication",
                "Affiliation",
                "SSCF",
                "Insurance",
                "I.D.",
                "PRISSA",
                "CMT",
                "Recollection",
                "Trust Fund",
                "POLCA",
                "Miscellaneous",
              ].map((fee, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{fee}</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="border border-gray-300 p-2">TOTAL FEES</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        <p className="text-sm">Date: {currentdate.toLocaleString()}</p>
        <p className="text-sm font-semibold mt-4">STUDENT'S COPY</p>
      </div>
    </div>
    </>
   
  )
}
