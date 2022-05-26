import {
  Backdrop,
  CircularProgress,
  FormControl
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useAppDispatch } from '../app/hooks';
import { AuthMode } from '../constants';
import { setError } from '../reducers/loggerSlice';
import { AuthStyles as styles } from '../styles/AuthStyles';
import { Credentials, FirebaseApiError } from '../types';
import { getFirebaseSelector } from '../utils/selectors';
import { processFirebaseAuthError } from '../utils/stringUtils';
import { AnonymousForm } from './AuthControl/AnonymousForm';
import { LoggedForm } from './AuthControl/LoggedForm';
import { LoginSignupForm } from './AuthControl/LoginSignupForm';

export const AuthControl = () => {
  const firebase = useFirebase();
  const firebaseSelector = getFirebaseSelector();
  const [mode, setMode] = useState<AuthMode>(AuthMode.ANONYMOUS);
  const [isLoadind, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firebaseSelector.auth.email) setMode(AuthMode.LOGGED);
    else if (mode === AuthMode.LOGGED) setMode(AuthMode.ANONYMOUS);
  }, [firebaseSelector.auth.email]);

  const processAuth = async <T extends unknown>(action: (...args: string[]) => Promise<T>) => {
    setIsLoading(true);
    try {
      await action();
    } catch (e) {
      dispatch(setError((processFirebaseAuthError((e as FirebaseApiError).code))));
    }
    setIsLoading(false);
  };

  const login = async (credentials: Credentials) => {
    processAuth(async () => {
      await firebase.login(credentials);
    });
  };

  const logout = () => {
    firebase.logout();
  };

  const signup = async (credentials: Credentials) => {
    processAuth(async () => {
      await firebase.createUser(credentials);
    });
  };

  return (
    <FormControl sx={styles.controls}>
      <Backdrop open={isLoadind}>
        <CircularProgress />
      </Backdrop>
      {mode === AuthMode.ANONYMOUS && <AnonymousForm setMode={setMode} />}
      {mode === AuthMode.LOGGED && (
        <LoggedForm
          onSubmit={logout}
          email={firebaseSelector.auth.email}
        />
      )}
      {mode === AuthMode.LOG_IN && (
        <LoginSignupForm
          onSubmit={login}
          onBack={() => setMode(AuthMode.ANONYMOUS)}
        />
      )}
      {mode === AuthMode.SIGN_UP && (
        <LoginSignupForm
          onSubmit={signup}
          onBack={() => setMode(AuthMode.ANONYMOUS)}
          isSignup
        />
      )}
    </FormControl>
  );
};
