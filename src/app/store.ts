import authReducer from '@/features/auth/authSlice';
import { userLocalStorageMiddleware } from "@/middleware";
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import api from './services/api';

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'auth/registerUser/fulfilled',
            'auth/loginUser/fulfilled',
            'auth/logoutUser/pending',
            'auth/setUser',
          ],
          ignoredPaths: ['auth.user'],
        },
      }).concat(api.middleware, userLocalStorageMiddleware.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
