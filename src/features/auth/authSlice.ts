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
import auth from 'lib/firebaseConfig';
import AuthState from 'types/AuthState';
import { LoginSchema } from './schemas/loginSchema';
import { RegisterSchema } from './schemas/registerSchema';
import FirebaseLoginErrors from './firebaseLoginErrors';
import User from 'types/User';

const initialState: AuthState = {
  user: localStorage['user'] ? JSON.parse(localStorage['user']) : undefined,
  status: 'IDLE',
  error: {
    server: false,
    invalidCredentials: false,
    emailTaken: false,
  },
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
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = undefined;
      }
    },
    setServerError(state, action: PayloadAction<boolean>) {
      state.error.server = action.payload;
    },
    resetAuthStatusAndErrors(state) {
      state.status = 'IDLE';
      state.error.invalidCredentials = false;
      state.error.server = false;
      state.error.emailTaken = false;
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
          state.error.invalidCredentials = true;
          state.error.server = false;
        } else {
          state.error.invalidCredentials = false;
          state.error.server = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'ERROR';
        if (action.payload === 409) {
          state.error.emailTaken = true;
          state.error.server = false;
        } else {
          state.error.emailTaken = false;
          state.error.server = true;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'ERROR';
      })
      .addMatcher(isPendingAction, (state) => {
        state.status = 'PENDING';
        state.error.server = false;
        state.error.invalidCredentials = false;
        state.error.emailTaken = false;
      })
  },
});

export const { resetAuthStatusAndErrors, setServerError, setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsRegisterSuccess = (state: RootState) => state.auth.status === 'REGISTER_SUCCESS';
export const selectIsPendingAuth = (state: RootState) =>
  state.auth.status === 'PENDING';

export default authSlice.reducer;
