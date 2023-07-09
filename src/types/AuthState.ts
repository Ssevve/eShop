import Status from './Status';
import User from './User';

type AuthError = false | 'server' | 'invalidCredentials' | 'emailTaken';

interface AuthState {
  user: User | undefined;
  status: Status;
  error: AuthError;
}

export default AuthState;
