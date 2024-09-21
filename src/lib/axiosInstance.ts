import axios from "axios";

const baseUrl = "https://api.handev.my.id";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
