import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';

import usersReducer from '../reducers/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    firebase: firebaseReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
