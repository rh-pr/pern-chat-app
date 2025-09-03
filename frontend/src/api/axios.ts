import axios from 'axios';

// const url = import.meta.env.NODE_MODE === "development" ? "http://localhost:5000" : "/";
const url = import.meta.env.BASE_URL;
const api = axios.create({
   baseURL: `${url}/api`,
   withCredentials: true,
})

export default api;