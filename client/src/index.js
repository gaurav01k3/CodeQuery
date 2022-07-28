import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './store.js';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

