import axios from "axios";

const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_API_PUBLIC_URL,
    params: {
        apikey: import.meta.env.VITE_API_PUBLIC_KEY,
        lang: 'ru_RU',
        format: 'json',
    },
})

export default apiPublic;