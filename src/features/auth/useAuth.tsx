import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { beforeAuthStateChanged } from 'firebase/auth';
import { setServerError, setUser } from './authSlice';
import auth from 'lib/firebaseConfig';

function useAuth() {
  const dispatch = useAppDispatch();

  const clearUserState = () => {
    localStorage.removeItem('user');
    dispatch(setUser(undefined));
  };

  useEffect(() => {
    const unsubscribe = beforeAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const url = `${import.meta.env.VITE_API_URL}/users/${firebaseUser.uid}`;
          const res = await fetch(url);
          if (res.ok) {
            const user = await res.json();
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(setUser(user));
          } else {
            clearUserState();
            throw Error('Failed to fetch user data.');
          }
        } catch (error) {
          clearUserState();
          if (location.pathname === '/login') dispatch(setServerError(true));
        }
      } else {
        clearUserState();
      }
    });
    return unsubscribe;
  }, []);
}
export default useAuth;
