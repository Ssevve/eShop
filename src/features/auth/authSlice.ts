/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  Action,
  ActionReducerMapBuilder,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User as FirebaseUser,
} from 'firebase/auth';
import { RootState } from 'app/store';
import auth from 'firebaseConfig';
import AuthState from 'types/AuthState';
import { LoginSchema } from 'features/auth/schemas/loginSchema';
import FirebaseErrors from 'features/auth/firebaseErrors';
import {
  AnyAsyncThunk,
  RejectedActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';

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
    setUser(state: AuthState, action: PayloadAction<FirebaseUser | null>) {
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
    resetAuthStatusAndErrors(state: AuthState) {
      state.status = 'IDLE';
      state.error.invalidCredentials = false;
      state.error.server = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state: AuthState, action: PayloadAction<UserCredential>) => {
          state.status = 'SUCCESS';
          state.user = {
            uid: action.payload.user.uid,
            email: action.payload.user.email!,
            phoneNumber: action.payload.user.phoneNumber,
          };
        }
      )
      .addCase(
        registerUser.fulfilled,
        (state: AuthState, action: PayloadAction<UserCredential>) => {
          state.status = 'SUCCESS';
          state.user = {
            uid: action.payload.user.uid,
            email: action.payload.user.email!,
            phoneNumber: action.payload.user.phoneNumber,
          };
        }
      )
      .addCase(logoutUser.fulfilled, (state: AuthState) => {
        state.status = 'SUCCESS';
        state.user = null;
      })
      .addMatcher(isPendingAction, (state: AuthState) => {
        state.status = 'PENDING';
        state.error.server = false;
        state.error.invalidCredentials = false;
      })
      .addMatcher(
        isRejectedAction,
        (
          state: AuthState,
          // TODO: look into more thunk actions
          action: RejectedActionFromAsyncThunk<AnyAsyncThunk>
        ) => {
          state.status = 'ERROR';

          if (action.error.code === FirebaseErrors.UserNotFound) {
            state.error.invalidCredentials = true;
            state.error.server = false;
          } else {
            state.error.invalidCredentials = false;
            state.error.server = true;
          }
        }
      );
  },
});

export const { resetAuthStatusAndErrors, setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
