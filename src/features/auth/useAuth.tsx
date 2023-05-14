import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from 'firebaseConfig';
import { useAppDispatch } from 'app/hooks';
import { setUser } from './authSlice';

function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(undefined));
      }
    });
    return unsubscribe;
  }, []);
}

export default useAuth;
