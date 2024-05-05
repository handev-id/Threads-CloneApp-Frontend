import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
