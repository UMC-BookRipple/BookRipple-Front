import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isLoggedIn, isAuthChecked, checkAuth } = useAuthStore();

    useEffect(() => {
        if (!isAuthChecked) {
            checkAuth();
        }
    }, [isAuthChecked, checkAuth]);

    if (!isAuthChecked) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/start" replace />;
    }

    return <Outlet />;
};

export const PublicRoute = () => {
    const { isLoggedIn, isAuthChecked, checkAuth } = useAuthStore();

    useEffect(() => {
        if (!isAuthChecked) {
            checkAuth();
        }
    }, [isAuthChecked, checkAuth]);

    if (!isAuthChecked) return null;

    if (isLoggedIn) {
        return <Navigate to="/bookshelf" replace />;
    }

    return <Outlet />;
};

