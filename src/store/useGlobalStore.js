import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  /** game - uuid */
  uuid: 1,
  refreshGame: () => set({ uuid: crypto.randomUUID() }),

  /** page */
  page: 1,
  setPage: (value, keep_global_page = false) => {
    if (!keep_global_page) {
      set({ globalPage: "" })
    }
    set({ page: value })
  },

  /** globalPage */
  globalPage: "",
  setGlobalPage: (value) => set({ globalPage: value }),

  /** GameOver */
  gameOver: { "msg": "" },
  setGameOver: ({ msg }) => set({ gameOver: { msg } })
}))