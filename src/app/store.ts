import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { FirebaseReducer, firebaseReducer as firebase } from 'react-redux-firebase';

import logger, { LoggerState } from '../reducers/loggerSlice';
import users, { UsersState } from '../reducers/usersSlice';
import { FirebaseProfile } from '../types';

export const store = configureStore({
  reducer: {
    users,
    firebase,
    logger
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['@@reactReduxFirebase/LOGIN']
    }
  })
});

export interface RootState {
  users: UsersState
  firebase: FirebaseReducer.Reducer<FirebaseProfile>
  logger: LoggerState
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
