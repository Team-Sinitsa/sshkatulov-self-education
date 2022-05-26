import React from 'react';
import { Popover, Typography } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { setError } from '../reducers/loggerSlice';
import { getLoggerSelector } from '../utils/selectors';
import { NotificationStyles as styles } from '../styles/NotificationStyles';

export const Notification = () => {
  const loggerSelector = getLoggerSelector();
  const dispatch = useAppDispatch();

  const resetError = () => dispatch(setError(null));

  return (
    <Popover
      id="general-notification"
      open={!!loggerSelector.error}
      onClose={resetError}
      sx={styles}
    >
      <Typography>
        {loggerSelector.error}
      </Typography>
    </Popover>
  );
};
