import { Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoggedForm = (props: {
  onSubmit: () => void,
  email: string | null
}) => {
  const { t } = useTranslation();
  const { onSubmit, email } = props;

  return (
    <>
      <Box>
        {`${t('auth.loggedInAs')} ${email}`}
      </Box>
      <Button
        variant="outlined"
        onClick={onSubmit}
      >
        {t('auth.logOut')}
      </Button>
    </>
  );
};
