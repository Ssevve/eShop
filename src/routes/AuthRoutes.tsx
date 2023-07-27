import { selectCurrentUser } from '@/features/auth';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthRoutes() {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
