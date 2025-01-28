// store.ts
import { create } from 'zustand';

interface UserStoreState {
  userId: string | null;
  setUserId: (id: string) => void; 
  clearUserId: () => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  userId: null, 
  setUserId: (id: string) => set({ userId: id }), 
  clearUserId: () => set({ userId: null }),
}));

export default useUserStore;