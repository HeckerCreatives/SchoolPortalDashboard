import React, { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactToPrint, UseReactToPrintOptions } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { File, Printer } from 'lucide-react';

type Teachers = {
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

const Day = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
]

type Schedule = {
  id: string
  day: string
  starttime: string
  endtime:string
  teacher: string
  subject: string
  section: string
}

export default function Graph() {
    const router = useRouter()
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const params = useSearchParams()
    const getId = params.get('id')
    const [day, setDay] = useState('');
    const [teacher, setTeacher] = useState<Teachers[]>([])
    const [schedule, setSchedule] = useState<Schedule[]>([])
    const componentRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });


    const info = teacher.find((item) => item.id === getId )

    console.log(info)

    // get schedule
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/schedule/getschedulebyteacher?teacherId=${getId}`,
                { withCredentials: true }
              );
              setSchedule(res.data.data)
            
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
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, [id]);
    // get staff user list
    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/staffuser/getteacherlist?page=0&limit=10000&search=${search}&status=`,
                { withCredentials: true }
              );
             setTeacher(res.data.data.data)
             setId(res.data.data.data[0].id)
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
    }, [search]);


  const groupedSchedule = Day.reduce((acc, day) => {
    acc[day.toLowerCase()] = schedule.filter(item => item.day.toLowerCase() === day.toLowerCase());
    return acc;
  }, {} as { [key: string]: Schedule[] });


    // Explicitly cast the options to the correct type if necessary
    const handlePrint = useReactToPrint({
      content: () => {
        if (!componentRef.current) {
          console.error("componentRef is not assigned.");
          return null; // Avoid breaking the app
        }
        return componentRef.current;
      },
      documentTitle: "Schedule",
    } as UseReactToPrintOptions);

  // Function to download PDF
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Schedule.pdf');
  };

  const formatTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split(" - ");
  
    const formatTime = (time: string): string => {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute);
  
      // Format to 12-hour time with AM/PM
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    };
  
    return `${formatTime(start)} - ${formatTime(end)}`;
  }


    
  return (
    <div className=' w-fit flex flex-col ' >
   
    <div id='Schedule' className='w-[1240px] bg-white text-xs p-4' ref={contentRef}>
      <div className=' w-full flex items-center justify-center gap-2'>
        <div className=' w-10 aspect-square rounded-full bg-zinc-100'>

        </div>
        <p className=' font-semibold text-sm'>Lorem Ipsum Doler School</p>

      </div>
        <p className=' mt-6'>Name: <span className=' font-semibold'>{info?.fullname}</span></p>
        <Table className=' p-2 rounded-md mt-4'>
        <TableHeader>
            <TableRow className=''>
              {Day.map((item, index) => (
              <TableHead key={index} className=' uppercase text-start font-semibold text-xs text-black w-[250px]  border-collapse border-[1px]'>{item}</TableHead>
              ))}
            </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow className=' '>
          {Day.map((day, index) => {
            const dayData = groupedSchedule[day.toLowerCase()];

            // Sort dayData by starttime
            const sortedDayData = dayData
              ? [...dayData].sort((a, b) => {
                  const aTime = parseInt(a.starttime.replace(':', ''), 10);
                  const bTime = parseInt(b.starttime.replace(':', ''), 10);
                  return aTime - bTime;
                })
              : [];

            return (
              <TableCell key={index} className=' w-[100px] border-[1px] border-zinc-300 bg-white'>
                <div className=' flex flex-col h-[500px]'>
                  {sortedDayData && sortedDayData.length > 0 ? (
                    sortedDayData.map((item, index) => (
                      <div key={index} className=' relative mt-2 flex flex-col items-start justify-start w-[200px] bg-zinc-50 p-3 text-[.6rem]'>
                        <p className=' font-semibold text-xs'>{item.subject}</p>
                        <p>{formatTimeRange(`${item.starttime} - ${item.endtime}`)}</p>
                        <p>{item.teacher}</p>
                        <p>{item.section}</p>
                      </div>
                    ))
                  ) : (
                    <p className=' text-[.7rem] text-zinc-500 mt-2'>No Schedule</p>
                  )}
                </div>
              </TableCell>
            );
          })}
        </TableRow>
          
       
       
        </TableBody>
        </Table>

        

    </div>

    <div className=' w-full flex items-center justify-center gap-2 mt-12'>
      <button onClick={handleDownloadPDF} className=' action-btn text-xs'><File size={15}/>Download Pdf</button>
      <button onClick={() => reactToPrintFn()} className=' action-btn text-xs'><Printer size={15}/>Print</button>
    </div>
     
    </div >
  )
}
