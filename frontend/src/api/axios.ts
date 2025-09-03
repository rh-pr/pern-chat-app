import axios from 'axios';

const url = import.meta.env.NODE_MODE === "development" ? "http://localhost:5000" : "https://pern-chat-app-npmx.onrender.com";

const api = axios.create({
   baseURL: `${url}/api`,
   withCredentials: true,
})

export default api;