import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import cartReducer from 'features/cart/cartSlice';
import { api } from 'app/api';
import localStorageMiddleware from "./middleware/cartLocalStorageMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
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
      }).concat(api.middleware, localStorageMiddleware.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
