import {z} from 'zod';

export const createStaff = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    middlename: z.string().min(1, 'Middle name is required'),
    address: z.string().min(1, 'Address is required'),
    dob: z.string().min(1, 'Date of Birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    role: z.string().min(1, 'Role is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    email: z.string().min(1, 'Email is required'),
    contact: z.string().min(1, 'Phone no. is required'),
   
})

export const createSection = z.object({
    level: z.string().min(1, 'Grade level is required'),
    name: z.string().min(1, 'Grade level is required'),
     
})

export const editSection = z.object({
    name: z.string().min(1, 'Grade level is required'),
})

export const createAdvisory = z.object({
    adviser: z.string().min(1, 'Adviser is required'),
    level: z.string().min(1, 'Grade Level is required'),
    sectionname: z.string().min(1, 'Section is required'),
})

export const editAdvisory = z.object({
    adviser: z.string().min(1, 'Adviser is required'),

})

export const createSubject = z.object({
    name: z.string().min(1, 'Subject name is required'),
    level: z.string().min(1, 'Grade level is required'),

})

export const createEvents = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    // start: z.string().min(1, 'Start Date is required'),
    // end: z.string().min(1, 'End date is required'),
   
    image: z
    .any()
    .refine((file) => file instanceof File, 'File must be valid') // Ensuring file is valid
    .refine(
      (file) =>
        ['application/pdf', 'image/jpeg', 'image/png'].includes(file?.type),
      'Must be a PDF or image (JPEG/PNG)'
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB'),
    date: z.string().min(1, 'Event date is required'),
})

export const editEvents = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image: z
    .any()
    .optional() // Makes the field optional
    .refine((file) => !file || file instanceof File, 'File must be valid') // Allow null/undefined or ensure it's a valid File
    .refine(
      (file) =>
        !file || ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type),
      'Must be a PDF or image (JPEG/PNG)'
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'File size must not exceed 5MB'
    ),
    date: z.string().min(1, 'Event date is required'),

});

export const createNews = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    image: z
    .any()
    .refine((file) => file instanceof File, 'File must be valid') // Ensuring file is valid
    .refine(
      (file) =>
        ['application/pdf', 'image/jpeg', 'image/png'].includes(file?.type),
      'Must be a PDF or image (JPEG/PNG)'
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB'),
    writer: z.string().min(1, 'Writer is required'),

})

export const createAnnouncements = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    image: z
    .any()
    .refine((file) => file instanceof File, 'File must be valid') // Ensuring file is valid
    .refine(
      (file) =>
        ['application/pdf', 'image/jpeg', 'image/png'].includes(file?.type),
      'Must be a PDF or image (JPEG/PNG)'
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB'),
    video: z.string().min(1, 'Video link is required'),

})

export const editSchedule = z.object({
  // program: z.string().min(1, 'Program is required'),
  // level: z.string().min(1, 'Grade Level is required'),
  section: z.string().min(1, 'Section is required'),
  subject: z.string().min(1, 'Subject is required'),
  start: z.string().min(1, 'Time start is required'),
  end: z.string().min(1, 'Time end is required'),
  day: z.string().min(1, 'Day is required'),

})

export const setSchoolYear = z.object({
  start: z.string().min(1, 'Start year is required'),
  end: z.string().min(1, 'End year is required'),
})

export const updateSchoolYear = z.object({
  sy: z.string().min(1, 'Please select a school year'),

})

export const createProgram = z.object({
  name: z.string().min(1, 'Program name is required'),

})

export const createEnrollmentSched = z.object({
  start: z.string().min(1, 'Start date is required'),
  end: z.string().min(1, 'End date is required'),
  program: z.string().min(1, 'Program is required'),
})

export const changepassword = z.object({
  newpasswordsuperadmin: z.string().max(20).nonempty('Please enter a new password'),
  confirmpasswordsuperadmin: z.string().max(20).nonempty('Please confirm your password')
})
.refine((data) => data.newpasswordsuperadmin === data.confirmpasswordsuperadmin, {
    message: "Passwords don't match",
    path: ['confirmpasswordsuperadmin'], // Error will appear under confirmpassword field
});

export const createAssingmentteacher = z.object({
  title: z.string().nonempty('Please enter a title'),
  desc: z.string().nonempty('Please enter a description'),
  deadline: z.string().nonempty('Please enter a deadline'),
  score: z.string().nonempty('Please enter a total score'),

  qtitle: z.string().optional(),
  qdesc: z.string().optional(),
  qpoints: z.string().optional(),
  
})


export const editAssingmentteacher = z.object({
  title: z.string().nonempty('Please enter a title'),
  desc: z.string().nonempty('Please enter a description'),
  deadline: z.string().nonempty('Please enter a deadline'),
  score: z.string().nonempty('Please enter a total score'),
})

export const editQuestteacher = z.object({
  qtitle: z.string().nonempty('Please enter a quest title'),
  qdesc: z.string().nonempty('Please enter a quest description'),
  points: z.string().nonempty('Please enter a quest points'),
  date: z.string().nonempty('Please enter a quest end date'),
})






export type CreateStaff = z.infer<typeof  createStaff>;
export type CreateSection = z.infer<typeof  createSection>;
export type EditSection = z.infer<typeof  editSection>;
export type CreateAdviser = z.infer<typeof  createAdvisory>;
export type EditAdviser = z.infer<typeof  editAdvisory>;
export type AddSubject = z.infer<typeof  createSubject>;
export type CreateEvents = z.infer<typeof  createEvents>;
export type EditEvents = z.infer<typeof  editEvents>;
export type CreateNews = z.infer<typeof  createNews>;
export type CreateAnnouncements = z.infer<typeof  createAnnouncements>;
export type UpdateSchedule = z.infer<typeof  editSchedule>;
export type SetSchoolYear = z.infer<typeof  setSchoolYear>;
export type UpdateSchoolYear = z.infer<typeof  updateSchoolYear>;
export type CreateProgram = z.infer<typeof  createProgram>;
export type CreateEnrollmentSched = z.infer<typeof  createEnrollmentSched>;
export type ChangePassword = z.infer<typeof changepassword>;
export type CreateAssingment = z.infer<typeof createAssingmentteacher>;
export type EditAssingment = z.infer<typeof editAssingmentteacher>;
export type EditQuestTeacher = z.infer<typeof editQuestteacher>;
