import { create } from "zustand";

interface AuthState {
    isLoggedIn: boolean;
    isAuthChecked: boolean;
    checkAuth: () => void;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isAuthChecked: false,

    checkAuth: () => {
        const token = localStorage.getItem("accessToken");

        set({
            isLoggedIn: !!token,
            isAuthChecked: true,
        });
    },

    login: () =>
        set({
            isLoggedIn: true,
            isAuthChecked: true,
        }),

    logout: () => {
        localStorage.removeItem("accessToken");
        set({
            isLoggedIn: false,
            isAuthChecked: true,
        });
    },
}));
