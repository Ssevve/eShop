import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import './index.css';

import { AppWithRouter } from './App';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  </React.StrictMode>
);
