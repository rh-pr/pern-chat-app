import axios from 'axios';

// const url = import.meta.env.NODE_MODE === "development" ? "http://localhost:5000" : "https://pern-chat-app-npmx.onrender.com";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL + '/api',
   withCredentials: true,
})

export default api;