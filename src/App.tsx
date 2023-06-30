import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from 'features/auth/useAuth';
import routesConfig from 'routes/routesConfig';

const router = createBrowserRouter(routesConfig);

export function App() {
  useAuth();

  return <RouterProvider router={router} />;
}

export default App;
