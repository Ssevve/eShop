import Status from './Status';
import User from './User';

interface Error {
  server: boolean;
  invalidCredentials: boolean;
  emailTaken: boolean;
}

interface AuthState {
  user: User | undefined;
  status: Status;
  error: Error;
}

export default AuthState;
