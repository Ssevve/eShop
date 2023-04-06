import Status from './Status';

interface User {
  uid: string;
  email: string;
  phoneNumber: string | null;
}

interface Error {
  server: boolean;
  invalidCredentials: boolean;
}

interface AuthState {
  user: User | null;
  status: Status;
  error: Error;
}

export default AuthState;
