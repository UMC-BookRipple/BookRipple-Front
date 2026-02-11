import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";



const REFRESH_PATH = "/api/v1/auth/refresh";

// ===== Spinner  =====
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

// ===== localStorage keys =====
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};


export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

const refreshHttp = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


function attachInterceptors(target: AxiosInstance) {
    let isRefreshing = false;
    let refreshQueue: Array<(token: string | null) => void> = [];

    const runQueue = (token: string | null) => {
        refreshQueue.forEach((cb) => cb(token));
        refreshQueue = [];
    };

    async function refreshAccessToken(): Promise<string> {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await refreshHttp.post(REFRESH_PATH, { refreshToken });

        const payload = (res.data?.result ?? res.data) as any;

        const newAccessToken =
            payload?.accessToken ?? payload?.access_token ?? payload?.token;
        const newRefreshToken =
            payload?.refreshToken ?? payload?.refresh_token ?? payload?.refresh;

        if (!newAccessToken || !newRefreshToken) {
            console.error("[AUTH] refresh response body =", res.data);
            throw new Error("Invalid refresh response (need accessToken & refreshToken)");
        }

        setTokens(newAccessToken, newRefreshToken);
        return newAccessToken;
    }


    target.interceptors.request.use(
        (config) => {
            showSpinner();

            const token = getAccessToken();
            if (token) {
                config.headers = config.headers ?? {};
                (config.headers as any).Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            hideSpinner();
            return Promise.reject(error);
        }
    );

    target.interceptors.response.use(
        (response) => {
            hideSpinner();
            return response;
        },
        async (error: AxiosError) => {
            hideSpinner();

            const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
            if (!originalRequest) return Promise.reject(error);

            const status = error.response?.status;

            // 토큰 만료를 401로 가정
            if ((status === 401 || status === 403) && !originalRequest._retry) {
                originalRequest._retry = true;

                // refresh 진행 중이면 큐에 대기
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        refreshQueue.push((token) => {
                            if (!token) return reject(error);

                            originalRequest.headers = originalRequest.headers ?? {};
                            (originalRequest.headers as any).Authorization = `Bearer ${token}`;
                            resolve(target(originalRequest));
                        });
                    });
                }

                isRefreshing = true;

                try {
                    const newToken = await refreshAccessToken();
                    runQueue(newToken);

                    originalRequest.headers = originalRequest.headers ?? {};
                    (originalRequest.headers as any).Authorization = `Bearer ${newToken}`;

                    return target(originalRequest);
                } catch (e) {
                    runQueue(null);
                    clearTokens();
                    window.location.href = "/auth/login/local";

                    return Promise.reject(e);
                }
                finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
}



attachInterceptors(http);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;
attachInterceptors(axios);

/**
 * 매우 중요:
 * 이 파일은 앱 시작 시 딱 1번 import 되어야(실행되어야) 인터셉터가 등록됨.
 *
 * 예) main.ts / main.tsx 최상단에:
 *   import "./api/http";
 *
 * 그러면 팀원들이 기존처럼 `import axios from "axios"` 써도
 * refresh/로딩/Authorization 전부 적용됨.
 */
