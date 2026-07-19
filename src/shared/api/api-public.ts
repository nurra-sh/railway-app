import axios from "axios";

const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_PUBLIC_URL,
  headers: {
    'X-API-Key': import.meta.env.VITE_API_PUBLIC_KEY,
  },
})

export default apiPublic;