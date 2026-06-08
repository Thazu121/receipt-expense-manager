import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: true,
  notifications: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    // ---------------- TOGGLE NOTIFICATIONS ----------------
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
addNotification: (state, action) => {
  if (!state.notificationsEnabled) return;

  state.notifications.unshift({
    id: action.payload.id || Date.now().toString(),
    title: action.payload.title,
    message: action.payload.message,
    type: action.payload.type || "info",
    read: false,
    createdAt: action.payload.createdAt || new Date().toISOString(),
  });
},

    // ---------------- MARK SINGLE AS READ ----------------
    markAsRead: (state, action) => {
      const notif = state.notifications.find(
        (n) => n.id === action.payload
      );

      if (notif) {
        notif.read = true;
      }
    },

    // ---------------- MARK ALL AS READ ----------------
    markAllRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },

    // ---------------- DELETE SINGLE NOTIFICATION ----------------
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },

    // ---------------- CLEAR ALL ----------------
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // ---------------- RESET ----------------
    resetSettings: () => initialState,
  },
});

export const {
  toggleNotifications,
  addNotification,
  markAsRead,
  markAllRead,
  deleteNotification,
  clearNotifications,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;