import FirebaseErrors from 'features/auth/firebaseErrors';
import { Auth } from 'firebase/auth';
import { vi } from 'vitest';
import mockUser from './user';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
      if (email === 'notfound@email.com') {
        return Promise.reject({ code: FirebaseErrors.UserNotFound });
      } else if (password === 'wrongPassword') {
        return Promise.reject({ code: FirebaseErrors.WrongPassword });
      }
      return Promise.resolve(mockUser);
    },
  };
});