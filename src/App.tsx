import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import routesConfig from 'config/routes';

const router = createBrowserRouter(routesConfig);

export function App() {
  useAuth();

  return <RouterProvider router={router} />;
}

export default App;
