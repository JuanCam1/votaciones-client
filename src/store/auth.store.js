import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { login } from "../services";

export const storeAuth = (set) => ({
  token: undefined,
  dataUser: undefined,
  loginUser: async (loginDto) => {
    try {
      const { data } = await login(loginDto);
      set({ token: data.data.token, dataUser: data.data.payload });
    } catch (err) {
      if (!err) {
        throw "Error";
      }
      if (err?.response.data.error.code == 106) {
        throw "Incorrect";
      }
      if (err?.response.data.error.code == 101) {
        throw "Inactive";
      }
      set({ token: undefined, dataUser: undefined });
    }
  },
  logoutUser: () => {
    set({ token: undefined, dataUser: undefined });
  }
});

export const useAuthStore = create(devtools(persist(storeAuth, { name: "auth-storage" })));
