'use client'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface Grade {
  _id: string;
  subject: string;
  quarter: string;
  grade: number;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

interface SubjectGrade {
  id: string;
  subject: string;
  grades: Grade[];
}



interface StudentGrades {
  details: [
            {
                studentname: string
                lvlsection: string
                adviser: string
                schoolyear:string
            }
        ],
  grade: SubjectGrade[]
}

export default function Grades() {
  const router = useRouter()
  const [grades, setGrades] = useState<StudentGrades>()
  const [totalrating, setTotalrating] = useState(0)
  

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

  useEffect(() => {
    if (!grades) return;

    const totalFinalRating = grades.grade.reduce((total, item) => {
      const subjectFinalRating = item.grades.reduce((sum, gradeItem) => sum + gradeItem.grade, 0);
      return total + subjectFinalRating / 4; // Add the average rating for the subject
    }, 0);

    const gwa = totalFinalRating / grades.grade.length

    setTotalrating(gwa);
  }, [grades]); 

  
  return (
    <div className=' w-full flex flex-col'>
        <div className=' flex flex-col text-sm'>
            <p>Student Name: {grades?.details[0].studentname}</p>
            <p>Grade Level & Section: {grades?.details[0].lvlsection}</p>
            <p>GWA: {totalrating}</p>

        </div>

        <div className="mb-8 mt-8">
        <table className="w-full max-w-[1040px] text-left border-collapse border-[1px] text-sm">
          <thead>
            <tr className="bg-pink-100 border-[1px]">
              <th className="p-2 text-black font-semibold w-[200px]">Subject</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q1</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q2</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q3</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q4</th>
              <th className="p-2 text-black font-semibold w-[100px]">Final Rating</th>
            </tr>
          </thead>
          <tbody>

          {grades?.grade.map((item) => {
          // Create a map of quarters to grades for easy lookup
          const gradeMap: { [key: string]: { grade: number; remarks: string, id: string} } = {};
          item.grades?.forEach((grade) => {
            gradeMap[grade.quarter] = {
              grade: grade.grade,
              remarks: grade.remarks,
              id: grade._id
            };
          });

          const finalRating = item.grades.reduce((sum, gradeItem) => sum + gradeItem.grade, 0);

          



          


          return (
            <tr key={item.id} className="border-[1px] h-[50px] bg-pink-50">
            <td className="p-2 text-black">{item.subject}</td>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => {
                const gradeData = gradeMap[quarter];
                return (
                  <td
                    key={quarter}
                   
                    className="p-2 text-black bg-pink-50 cursor-pointer border-[1px] text-xs"
                  >
                    {gradeData ? (
                      <>
                        <div>{gradeData.grade}</div>
                      </>
                    ) : (
                      'No Grade'
                    )}
                  </td>
                );
              })}

            <td className="p-2 text-black text-xs">{finalRating / 4}</td>

            </tr>
            );
          })}
            
          </tbody>
        </table>
      </div>

       
    </div>
  )
}
