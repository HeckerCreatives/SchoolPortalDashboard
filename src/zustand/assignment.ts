// store.ts
import { create } from 'zustand';

interface assignmentId {
    assignmentId: string | null;
  setAssignmentId: (id: string) => void; 
  clearAssignmentId: () => void;
}

const userAssignmentid = create<assignmentId>((set) => ({
  assignmentId: null, 
  setAssignmentId: (id: string) => set({ assignmentId: id }), 
  clearAssignmentId: () => set({ assignmentId: null }),
}));

export default userAssignmentid;