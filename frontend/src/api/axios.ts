import axios from 'axios';

const url = import.meta.env.BASE_URL || 'http://localhost:3000';

const api = axios.create({
   baseURL: `${url}/api`,
   withCredentials: true
})

export default api;