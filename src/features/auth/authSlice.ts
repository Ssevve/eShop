/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  signOut,
  UserInfo as FirebaseUserInfo,
} from 'firebase/auth';
import { RootState } from 'app/store';
import auth from 'lib/firebaseConfig';
import AuthState from 'types/AuthState';
import { LoginSchema } from './schemas/loginSchema';
import { RegisterSchema } from './schemas/registerSchema';
import FirebaseErrors from './firebaseErrors';
import User from 'types/User';

const initialState: AuthState = {
  user: undefined,
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
  'auth/registerUser', async ({ email, password, firstName, lastName }: RegisterSchema) => {
    const url = `${import.meta.env.VITE_API_URL}/users/register`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    })
    return await res.json();
  }
);

export const loginUser = createAsyncThunk(
  'auth/getUserByFirebaseId', async ({ email, password }: LoginSchema) => {
    const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
    if (firebaseUser) {
      const url = `${import.meta.env.VITE_API_URL}/users/${firebaseUser.user.uid}`;
      const res = await fetch(url);
      return await res.json();
    }
    return firebaseUser;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', () =>
  signOut(auth)
);

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
    resetAuthStatusAndErrors(state) {
      state.status = 'IDLE';
      state.error.invalidCredentials = false;
      state.error.server = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: AnyAction) => {
        state.status = 'LOGIN_SUCCESS';
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action: AnyAction) => {
        console.log(action);
        state.status = 'REGISTER_SUCCESS';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'LOGOUT_SUCCESS';
        state.user = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'ERROR';
        if (action.error.code === FirebaseErrors.UserNotFound
          || action.error.code === FirebaseErrors.WrongPassword) {
          state.error.invalidCredentials = true;
          state.error.server = false;
        } else {
          state.error.invalidCredentials = false;
          state.error.server = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'ERROR';
        if (action.error.code === FirebaseErrors.EmailTaken) {
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
      })
  },
});

export const { resetAuthStatusAndErrors, setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsRegisterSuccess = (state: RootState) => state.auth.status === 'REGISTER_SUCCESS';
export const selectIsPendingAuth = (state: RootState) =>
  state.auth.status === 'PENDING';

export default authSlice.reducer;
