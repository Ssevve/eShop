/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { RootState } from 'app/store';
import auth from 'firebaseConfig';
import AuthState from 'types/AuthState';
import { LoginSchema } from 'features/auth/schemas/loginSchema';
import FirebaseErrors from 'features/auth/firebaseErrors';

const initialState: AuthState = {
  user: null,
  status: 'IDLE',
  error: {
    server: false,
    invalidCredentials: false,
  },
};

function isRejectedAction(action: PayloadAction<SerializedError, string>) {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending');
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  ({ email, password }: LoginSchema) =>
    createUserWithEmailAndPassword(auth, email, password)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  ({ email, password }: LoginSchema) =>
    signInWithEmailAndPassword(auth, email, password)
);

export const logoutUser = createAsyncThunk('auth/logoutUser', () =>
  signOut(auth)
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<FirebaseUser | null>) {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email!,
          phoneNumber: action.payload.phoneNumber,
        };
      } else {
        state.user = null;
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.user = {
          uid: action.payload.user.uid,
          email: action.payload.user.email!,
          phoneNumber: action.payload.user.phoneNumber,
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.user = {
          uid: action.payload.user.uid,
          email: action.payload.user.email!,
          phoneNumber: action.payload.user.phoneNumber,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'SUCCESS';
        state.user = null;
      })
      .addMatcher(isPendingAction, (state) => {
        state.status = 'PENDING';
        state.error.server = false;
        state.error.invalidCredentials = false;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'ERROR';

        if (action.error.code === FirebaseErrors.UserNotFound) {
          state.error.invalidCredentials = true;
          state.error.server = false;
        } else {
          state.error.invalidCredentials = false;
          state.error.server = true;
        }
      });
  },
});

export const { resetAuthStatusAndErrors, setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsPendingAuth = (state: RootState) =>
  state.auth.status === 'PENDING';

export default authSlice.reducer;
