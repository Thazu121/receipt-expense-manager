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
    setSettings: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },

    addNotification: (state, action) => {
      if (!state.notificationsEnabled) return;

      state.notifications.unshift({
        id: Date.now(),
        message: action.payload,
        read: false,
        createdAt: new Date().toISOString(),
      });
    },

    markAsRead: (state, action) => {
      const id = action.payload;

      const notification = state.notifications.find(
        (n) => n.id === id
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },

    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    resetSettings: () => initialState,
  },
});