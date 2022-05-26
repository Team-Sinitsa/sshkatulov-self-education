import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { store } from './app/store';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
