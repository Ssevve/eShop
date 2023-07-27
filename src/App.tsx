import routes from '@/config/routes';
import useAuth from '@/hooks/useAuth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export function App() {
  useAuth();

  return <RouterProvider router={router} />;
}
