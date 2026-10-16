import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "eventra_auth";

function loadAuth() {
  try {
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    return savedAuth
      ? JSON.parse(savedAuth)
      : { user: null, isAuthenticated: false };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

const initialState = loadAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
