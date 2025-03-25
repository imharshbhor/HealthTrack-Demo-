import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: String; firstName: string; lastName: string; email: string; role: string } | null;

type UserState = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "user-storage" } // Persist in localStorage
  )
);
