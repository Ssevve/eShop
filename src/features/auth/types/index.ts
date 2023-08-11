import { User } from "@/types";

export type AuthStatus = 'IDLE' | 'PENDING' | 'ERROR' | 'REGISTER_SUCCESS';

type AuthError = null | 'server' | 'invalidCredentials' | 'emailTaken';

export interface AuthState {
  user: User | undefined;
  status: AuthStatus;
  error: AuthError;
}