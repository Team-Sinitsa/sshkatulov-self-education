import {
  Alert,
  Backdrop,
  Box, Button, CircularProgress, FormControl, TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFirebase } from 'react-redux-firebase';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { AuthMode } from '../constants';
import { AuthStyles as styles } from '../styles/AuthStyles';
import { FirebaseApiError, FirebaseState } from '../types';

const AnonymousForm = (props: {
  setMode: (mode: AuthMode) => void
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        sx={styles.marginSide}
        variant="outlined"
        onClick={() => props.setMode(AuthMode.LOG_IN)}
      >
        {t('auth.logIn')}
      </Button>
      <Button
        sx={styles.marginSide}
        variant="contained"
        onClick={() => props.setMode(AuthMode.SIGN_UP)}
      >
        {t('auth.signUp')}
      </Button>
    </>
  );
};

const LoggedForm = (props: {
  onSubmit: (...args: string[]) => void,
  email: string
}) => {
  const { t } = useTranslation();
  const { onSubmit, email } = props;

  return (
    <>
      <Box
        sx={styles.marginSide}
      >
        {`${t('auth.loggedInAs')} ${email}`}
      </Box>
      <Button
        sx={styles.marginSide}
        variant="outlined"
        onClick={() => onSubmit()}
      >
        {t('auth.logOut')}
      </Button>
    </>
  );
};

const LoginSignupForm = (props: {
  onSubmit: (...args: string[]) => void,
  onBack: () => void,
  isSignup?: boolean
}) => {
  const { onSubmit, onBack, isSignup } = props;
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <TextField
        sx={styles.marginSide}
        variant="outlined"
        label={t('auth.email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={styles.marginSide}
        variant="outlined"
        type="password"
        label={t('auth.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        sx={styles.marginSide}
        variant="contained"
        onClick={() => onSubmit(email, password)}
        disabled={!email || !password}
      >
        {isSignup ? t('auth.signUp') : t('auth.logIn')}
      </Button>
      <Button
        sx={styles.marginSide}
        variant="outlined"
        onClick={() => onBack()}
      >
        {t('auth.back')}
      </Button>
    </>
  );
};

LoginSignupForm.defaultProps = {
  isSignup: false
};

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

  const handleFirebaseAuthError = (e: string) => {
    const errorFromResonse = e?.replace('auth/', '')?.replaceAll('-', ' ')?.trim().toUpperCase();
    setError(errorFromResonse ?? 'Unknown error');
  };

  const processAuth = async <T extends unknown>(action: (...args: string[]) => Promise<T>) => {
    setIsLoading(true);
    try {
      await action();
    } catch (e) {
      handleFirebaseAuthError((e as FirebaseApiError).code);
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    processAuth(async () => {
      await firebase.login({ email, password });
    });
  };

  const logout = () => {
    firebase.logout();
  };

  const signup = async (email: string, password: string) => {
    processAuth(async () => {
      await firebase.createUser({ email, password });
    });
  };

  return (
    <FormControl
      sx={styles.controls}
    >
      <Backdrop open={isLoadind}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && <Alert sx={styles.alignCenter} severity="error">{error}</Alert>}
      {mode === AuthMode.ANONYMOUS && <AnonymousForm setMode={setMode} />}
      {mode === AuthMode.LOGGED && <LoggedForm onSubmit={logout} email={auth.email ?? ''} />}
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
