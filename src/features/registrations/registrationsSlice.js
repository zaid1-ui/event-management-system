import { createSlice } from "@reduxjs/toolkit";

function loadRegistrations() {
  try {
    const saved = localStorage.getItem("eventra_registrations");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: loadRegistrations(),

  reducers: {
    registerEvent: (state, action) => {
      const { email, event } = action.payload;
      const userEmail = email?.trim().toLowerCase();

      if (!userEmail || !event?.id) return;

      if (!state[userEmail]) {
        state[userEmail] = [];
      }

      const exists = state[userEmail].some(
        (registeredEvent) => registeredEvent.id === event.id,
      );

      if (!exists) {
        state[userEmail].push(event);
      }
    },

    cancelRegistration: (state, action) => {
      const { email, eventId } = action.payload;
      const userEmail = email?.trim().toLowerCase();

      if (!userEmail || !state[userEmail]) return;

      state[userEmail] = state[userEmail].filter(
        (event) => event.id !== eventId,
      );
    },
  },
});

export const { registerEvent, cancelRegistration } = registrationsSlice.actions;

export default registrationsSlice.reducer;
