// components/CreateGradeLevelForm.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';


interface program {
    id: string
    name: string
}

type FormData = {
  program: string;
  gradelevel: string;
};

interface CreateGradeLevelFormProps {
  list: program[];
  formData: FormData[];
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
  handleRemoveForm: (index: number) => void;
  handleChange: (index: number, field: keyof FormData, value: string) => void;
  handleAddForm: () => void;
  handleSubmit: () => void;
  loading: boolean;
}

const CreateGradeLevelForm: React.FC<CreateGradeLevelFormProps> = ({
  list,
  formData,
  setFormData,
  handleRemoveForm,
  handleChange,
  handleAddForm,
  handleSubmit,
  loading
}) => {
  return (
    <div className="w-full flex flex-col text-xs">
      {formData.map((item, index) => (
        <div key={index} className={`w-full flex flex-col ${formData.length > 1 && 'border-b-[1px] border-blue-200m pb-4'}`}>
          <label htmlFor="program" className='mt-2'>Program</label>
          <Select
            value={item.program}
            onValueChange={(value) => handleChange(index, 'program', value)}
          >
            <SelectTrigger className=' input-primary'>
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              {list.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label htmlFor="gradelevel" className='mt-2'>Grade Level</label>
          <input 
            type="text" 
            placeholder='Name' 
            className='input-primary' 
            value={item.gradelevel}
            onChange={(e) => handleChange(index, 'gradelevel', e.target.value)}
          />

          {index !== 0 && (
            <div className='w-full flex items-end justify-end text-[.7em] mt-2'>
              <button 
                onClick={() => handleRemoveForm(index)} 
                className='bg-red-500 px-2 py-1 rounded-md flex items-center gap-1 text-white'>
                <img src='/icons/trashwhite.png' height={15} width={15} />
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <div className='w-full flex items-end justify-end mt-6 gap-2'>
        <button onClick={handleSubmit} className='action-btn' disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button onClick={handleAddForm} className='light-btn'>
          <img src='/icons/plus-square.png' width={15} height={15} /> Add Form
        </button>
      </div>
    </div>
  );
};

export default CreateGradeLevelForm;
