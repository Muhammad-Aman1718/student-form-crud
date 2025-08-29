import axios from "axios";

const AxiosIntance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 10000,
});

export default AxiosIntance;
