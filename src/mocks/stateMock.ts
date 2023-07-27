import { AuthStatus } from '@/features/auth';
import { userWithoutReviewMock, userWithReviewMock } from './userMock';

const status: AuthStatus = 'IDLE';

export const loggedInUserWithoutReviewsStateMock = {
  auth: {
    user: userWithoutReviewMock,
    status,
    error: null,
  },
};

export const loggedInUserWithReviewsStateMock = {
  auth: {
    user: userWithReviewMock,
    status,
    error: null,
  },
};