import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types';
import { addNewUser, fetchUsers } from '../utils/firebase';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle'
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showhUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(showhUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload as User[];
      })
      .addCase(showhUsers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addUser.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const usersList = (state: RootState) => state.users.users;

export default usersSlice.reducer;
