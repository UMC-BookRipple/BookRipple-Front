import axios from "axios";

const showSpinner = () => {
    const el = document.getElementById("global-spinner");
    el?.classList.remove("hidden");
    el?.classList.add("flex");
};

const hideSpinner = () => {
    const el = document.getElementById("global-spinner");
    el?.classList.add("hidden");
    el?.classList.remove("flex");
};

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

/* 요청 시 */
http.interceptors.request.use(
    (config) => {
        showSpinner();
        return config;
    },
    (error) => {
        hideSpinner();
        return Promise.reject(error);
    }
);

/* 응답 시 */
http.interceptors.response.use(
    (response) => {
        hideSpinner();
        return response;
    },
    (error) => {
        hideSpinner();
        return Promise.reject(error);
    }
);
