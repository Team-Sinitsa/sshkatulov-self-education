import {
  Box, Button, List, ListItem, ListItemText, TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addUser, showhUsers, usersList } from './usersSlice';
import { UsersStyles as styles } from '../../styles/UsersStyles';

export function UsersControl() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const list = useAppSelector(usersList);

  return (
    <Box>
      <Box sx={styles.controls}>
        <TextField
          variant="outlined"
          sx={styles.marginAround}
          label={t('users.controls.firstName')}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          variant="outlined"
          sx={styles.marginAround}
          label={t('users.controls.lastName')}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={styles.marginAround}
          onClick={() => {
            dispatch(addUser({ firstName, lastName }));
            setFirstName('');
            setLastName('');
          }}
          disabled={(!firstName || !lastName)}
        >
          {t('users.controls.addUser')}
        </Button>
        <Button
          variant="outlined"
          sx={styles.marginAround}
          onClick={() => dispatch(showhUsers())}
        >
          {t('users.controls.fetchUsers')}
        </Button>
      </Box>
      <List>
        {list.map((u) => (
          <ListItem key={`${u.lastName}, ${u.firstName}`}>
            <ListItemText primary={`${u.lastName}, ${u.firstName}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
