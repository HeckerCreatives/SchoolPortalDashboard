'use client'
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

export default function Attendance() {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Present',
      start: new Date(2023, 9, 25, 10, 0), // October 25, 2023, 10:00 AM
      end: new Date(2023, 9, 25, 11, 0),  // October 25, 2023, 11:00 AM
    },
    {
      title: 'Absent',
      start: new Date(2023, 9, 26, 14, 0), // October 26, 2023, 2:00 PM
      end: new Date(2023, 9, 26, 15, 0),  // October 26, 2023, 3:00 PM
    },
  ]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('New Event Name');
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  const handleSelectEvent = (event: Event) => {
    window.alert(event.title);
  };


  return (
     <div className="mt-6">
     <h3 className="text-lg font-semibold mb-8">ATTENDANCE RECORD</h3>
     {/* <table className="w-full border-collapse border border-gray-300 text-sm">
       <thead>
         <tr className="bg-gray-200">
           <th className="border border-gray-300 p-2">MONTH</th>
           {[
             'Jun',
             'Jul',
             'Aug',
             'Sept',
             'Oct',
             'Nov',
             'Dec',
             'Jan',
             'Feb',
             'Mar',
             'Apr',
             'Total',
           ].map((month, index) => (
             <th key={index} className="border border-gray-300 p-2">
               {month}
             </th>
           ))}
         </tr>
       </thead>
       <tbody>
         {['School Days', 'Days Present', 'Times Tardy'].map((row, index) => (
           <tr key={index}>
             <td className="border border-gray-300 p-2 font-semibold">
               {row}
             </td>
             {[...Array(12)].map((_, i) => (
               <td key={i} className="border border-gray-300 p-2"></td>
             ))}
           </tr>
         ))}
       </tbody>
     </table> */}


     <div style={{ height: '500px' }}>
      <Calendar
      className=' text-xs'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>

   </div>
  )
}
