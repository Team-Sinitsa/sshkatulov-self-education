import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthMode } from '../../constants';

export const AnonymousForm = (props: {
  setMode: (mode: AuthMode) => void
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => props.setMode(AuthMode.LOG_IN)}
      >
        {t('auth.logIn')}
      </Button>
      <Button
        variant="contained"
        onClick={() => props.setMode(AuthMode.SIGN_UP)}
      >
        {t('auth.signUp')}
      </Button>
    </>
  );
};
