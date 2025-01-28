'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface EditSubjectProps {
  subjectId: string | null;
  currentName: string;
  onUpdate: () => void;
}

const EditSubject: React.FC<EditSubjectProps> = ({ subjectId, currentName, onUpdate }) => {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    router.push('?state=true')
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subject/editsubjects?id=${subjectId}&name=${name}`,
        { withCredentials: true }
      );
      setModal(false)
      toast.success('Subject updated successfully');
      router.push('?state=false')

      onUpdate(); // Trigger parent refresh
    } catch (error) {
      setModal(false)
      router.push('?state=false')
      toast.error('Failed to update subject');
    } finally {
      setModal(false)
      setLoading(false);
      router.push('?state=false')
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className="light-btn">
        <img src="/icons/pen.png" width={15} height={15} alt="Edit" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>Update the subject name below.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col"
        >
          <label htmlFor="subjectName" className="mt-2">
            Subject Name
          </label>
          <input
            id="subjectName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-primary"
            placeholder="Enter subject name"
          />
          <div className="flex justify-end mt-6">
           
              <button type="submit" className="action-btn" disabled={loading}>
                Save
              </button>
           
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubject;
