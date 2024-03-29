import { RootState } from '@/app/store';
import { auth } from '@/config/firebase';
import { User } from '@/types';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  UserCredential,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import FirebaseLoginErrors from './lib/firebaseErrors';
import { LoginSchema } from './lib/loginSchema';
import { RegisterSchema } from './lib/registerSchema';
import { AuthState } from './types';

const initialState: AuthState = {
  user: localStorage['user'] ? JSON.parse(localStorage['user']) : undefined,
  status: 'IDLE',
  error: null,
};

export const registerUser = createAsyncThunk<User, RegisterSchema>(
  'auth/registerUser', async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
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

export const loginUser = createAsyncThunk<UserCredential, LoginSchema>(
  'auth/loginUser', async ({ email, password }: LoginSchema) => 
    signInWithEmailAndPassword(auth, email, password));

export const logoutUser = createAsyncThunk('auth/logoutUser', () => signOut(auth));

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
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
    .addCase(loginUser.pending, (state) => {
      state.status = 'PENDING';
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state) => {
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
    .addCase(registerUser.pending, (state) => {
      state.status = 'PENDING';
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.status = 'REGISTER_SUCCESS';
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'ERROR';
      if (action.payload === 409) state.error = 'emailTaken';
      else state.error = 'server';
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = 'PENDING';
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.status = 'IDLE';
    })
    .addCase(logoutUser.rejected, (state) => {
      state.status = 'ERROR';
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
