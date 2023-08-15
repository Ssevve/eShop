/* eslint-disable import/no-extraneous-dependencies */
import FirebaseErrors from '@/features/auth/lib/firebaseErrors';
import { server, userWithoutReviewMock as userMock } from '@/mocks';
import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { Auth } from 'firebase/auth';
import { expect, vi } from 'vitest';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

// Mock firebase auth
vi.mock('firebase/auth', () => {
  return {
    ...vi.importActual('firebase/auth'),
    getAuth: vi.fn(() => {
      return {
        auth: {
        currentUser: {
          getIdToken: vi.fn(),
        }
      }
    }
    }),
    beforeAuthStateChanged: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn((auth: Auth, email: string, password: string) => {
      if (email !== userMock.email) {
        return Promise.reject({ code: FirebaseErrors.UserNotFound });
      } else if (password !== userMock.password) {
        return Promise.reject({ code: FirebaseErrors.WrongPassword });
      }
    }),
}});

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
