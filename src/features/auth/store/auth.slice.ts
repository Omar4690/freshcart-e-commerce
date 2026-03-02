import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id?: string;
  name: string;
  email?: string; 
  role: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  userName: string | null;
  email: string | null; 
  userInfo: null | User;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userName: null,
  email: null, 
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.userName = action.payload.user.name;
      state.email = action.payload.user.email || null;
    },

    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.userName = null;
      state.email = null; 
    },

    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
      state.userName = action.payload.userInfo?.name || null;
      state.email = action.payload.userInfo?.email || null; 
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setCredentials, logoutAction, setAuthInfo } = authSlice.actions;