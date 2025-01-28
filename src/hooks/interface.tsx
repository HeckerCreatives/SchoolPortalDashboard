import { string } from "zod"

export interface GradeLevels {
    id: string
    level: string
    program: string
    status: string
}

export interface Sections {
    id: string
    level: string
    name: string
    program: string
    status: string

}

export interface Liststudentgrades {
    id: string
    fullname: string
    gender: string
    email: string
}

export interface Info  {
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

export interface SY {
    startyear: number,
    endyear: number,
  }
  
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
  
  
  
 export interface StudentGrades {
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

  interface ClassroomSubjects {
    teachername: string
    teacherid: string
    subjectdetails: string
    subjectid: string
  }


  export interface Classroom {
    section: [
            {
                section: string
                sectionid: string
            }
        ],
    subjects: ClassroomSubjects []
    
  }


  interface QuestDetailks {
    _id:string
    schoolyear: string
    section: string
    subject: string
    teacher: string
    assignment: string
    title: string
    description: string
    points: number
    status: string
    duedate:string
    createdAt: string
    updatedAt: string
   
  }

  interface Submissions {
    student: string,
    file: string,
    _id: string
  }


  export interface Assignment {
    _id: string
    teacher: string
    subject:string
    section: string
    schoolyear: string
    title: string
    description: string
    duedate: string
    maxscore: number,
    submission: [],
    createdAt: string
    updatedAt: string
    questdetails: QuestDetailks[]
    submissions: Submissions[]
  }

  interface AssignmentDetails {
    teacher: string;
    subject: string;
    section: string;
    schoolyear: string;
    title: string;
    description: string;
    duedate: string; // Alternatively, you can use `Date` if you plan to convert the string to a Date object
    maxscore: number;
}

interface StudentDetails {
    firstName: string;
    lastName: string;
}

interface Submission {
    student: string;
    file: string;
    score: number;
    studentDetails: StudentDetails;
}

interface Quest {
    title: string
    descrtiption: string,
    points: number,
    duedate: string,
    status: string
    id: string
}

export interface Assignments {
    _id: string;
    assignmentDetails: AssignmentDetails;
    submissions: Submission[];
    quest: Quest[];
}