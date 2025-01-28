import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; 

interface ClassroomState {
  view: string;
  setView: (data: string) => void;
  clearView: () => void;
}

const studentClasroomStore = create<ClassroomState>()(
  persist(
    (set) => ({
      view: 'view1',
      setView: (data: string) => set({ view: data }), 
      clearView: () => set({ view: 'view1' }), 
    }),
    {
      name: 'classroom-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default studentClasroomStore;