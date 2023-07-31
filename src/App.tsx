import routes from '@/config/routes';
import useAuth from '@/hooks/useAuth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLazyGetCartQuery } from './features/carts';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

const router = createBrowserRouter(routes);

export function App() {
  useAuth();
  const [fetchCart] = useLazyGetCartQuery();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => fetchCart());
    return unsubscribe;
  }, []);

  return <RouterProvider router={router} />;
}
