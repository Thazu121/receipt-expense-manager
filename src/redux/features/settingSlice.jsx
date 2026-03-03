import { createSlice } from "@reduxjs/toolkit";



const getStoredSettings = () => {
  try {
    const raw = localStorage.getItem("settings");
    const data = raw ? JSON.parse(raw) : null;

    if (!data) {
      return {
        notificationsEnabled: true,
        notifications: [],
      };
    }

    return {
      notificationsEnabled:
        typeof data.notificationsEnabled === "boolean"
          ? data.notificationsEnabled
          : true,

      notifications: Array.isArray(data.notifications)
        ? data.notifications
        : [],
    };
  } catch {
    return {
      notificationsEnabled: true,
      notifications: [],
    };
  }
};

const initialState = getStoredSettings();



const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    addNotification: (state, action) => {
      if (!state.notificationsEnabled) return;

      state.notifications.unshift({
        id: Date.now(),
        message: action.payload,
        read: false,
      });

      localStorage.setItem("settings", JSON.stringify(state));
    },

    markAllRead: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));

      localStorage.setItem("settings", JSON.stringify(state));
    },

    clearNotifications: (state) => {
      state.notifications = [];
      localStorage.setItem("settings", JSON.stringify(state));
    },
  },
});

export const {
  toggleNotifications,
  addNotification,
  markAllRead,
  clearNotifications,
} = settingsSlice.actions;

export default settingsSlice.reducer;
