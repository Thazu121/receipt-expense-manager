import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: true,
  notifications: [],

  theme: "light",
  language: "en",

  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    // merge settings from backend if needed
    setSettings: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // ON/OFF notifications
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },

    // ✅ SOCKET: add notification from backend
    addNotification: (state, action) => {
      if (!state.notificationsEnabled) return;

      state.notifications.unshift({
        _id: action.payload._id || Date.now().toString(),
        title: action.payload.title,
        message: action.payload.message,
        isRead: action.payload.isRead ?? false,
        createdAt: action.payload.createdAt || new Date().toISOString(),
      });
    },

    // mark one notification as read
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );

      if (notification) {
        notification.isRead = true;
      }
    },

    // mark all as read
    markAllRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
    },

    // delete one notification
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },

    // clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // theme toggle
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    // reset everything
    resetSettings: () => initialState,
  },
});

export const {
  setSettings,
  toggleNotifications,
  addNotification,
  markAsRead,
  markAllRead,
  deleteNotification,
  clearNotifications,
  toggleTheme,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;