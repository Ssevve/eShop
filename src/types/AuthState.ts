import { UserCredential } from 'firebase/auth';

export interface AuthState {
  user: UserCredential | null;
  status: string;
  errorMessage: string;
}
