// src/services/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// A simplified user interface for Firebase Auth
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  // We will need to fetch the role from Firestore separately
  role?: string; 
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the user on login/state change
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    // We can add a reducer to update the user's role after fetching it
    setUserRole: (state, action: PayloadAction<string>) => {
        if (state.user) {
            state.user.role = action.payload;
        }
    },
    // The logout action will just clear the user
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setUser,
  setUserRole,
  logout,
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const loggedUser = (state: RootState) => state.auth.user

export default authSlice.reducer;
