import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import { api } from 'app/services/products';

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
      }).concat(api.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
