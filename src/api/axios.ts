import axios from 'axios';

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token found');
  }
  return config;
});

export default api;
