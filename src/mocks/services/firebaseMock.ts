import FirebaseErrors from '@/features/auth/lib/firebaseErrors';
import { Auth } from 'firebase/auth';
import { vi } from 'vitest';
import { userWithoutReviewMock as userMock } from '../userMock';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
      if (email !== userMock.email) {
        return Promise.reject({ code: FirebaseErrors.UserNotFound });
      } else if (password !== userMock.password) {
        return Promise.reject({ code: FirebaseErrors.WrongPassword });
      }
    },
  };
});