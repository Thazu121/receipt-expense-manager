import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: true,
  currency: "INR",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    toggleNotifications: (state) => {
      state.notificationsEnabled =
        !state.notificationsEnabled;
    },

    setCurrency: (state, action) => {
      state.currency = action.payload || "INR";
    },

    resetSettings: () => initialState,
  },
});

export const {
  toggleNotifications,
  setCurrency,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;