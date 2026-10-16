import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  try {
    const authState = store.getState().auth;

    if (authState.isAuthenticated && authState.user) {
      localStorage.setItem("eventra_auth", JSON.stringify(authState));
    } else {
      localStorage.removeItem("eventra_auth");
    }
  } catch (error) {
    console.error("Could not save authentication state:", error);
  }
});
