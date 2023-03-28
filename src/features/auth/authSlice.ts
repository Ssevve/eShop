/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { RootState } from 'app/store';
import auth from 'firebaseConfig';
import { AuthState } from 'types/AuthState';
import { UserLoginData } from 'types/UserLoginData';

const initialState: AuthState = {
  user: null,
  status: 'IDLE',
  errorMessage: '',
};

function isRejectedAction(action: AnyAction) {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction) {
  return action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith('fulfilled');
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  ({ email, password }: UserLoginData) =>
    createUserWithEmailAndPassword(auth, email, password)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  ({ email, password }: UserLoginData) =>
    signInWithEmailAndPassword(auth, email, password)
);

export const logoutUser = createAsyncThunk('auth/logoutUser', () =>
  signOut(auth)
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addMatcher(isPendingAction, (state: AuthState) => {
      state.status = 'PENDING';
      state.errorMessage = '';
    });
    builder.addMatcher(isFulfilledAction, (state: AuthState, action) => {
      state.status = 'SUCCESS';
      state.errorMessage = '';
      state.user = action.payload?.user || null;
    });
    builder.addMatcher(isRejectedAction, (state: AuthState, action) => {
      state.status = 'ERROR';
      state.errorMessage = action.error.code || '';
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
