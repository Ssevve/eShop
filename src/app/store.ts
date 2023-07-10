import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import cartReducer from 'features/cart/cartSlice';
import apiSlice from 'features/api/apiSlice';
import {cartLocalStorageMiddleware, userLocalStorageMiddleware} from "./middleware";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
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
      }).concat(apiSlice.middleware, cartLocalStorageMiddleware.middleware, userLocalStorageMiddleware.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
