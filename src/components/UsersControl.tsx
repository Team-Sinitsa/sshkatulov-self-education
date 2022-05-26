import {
  Box, Button, List, ListItem, ListItemText, TextField
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addUser, showhUsers, usersList } from '../reducers/usersSlice';
import { UsersStyles as styles } from '../styles/UsersStyles';
import { User } from '../types';

export function UsersControl() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<User>();
  const list = useAppSelector(usersList);

  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(addUser(data));
    reset();
  };

  return (
    <Box>
      <Box
        sx={styles.controls}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          label={t('users.controls.firstName')}
          {...register('firstName', {
            required: `${t('users.controls.firstName')} required`
          })}
          error={!!errors.firstName?.message}
          helperText={errors.firstName?.message}
        />
        <TextField
          variant="outlined"
          label={t('users.controls.lastName')}
          {...register('lastName', {
            required: `${t('users.controls.lastName')} required`
          })}
          error={!!errors.lastName?.message}
          helperText={errors.lastName?.message}
        />
        <Button
          variant="contained"
          type="submit"
        >
          {t('users.controls.addUser')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(showhUsers())}
        >
          {t('users.controls.fetchUsers')}
        </Button>
      </Box>
      <List>
        {list.map((u, index) => (
          <ListItem key={u.lastName + index}>
            <ListItemText primary={`${u.lastName}, ${u.firstName}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
