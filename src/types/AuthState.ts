import Status from './Status';

interface User {
  uid: string;
  email: string;
  phoneNumber: string | undefined | null;
}

interface Error {
  server: boolean;
  invalidCredentials: boolean;
}

interface AuthState {
  user: User | undefined;
  status: Status;
  error: Error;
}

export default AuthState;
