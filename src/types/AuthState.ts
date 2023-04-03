type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'SUCCESS';

interface User {
  email: string;
  uid: string;
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
