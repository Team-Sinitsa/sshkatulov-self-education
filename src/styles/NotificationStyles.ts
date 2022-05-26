import { Theme } from '@mui/material';

export const NotificationStyles = {
  anchorPosition: {
    top: 10,
    left: 10
  },
  '& .MuiTypography-root': {
    padding: '8px',
    background: (theme: Theme) => theme.palette.error.light
  }
};
