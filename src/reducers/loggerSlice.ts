import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface LoggerState {
  error: string | null
}

const initialState: LoggerState = {
  error: null
};

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});
export const { setError } = loggerSlice.actions;

export const logger = (state: RootState) => state.logger.error;

export default loggerSlice.reducer;
