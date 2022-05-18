import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthStyles as styles } from '../../styles/AuthStyles';
import { Credentials } from '../../types';

export const LoginSignupForm = (props: {
  onSubmit: (credentials: Credentials) => void,
  onBack: () => void,
  isSignup?: boolean
}) => {
  const { onSubmit, onBack, isSignup = false } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>();

  return (
    <Box
      sx={styles.controls}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        variant="outlined"
        label={t('auth.email')}
        {...register('email', {
          required: true
        })}
        error={!!errors.email}
      />
      <TextField
        variant="outlined"
        type="password"
        label={t('auth.password')}
        {...register('password', {
          required: true
        })}
        error={!!errors.password}
      />
      <Button
        variant="contained"
        type="submit"
      >
        {t(isSignup ? 'auth.signUp' : 'auth.logIn')}
      </Button>
      <Button
        variant="outlined"
        onClick={onBack}
      >
        {t('auth.back')}
      </Button>
    </Box>
  );
};
