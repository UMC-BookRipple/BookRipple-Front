import axios from 'axios';

const api = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcwNTQ3NzA3LCJleHAiOjE3NzA1NDk1MDd9.0hWwHq9Nzp2kDjPbVgchce-TETqG70SjL4y-7ROMpdizrGzeFA2V855qbGagnN8rpoyqBCnP_hH8PZFI1f1hoQ';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("No token found");
    }
    return config;
});

export default api;
