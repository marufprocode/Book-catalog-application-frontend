import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface AuthState {
  user: Record<string, unknown> | null,
  accessToken: string | null,
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    addToken: (state, action: PayloadAction<Record<string, string>>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('auth')
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, addToken, logout } = authSlice.actions
// auth selector
export const selectAuth = (state:RootState) => state.auth; 

export default authSlice.reducer;
