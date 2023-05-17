import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
// import productsReducer from 'features/products/productsSlice';
import categoriesReducer from 'features/categories/categoriesSlice';
import { api } from 'services/api';

const rootReducer = combineReducers({
  auth: authReducer,
  // products: productsReducer,
  [api.reducerPath]: api.reducer,
  categories: categoriesReducer,
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
