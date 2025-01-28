// store.ts
import { create } from 'zustand';

interface classroomId {
  classroomId: string | null;
  setClassroomId: (id: string) => void; 
  clearClassroomId: () => void;
}

const userClassroomid = create<classroomId>((set) => ({
  classroomId: null, 
  setClassroomId: (id: string) => set({ classroomId: id }), 
  clearClassroomId: () => set({ classroomId: null }),
}));

export default userClassroomid;