import { selectCurrentUser } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function GuestRoutes() {
  const loggedInUser = useSelector(selectCurrentUser);
  return loggedInUser ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default GuestRoutes;
