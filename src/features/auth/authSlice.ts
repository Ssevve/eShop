import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { RootState } from 'app/store';
import auth from 'config/firebase';
import { LoginSchema } from './lib/loginSchema';
import { RegisterSchema } from './lib/registerSchema';
import FirebaseLoginErrors from './lib/firebaseErrors';
import User from 'types/User';

type AuthError = null | 'server' | 'invalidCredentials' | 'emailTaken';
export type AuthStatus = 'IDLE' | 'PENDING' | 'ERROR' | 'REGISTER_SUCCESS';

interface AuthState {
  user: User;
  status: AuthStatus;
  error: AuthError;
}

const initialState: AuthState = {
  user: localStorage['user'] ? JSON.parse(localStorage['user']) : undefined,
  status: 'IDLE',
  error: null,
};

function isPendingAction(action: Action) {
  return action.type.endsWith('pending');
}

export const registerUser = createAsyncThunk(
  'auth/registerUser', async ({ email, password, firstName, lastName }: RegisterSchema, { rejectWithValue }) => {
      const url = `${import.meta.env.VITE_API_URL}/users/register`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }), 
      });
      if (res.status === 409) return rejectWithValue(res.status);
      else if (!res.ok) return rejectWithValue(res.status);
      return await res.json();
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser', async ({ email, password }: LoginSchema) => 
    signInWithEmailAndPassword(auth, email, password));

export const logoutUser = createAsyncThunk('auth/logoutUser', () => signOut(auth));

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | undefined>) {
      if (action.payload) state.user = action.payload;
      else state.user = undefined;
    },
    setServerError(state) {
      state.error = 'server';
    },
    resetAuthStatusAndError(state) {
      state.status = 'IDLE';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'IDLE';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'REGISTER_SUCCESS';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'IDLE';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'ERROR';
        if (action.error.code === FirebaseLoginErrors.UserNotFound
          || action.error.code === FirebaseLoginErrors.WrongPassword) {
            state.error = 'invalidCredentials';
        } else {
          state.error = 'server';
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'ERROR';
        if (action.payload === 409) state.error = 'emailTaken';
        else state.error = 'server';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'ERROR';
      })
      .addMatcher(isPendingAction, (state) => {
        state.status = 'PENDING';
        state.error = null;
      })
  },
});

export const { resetAuthStatusAndError, setServerError, setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsRegisterSuccess = (state: RootState) => state.auth.status === 'REGISTER_SUCCESS';
export const selectServerError = (state: RootState) => state.auth.error === 'server';
export const selectIsPendingAuth = (state: RootState) =>
  state.auth.status === 'PENDING';

export default authSlice.reducer;
