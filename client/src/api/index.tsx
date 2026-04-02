import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance