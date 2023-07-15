import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/auth/authSlice';

function GuestRoutes() {
  const loggedInUser = useSelector(selectCurrentUser);
  return loggedInUser ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default GuestRoutes;
