import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { AuthMode } from '../constants';
import { AuthStyles as styles } from '../styles/AuthStyles';
import { Credentials, FirebaseApiError, FirebaseState } from '../types';
import { processFirebaseAuthError } from '../utils/stringUtils';
import { AnonymousForm } from './AuthControl/AnonymousForm';
import { LoggedForm } from './AuthControl/LoggedForm';
import { LoginSignupForm } from './AuthControl/LoginSignupForm';

export const AuthControl = () => {
  const firebase = useFirebase();
  const getAuth = (state: RootState) => (state.firebase as FirebaseState).auth;
  const auth = useAppSelector(getAuth);
  const [mode, setMode] = useState<AuthMode>(AuthMode.ANONYMOUS);
  const [error, setError] = useState<string | null>(null);
  const [isLoadind, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.email) setMode(AuthMode.LOGGED);
    else if (mode === AuthMode.LOGGED) setMode(AuthMode.ANONYMOUS);
  }, [auth.email]);

  useEffect(() => {
    setError(null);
  }, [mode]);

  const processAuth = async <T extends unknown>(action: (...args: string[]) => Promise<T>) => {
    setIsLoading(true);
    try {
      await action();
    } catch (e) {
      setError(processFirebaseAuthError((e as FirebaseApiError).code));
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
      {error && <Alert severity="error">{error}</Alert>}
      {mode === AuthMode.ANONYMOUS && <AnonymousForm setMode={setMode} />}
      {mode === AuthMode.LOGGED && (
        <LoggedForm
          onSubmit={logout}
          email={auth.email}
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
