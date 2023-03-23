/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  Action,
  AnyAction,
} from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import auth from 'firebaseConfig';

export interface UserLoginData {
  email: string;
  password: string;
}

enum RequestStatuses {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

interface AuthState {
  user: UserCredential | null;
  status: RequestStatuses;
  errorMessage: string;
}

const initialState: AuthState = {
  user: null,
  status: RequestStatuses.IDLE,
  errorMessage: '',
};

// interface RejectedAction extends Action {
//   error: Error;
// }

// function isRejectedAction(action: AnyAction): action is RejectedAction {
//   return action.type.endsWith('rejected');
// }

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
  async ({ email, password }: UserLoginData) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.status = RequestStatuses.PENDING;
      state.errorMessage = '';
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      state.status = RequestStatuses.SUCCESS;
      state.errorMessage = '';
      state.user = action.payload;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      console.log(action);
      state.status = RequestStatuses.ERROR;
      state.errorMessage = action.error.code || '';
    });
  },
});

export default authSlice.reducer;
