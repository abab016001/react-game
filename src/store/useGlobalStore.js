import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  /** page */
  page: 1,
  setPage: (value) => set({ page: value }),
  isPage: (value) => get().page === value,
}))