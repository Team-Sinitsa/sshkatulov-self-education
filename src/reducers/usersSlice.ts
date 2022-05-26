import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReducerStateStatus } from '../constants';
import { User } from '../types';
import { addNewUser, fetchUsers } from '../utils/firebase';

export interface UsersState {
  users: User[];
  status: ReducerStateStatus;
}

const initialState: UsersState = {
  users: [],
  status: ReducerStateStatus.IDLE
};

export const showhUsers = createAsyncThunk(
  'users/showUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: { firstName: string, lastName: string }) => {
    await addNewUser(user);
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(showhUsers.pending, (state) => {
        state.status = ReducerStateStatus.LOADING;
      })
      .addCase(showhUsers.fulfilled, (state, action) => {
        state.status = ReducerStateStatus.IDLE;
        state.users = action.payload as User[];
      })
      .addCase(showhUsers.rejected, (state) => {
        state.status = ReducerStateStatus.FAILED;
      })
      .addCase(addUser.pending, (state) => {
        state.status = ReducerStateStatus.LOADING;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = ReducerStateStatus.IDLE;
      })
      .addCase(addUser.rejected, (state) => {
        state.status = ReducerStateStatus.FAILED;
      });
  }
});

export const usersList = (state: RootState) => state.users.users;

export default usersSlice.reducer;
