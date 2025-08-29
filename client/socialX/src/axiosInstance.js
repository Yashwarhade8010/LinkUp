import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://linkup-1-3d9b.onrender.com",
  withCredentials: true
});
