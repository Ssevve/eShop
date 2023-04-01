import { User } from 'firebase/auth';

type Status = 'IDLE' | 'PENDING' | 'ERROR' | 'SUCCESS';

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
