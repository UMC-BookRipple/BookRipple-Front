import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const HomeRoute = () => {
  const { isLoggedIn } = useAuthStore();

  // 로그인 안 한 사용자는 start로, 로그인 되어있으면 bookshelf/reading으로
  if (isLoggedIn) {
    return <Navigate to="/bookshelf/reading" replace />;
  }

  return <Navigate to="/start" replace />;
};

export default HomeRoute;
