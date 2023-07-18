import { AuthStatus } from 'features/auth/authSlice';
import user from './user';

const status: AuthStatus = 'IDLE';

const loggedInUserState = {
  auth: {
    user,
    status,
    error: null,
  },
};

export default loggedInUserState;