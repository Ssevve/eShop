import { selectCurrentUser } from '@/features/auth';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function GuestRoutes() {
  const loggedInUser = useSelector(selectCurrentUser);
  return loggedInUser ? <Navigate to="/dashboard" /> : <Outlet />;
}
