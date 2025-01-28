'use client'
import StudentLayout from '@/components/layout/Student'
import React, { useRef } from 'react'
import Cor from './Cor'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function page() {

   const componentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
    <StudentLayout>
        <div className=' w-full max-w-[1240px] h-full flex flex-col gap-12 px-6'>
            
        </div>
    
        <div className=' flex flex-col w-full max-w-[1240px]'>
          
            <Cor/>
        </div>
    </StudentLayout>
  )
}
