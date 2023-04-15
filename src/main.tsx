import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getProducts } from 'features/products/productsSlice';
import { setupStore } from './app/store';
import './index.css';

import { AppWithRouter } from './App';

const store = setupStore();

store.dispatch(getProducts());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  </React.StrictMode>
);
