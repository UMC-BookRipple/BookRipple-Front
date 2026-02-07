import axios from 'axios';

const api = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcwNDY4OTM4LCJleHAiOjE3NzA0NzA3Mzh9.cQzVQLntS_U0CUUsUCUbd2Kzu_f7WpNM-hQ0E3vhVboPMx6qw8_JKlZRN1i0Z2uMRB_OfwqWU3a99LK3wMa0pw';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("No token found");
    }
    return config;
});

export default api;
