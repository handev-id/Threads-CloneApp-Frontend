import axios from "axios";

const baseUrl = "https://brainy-calf-pantyhose.cyclic.app";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
