import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { beforeAuthStateChanged } from 'firebase/auth';
import { setServerError, setUser } from './authSlice';
import auth from 'lib/firebaseConfig';

function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = beforeAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setUser(undefined));
        return;
      }

      const url = `${import.meta.env.VITE_API_URL}/users/${firebaseUser.uid}`;
      const res = await fetch(url);
      if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
      } else {
        dispatch(setUser(undefined));
        if (location.pathname === '/login') dispatch(setServerError());
      }
    });
    return unsubscribe;
  }, []);
}

export default useAuth;
