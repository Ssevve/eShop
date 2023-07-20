import useAuth from '@/hooks/useAuth';
import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export function App() {
  useAuth();

  return <RouterProvider router={router} />;
}

export default App;
