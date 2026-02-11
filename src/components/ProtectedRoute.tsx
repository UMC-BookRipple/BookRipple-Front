import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth/login/local" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;
