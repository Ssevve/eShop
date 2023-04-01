import { useAppDispatch } from 'app/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import auth from 'firebaseConfig';
import { setUser } from './authSlice';

function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAuth;
