import { AuthState } from "@/app/types/auth";
import { create } from "zustand";

export const authStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
