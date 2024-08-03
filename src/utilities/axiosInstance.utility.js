import axios from "axios";
import { config } from "../config/config";
import { useAuthStore } from "../store/auth.store";

const apiUrl = config.PATH_URL;
export const instance = axios.create({
  baseURL: apiUrl
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const dataUser = useAuthStore.getState().dataUser;

  if (token || dataUser) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["X-User-Data"] = JSON.stringify(dataUser);
  }

  return config;
});
