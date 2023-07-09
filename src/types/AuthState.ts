import Status from './Status';
import User from './User';

type Error = false | 'server' | 'invalidCredentials' | 'emailTaken';

interface AuthState {
  user: User | undefined;
  status: Status;
  error: Error;
}

export default AuthState;
