import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from 'lib/firebaseConfig';
import { useAppDispatch } from 'app/hooks';
import { setUser } from './authSlice';

function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const setUserInfo = async () => {
          const url = `${import.meta.env.VITE_API_URL}/users/${firebaseUser.uid}`;
          const res = await fetch(url);
          const user = await res.json();
          if (user) dispatch(setUser(user));
        };
        setUserInfo();
      } else {
        dispatch(setUser(undefined));
      }
    });
    return unsubscribe;
  }, []);
}

export default useAuth;
