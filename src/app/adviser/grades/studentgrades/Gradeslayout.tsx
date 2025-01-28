'use client'
import { CircleAlert, EllipsisVertical, Pen, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

interface FormData {
  subject: string;
  student: string;
  quarter: string;
  grade: number;
  remarks: string;
}

export default function Gradeslayout() {
      const [open, setOpen] = useState(false)
      const router = useRouter()
      const params = useSearchParams()
      const id = params.get('id')
      const [grades, setGrades] = useState<StudentGrades>()
      const [subject, setSubject] = useState('')
      const [grade, setGrade] = useState('')
      const [remarks, setRemarks] = useState('')
      const [quarter, setQuarter] = useState('')
      const [loading, setLoading] = useState(false)
      const [gradeid, setGradeid] = useState('')

      const [forms, setForms] = useState<FormData[]>([
        { subject: '', student: id || '', quarter: 'Q1', grade: 0, remarks: '' },
      ]);
    
      const handleInputChange = (
        index: number,
        field: keyof FormData,
        value: string | number
      ) => {
        const updatedForms = [...forms];
        updatedForms[index][field] = value as never; // Type assertion to handle string | number
        setForms(updatedForms);
      };
    
      const addForm = () => {
        const lastForm = forms[forms.length - 1];
    
        if (
          lastForm.subject.trim() === '' ||
          lastForm.student.trim() === '' ||
          lastForm.grade === 0 ||
          lastForm.remarks.trim() === ''
        ) {
          toast.error('Please fill out all fields in the current form before adding a new one.');
          return;
        }
    
        setForms([...forms, { subject: '', student: id || '', quarter: 'Q1', grade: 0, remarks: '' }]);
      };
    
      const deleteForm = (index: number) => {
        const updatedForms = forms.filter((_, i) => i !== index);
        setForms(updatedForms);
      };
    
      const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();


    
        const isFormValid = forms.every(
          (form) =>
            form.subject.trim() !== '' &&
            form.student.trim() !== '' &&
            form.grade !== 0 &&
            form.remarks.trim() !== ''
        );
    
        if (!isFormValid) {
          toast.error('Please fill out all fields in all forms before submitting.');
          return;
        }
    
        try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/createsubjectgradeteacher`,{
            newgrades: forms
            },{
                withCredentials:true,
                headers:{
                'Content-Type': 'application/json',
                }
            })
  
            const response = await toast.promise(request, {
                loading: 'Adding student grade....',
                success: `Successfully added`,
                error: 'Error while adding student grade',
            });
  
            if( response.data.message === 'success'){
              setLoading(false)
              setOpen(false)  
              setRemarks('')
              setGrade('')
              getList() 
              setForms([
                { subject: '', student: id || '', quarter: 'Q1', grade: 0, remarks: '' },
              ])   
            }
  
        } catch (error) {
          setLoading(false)
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
                toast.error(`${axiosError.response.data.data}`) 
                router.push('/')    
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
        // You can send the data to an API or process it further
      };


      useEffect(() => {
        const getList = async () => {
          try {
            if(id !== undefined){
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/section/getstudentsubjectta?studentid=${id}`,
                { withCredentials: true }
              );
  
              console.log(res.data)
              setGrades(res.data.data)
            }
           

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

      const getList = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/section/getstudentsubjectta?studentid=${id}`,
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

    const addGrade = async () => {
      setLoading(true)
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/createsubjectgrade`,{
          subject: subject, 
          student: id, 
          quarter: quarter, 
          grade: grade, 
          remarks: remarks
          },{
              withCredentials:true,
              headers:{
              'Content-Type': 'application/json',
              }
          })

          const response = await toast.promise(request, {
              loading: 'Adding student grade....',
              success: `Successfully added`,
              error: 'Error while adding student grade',
          });

          if( response.data.message === 'success'){
            setLoading(false)
            setOpen(false)  
            setRemarks('')
            setGrade('')
            getList()    
          }

      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`) 
              router.push('/')    
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
    }

    const updateGrade = async () => {
      setLoading(true)
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/updatesubjectgrade`,{
          subjectgrade: gradeid, 
          grade: grade, 
          remarks: remarks
          },{
              withCredentials:true,
              headers:{
              'Content-Type': 'application/json',
              }
          })

          const response = await toast.promise(request, {
              loading: 'Updating student grade....',
              success: `Successfully updated`,
              error: 'Error while updating student grade',
          });

          if( response.data.message === 'success'){
            setLoading(false)
            setOpen(false)  
            getList()    
          }

      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`) 
              router.push('/')    
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
    }

    const deleteGrade = async () => {
      setLoading(true)
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subjectgrade/deletesubjectgrade`,{
          subjectgrade: gradeid, 
          },{
              withCredentials:true,
              headers:{
              'Content-Type': 'application/json',
              }
          })

          const response = await toast.promise(request, {
              loading: 'Deleting student grade....',
              success: `Successfully deleted`,
              error: 'Error while deleting student grade',
          });

          if( response.data.message === 'success'){
            setLoading(false)
            setOpen(false)  
            getList()    
          }

      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`) 
              router.push('/')    
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
    }

    useEffect(() => {
      if(open === false){
        setRemarks('')
        setGrade('')
      }
    }, [open])
  
  
  return (
    <div className=" w-full min-h-screen p-4 text-xs">
    <div className= "rounded-lg shadow-lg p-8 w-full max-w-[700px] bg-white mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-black">Lorerm ipsum School</h1>
        {/* <h2 className="text-lg mt-2">Report Card</h2> */}
      </div>
  
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className=' font-semibold flex flex-col gap-1'>
          <p className="text-black ">Name of Student: {grades?.details[0].studentname}</p>
          <p className="text-black ">Grade Level and Section: {grades?.details[0].lvlsection}</p>
          <p className="text-black ">Grading Period:</p>
          <p className="text-black ">Class Adviser: {grades?.details[0].adviser}</p>
          <p className="text-black ">School Year: {grades?.details[0].schoolyear}</p>
        </div>
        
      </div>
  
      <div className="mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-100 border-[1px]">
              <th className="p-2 text-black font-semibold w-[200px]">Subject</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q1</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q2</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q3</th>
              <th className="p-2 text-black font-semibold w-[100px]">Q4</th>
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

          console.log(gradeMap)

          return (
            <tr key={item.id} className="border-[1px] h-[50px] bg-pink-50">
            <td className="p-2 text-black">{item.subject}</td>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => {
                const gradeData = gradeMap[quarter];
                return (
                  <td
                    key={quarter}
                    onClick={() => {
                      setOpen(true);
                      setSubject(item.id);
                      setQuarter(quarter);
                      setRemarks(gradeData.remarks)
                      setGrade(`${gradeData.grade}`)
                      setGradeid(gradeData.id)
                    }}
                    className="p-2 text-black bg-pink-50 cursor-pointer border-[1px] text-[0.6rem]"
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
            </tr>
            );
          })}
            
          </tbody>
        </table>
      </div>
  
      {/* <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-black"><strong>Candidate:</strong></p>
          <p className="text-black">1/5</p>
          <p className="text-black">2/4</p>
          <p className="text-black">3/7</p>
        </div>
        <div>
          <p className="text-black"><strong>Total Day of School:</strong></p>
          <p className="text-black"><strong>Date Sounded:</strong></p>
          <p className="text-black"><strong>Day classes:</strong></p>
        </div>
      </div>
  
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-black"><strong>Cash:</strong></p>
          <p className="text-black">1/5</p>
          <p className="text-black">2/4</p>
          <p className="text-black">3/7</p>
        </div>
        <div>
          <p className="text-black"><strong>Quantity Cards:</strong></p>
          <p className="text-black"><strong>Average Cash:</strong></p>
        </div>
      </div> */}
    </div>

    <Dialog open={open} onOpenChange={(setOpen)}>
    <DialogTrigger></DialogTrigger>
    <DialogContent className=' text-sm max-h-[80%] overflow-y-auto'>
        <DialogHeader>
        <DialogTitle>Action</DialogTitle>
        <DialogDescription>
            {/* This action cannot be undone. This will permanently delete your account
            and remove your data from our servers. */}
        </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="add" className="w-full">
        <TabsList>
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className=' w-full flex flex-col gap-2 text-xs text-zinc-500 mt-4'>
            
              <div className="p-4">
                <h1 className="text-sm font-medium text-black mb-4">Add Grades</h1>
                <form onSubmit={handleSubmit}>
                  {forms.map((form, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-lg shadow-sm text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium mb-1">Subject</label>
                          {/* <input
                            type="text"
                            value={form.subject}
                            onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                            className="input-primary bg-white w-full"
                            required
                          /> */}

                          <Select
                          onValueChange={(e) => handleInputChange(index, 'subject',e)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {grades?.grade.map((item, index) => (
                              <SelectItem key={index} value={item.id}>{item.subject}</SelectItem>

                              ))}
                              
                            </SelectContent>
                          </Select>


                        </div>
                       
                        <div>
                          <label className="block font-medium mb-1">Quarter</label>
                          {/* <select
                            value={form.quarter}
                            onChange={(e) => handleInputChange(index, 'quarter', e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                          >
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                          </select> */}

                          <Select
                          onValueChange={(e) => handleInputChange(index, 'quarter',e)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Quarter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Q1">Q1</SelectItem>
                              <SelectItem value="Q2">Q2</SelectItem>
                              <SelectItem value="Q3">Q3</SelectItem>
                              <SelectItem value="Q4">Q4</SelectItem>
                            </SelectContent>
                          </Select>

                        </div>
                        <div className=' col-span-2'>
                          <label className=" block font-medium mb-1">Grade</label>
                          <input
                            type="number"
                            value={form.grade}
                            onChange={(e) => handleInputChange(index, 'grade', parseFloat(e.target.value))}
                            className="input-primary bg-white w-full"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block font-medium mb-1">Remarks</label>
                          <textarea
                            value={form.remarks}
                            onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                            className="input-primary bg-white w-full"
                            required
                          />
                        </div>
                      </div>
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => deleteForm(index)}
                          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete Form
                        </button>
                      )}
                      
                    </div>
                  ))}

                  <div className=' flex items-center gap-2'>
                    <button
                      type="button"
                      onClick={addForm}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Form
                    </button>
                    <button
                      type="submit"
                      className="ml-2  action-btn w-fit"
                    >
                      Submit All
                    </button>
                  </div>
                  
                </form>
              </div>
          </div>
        </TabsContent>

        <TabsContent value="update">
          <div className=' w-full flex flex-col gap-2 text-xs text-zinc-500 mt-4'>
              <h2 className=' text-xs text-black'>Update grade</h2>
              
              <label htmlFor="" className=' mt-4'>Grade</label>
              <input value={grade} onChange={(e) => setGrade(e.target.value)} type="text" name="" id=""  placeholder='Grade' className=' input-primary bg-white' />

              <label htmlFor="">Remarks</label>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} name="" placeholder='Remarks' id="" className='input-primary bg-white'></textarea>

              <div className=' flex items-end justify-end mt-4'>
                  <button onClick={updateGrade} className=' action-btn w-fit'>
                      {/* {loading === true && (
                      <Spinner/>
                      )} */}
                      Update</button>
              </div>
          </div>
        </TabsContent>

        <TabsContent value="delete">
          <div className=' w-full flex items-center justify-center flex-col gap-2 text-xs text-zinc-500 mt-4'>
              <div className=' w-[80px] aspect-square rounded-full bg-red-50 flex items-center justify-center text-red-500'>
                <CircleAlert size={30}/>
              </div>
              <h2 className=' text-sm font-medium text-black'>Delete Grade</h2>
              <p>Are you sure you want to delete this grade?</p>

              <div className=' flex items-center justify-center gap-4 mt-4'>
                <button onClick={() => setOpen(false)} className=' px-4 py-2 w-fit bg-zinc-100 text-black rounded-md'>
                      {/* {loading === true && (
                      <Spinner/>
                      )} */}
                      Cancel</button>
                  <button onClick={deleteGrade} className=' px-4 py-2 w-fit bg-red-600 text-white rounded-md'>
                      {/* {loading === true && (
                      <Spinner/>
                      )} */}
                      Continue</button>
              </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
    </Dialog>
  </div>
  )
}
