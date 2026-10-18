import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";

const AUTH_STORAGE_KEY = "eventra_auth";
const REGISTRATIONS_STORAGE_KEY = "eventra_registrations";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registrations: registrationsReducer,
  },
});

store.subscribe(() => {
  try {
    const { auth, registrations } = store.getState();

    if (auth.isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    localStorage.setItem(
      REGISTRATIONS_STORAGE_KEY,
      JSON.stringify(registrations),
    );
  } catch (error) {
    console.error("Unable to save Eventra data:", error);
  }
});
