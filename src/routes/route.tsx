

export const superadmin = [
    {name: 'Dashboard', icon: <img src='/icons/home-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/superadmin/dashboard', subpath:[]},

    // {name: 'School Year', icon: <img src='/icons/flag-inactive.png' width={20} height={20} alt='home'/>, 
    // path:'/superadmin/sy', subpath:[]},

    {name: 'School Setup', icon: <img src='/icons/flag-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/schoolsetup', subpath:[
        {name:'School Year', path:'/superadmin/schoolsetup/schoolyear'},
        {name:'Program', path:'/superadmin/schoolsetup/program'},
        {name:'Enrollment Schedule', path:'/superadmin/schoolsetup/enrollmentschedule'},
        {name:'Subject', path:'/superadmin/schoolsetup/subject'},
        {name:'Grade level', path:'/superadmin/schoolsetup/gradelevel'},
        {name:'Section', path:'/superadmin/schoolsetup/section'},
        
    ]},

    {name: 'Enrollment', icon: <img src='/icons/users-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/enrollment', subpath:[
        {name:'Exams', path:'/superadmin/enrollment/exam'},
        {name:'Requirements', path:'/superadmin/enrollment/requirements'},
        {name:'Schedule', path:'/superadmin/enrollment/schedule'},
    ]},
 
    {name: 'Teacher Management', icon: <img src='/icons/user-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/teachermanagement', subpath:[
        {name:'Advisory', path:'/superadmin/teachermanagement/advisory'},
        {name:'Teacher Scheduling', path:'/superadmin/teachermanagement/scheduling'},
        {name:'Section Scheduling', path:'/superadmin/teachermanagement/sectionscheduling'},
        {name:'Schedule History', path:'/superadmin/teachermanagement/schedulehistory'},
    ]},

    {name: 'Staff Management', icon: <img src='/icons/users-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/staff', subpath:[
        {name:'Admin', path:'/superadmin/staff/admin'},
        {name:'Adviser', path:'/superadmin/staff/adviser'},
        {name:'Teacher', path:'/superadmin/staff/teacher'},
        {name:'Finance', path:'/superadmin/staff/finance'},
        {name:'Registrar', path:'/superadmin/staff/registrar'},
        {name:'Support', path:'/superadmin/staff/support'},
    ]},

    {name: 'Grades', icon: <img src='/icons/comment-inactive.png' width={20} height={20} alt='news'/>, 
    path:'/superadmin/grades', subpath:[]},

    {name: 'Evaluation', icon: <img src='/icons/users-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/evaluation', subpath:[
        {name:'Create', path:'/superadmin/evaluation/create'},
        {name:'Teacher', path:'/superadmin/evaluation/teacher'},
       
    ]},

    {name: 'News / Announcements', icon: <img src='/icons/comment-inactive.png' width={20} height={20} alt='news'/>, 
    path:'/superadmin/news', subpath:[]},

    {name: 'Events', icon: <img src='/icons/calendar-inactive.png' width={20} height={20} alt='events'/>, 
    path:'/superadmin/events', subpath:[]},

    // {name: 'Settings', icon: <img src='/icons/settings.png' width={20} height={20} alt='home'/>, 
    // path:'/superadmin/settings', subpath:[]},

    // {name: 'Announcements', icon: <img src='/icons/comments-inactive.png' width={20} height={20} alt='announcement'/>, 
    // active: <img src='/icons/comments-active.png' width={20} height={20} alt='home'/>,
    // path:'/superadmin/announcements', subpath:[]},

    // {name: 'Chat Support', icon: <img src='/icons/users-inactive.png' width={20} height={20} alt='home'/>, 
    // path:'/superadmin/chatsupport', subpath:[]},
]

export const teacher = [
    {name: 'Dashboard', icon: <img src='/icons/home-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/dashboard', subpath:[]},
    {name: 'Schedule', icon: <img src='/icons/calendar-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/schedule', subpath:[]},
    {name: 'Grades', icon: <img src='/icons/folder.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/grades', subpath:[]},
    {name: 'Classroom', icon: <img src='/icons/folder.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/classroom', subpath:[]},
    // {name: 'Settings', icon: <img src='/icons/settings.png' width={20} height={20} alt='home'/>, 
    // path:'/teacher/settings', subpath:[]},
]

export const adviser = [
    {name: 'Dashboard', icon: <img src='/icons/home-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/dashboard', subpath:[]},
    {name: 'Schedule', icon: <img src='/icons/calendar-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/teacher/schedule', subpath:[]},
    {name: 'Grades', icon: <img src='/icons/folder.png' width={20} height={20} alt='home'/>, 
    path:'/adviser/grades', subpath:[]},
    // {name: 'Settings', icon: <img src='/icons/calendar-inactive.png' width={20} height={20} alt='home'/>, 
    // path:'/adviser/settings', subpath:[]},
]


export const finance = [
    {name: 'Dashboard', icon: <img src='/icons/home-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/finance/dashboard', subpath:[]},
    {name: 'Accounting', icon: <img src='/icons/coupon.png' width={20} height={20} alt='home'/>, 
    path:'/finance/accounting', subpath:[]},
    {name: 'School Fees', icon: <img src='/icons/coupon.png' width={20} height={20} alt='home'/>, 
    path:'/finance/schoolfees', subpath:[]},
    {name: 'Settings', icon: <img src='/icons/settings.png' width={20} height={20} alt='home'/>, 
    path:'/finance/settings', subpath:[]},
]




export const superadminCopy = [
    {name: 'Dashboard', icon: <img src='/icons/home-inactive.png' width={20} height={20} alt='home'/>, 
    path:'/superadmin/dashboard', subpath:[]},
 

    {name: 'School Setup', icon: <img src='/icons/flag-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/schoolsetup', subpath:[
        {name:'Subject', path:'/superadmin/schoolsetup/subject'},
        {name:'Grade level', path:'/superadmin/schoolsetup/gradelevel'},
        {name:'Section', path:'/superadmin/schoolsetup/section'},
        
    ]},

    {name: 'Teacher Management', icon: <img src='/icons/user-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/teachermanagement', subpath:[
        {name:'Advisory', path:'/superadmin/teachermanagement/advisory'},
        {name:'Scheduling', path:'/superadmin/teachermanagement/scheduling'},
        {name:'Schedule History', path:'/superadmin/teachermanagement/schedulehistory'},
    ]},

    {name: 'Staff Management', icon: <img src='/icons/users-inactive.png' width={20} height={20} alt='users'/>, 
    path:'/superadmin/staff', subpath:[
        {name:'Admin', path:'/superadmin/staff/admin'},
        {name:'Adviser', path:'/superadmin/staff/adviser'},
        {name:'Teacher', path:'/superadmin/staff/teacher'},
        {name:'Finance', path:'/superadmin/staff/finance'},
        {name:'Registrar', path:'/superadmin/staff/registrar'},
    ]},

    {name: 'News / Announcements', icon: <img src='/icons/comment-inactive.png' width={20} height={20} alt='news'/>, 
    path:'/superadmin/news', subpath:[]},

    {name: 'Events', icon: <img src='/icons/calendar-inactive.png' width={20} height={20} alt='events'/>, 
    path:'/superadmin/events', subpath:[]},

    // {name: 'Announcements', icon: <img src='/icons/comments-inactive.png' width={20} height={20} alt='announcement'/>, 
    // active: <img src='/icons/comments-active.png' width={20} height={20} alt='home'/>,
    // path:'/superadmin/announcements', subpath:[]},
]