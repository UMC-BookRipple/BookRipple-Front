import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
