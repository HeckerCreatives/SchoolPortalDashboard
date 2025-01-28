import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

interface EditGradeLevelFormProps {
  programList: { id: string; name: string }[];
  gradeLevelData: { id: string; program: string; name: string };
  onSubmit: (data: { id: string; program: string; name: string }) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

const EditGradeLevelForm: React.FC<EditGradeLevelFormProps> = ({
  programList,
  gradeLevelData,
  onSubmit,
  onClose,
  loading,
}) => {
  const [program, setProgram] = useState(gradeLevelData.program || '');
  const [name, setName] = useState(gradeLevelData.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!program || !name) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      await onSubmit({ id: gradeLevelData.id, program, name });
      onClose();
    } catch (error) {
      toast.error('Failed to update Grade Level. Please try again.');
    }
  };

  return (
    <DialogContent className="text-xs max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-lg">Edit Grade Level</DialogTitle>
        <DialogDescription className="text-xs">Update grade level details below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="program" className="block text-sm font-medium">
            Program
          </label>
          <Select value={program} onValueChange={setProgram}>
            <SelectTrigger>
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {programList.map((prog) => (
                  <SelectItem key={prog.id} value={prog.id}>
                    {prog.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="name" className="block w-full text-sm font-medium">
            Grade Level
          </label>
          <input
            id="name"
            type="text"
            className="input-primary w-full"
            placeholder="Enter Grade Level"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="secondary-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="action-btn" disabled={loading}>
            Save
          </button>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditGradeLevelForm;
