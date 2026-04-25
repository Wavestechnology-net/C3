// src/core/data/redux/slices/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  expiresAt?: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
        expiresAt: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.expiresAt = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const loggedUser = (state: RootState) => state.auth.user

export default authSlice.reducer;
