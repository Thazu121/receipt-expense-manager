import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/notification", auth());
      return res.data.notifications || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notification/markNotificationRead",
  async (id, thunkAPI) => {
    try {
      await API.put(`/notification/${id}/read`, {}, auth());
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to mark read"
      );
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notification/markAllNotificationsRead",
  async (_, thunkAPI) => {
    try {
      await API.put("/notification/read-all", {}, auth());
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to mark all read"
      );
    }
  }
);

export const clearNotifications = createAsyncThunk(
  "notification/clearNotifications",
  async (_, thunkAPI) => {
    try {
      await API.delete("/notification/clear", auth());
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to clear notifications"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",

  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },

  reducers: {
    addRealtimeNotification: (state, action) => {
      const notification = action.payload;

      const id =
        notification._id ||
        notification.id ||
        Date.now().toString();

      const exists = state.notifications.some(
        (n) => n._id === id || n.id === id
      );

      if (!exists) {
        state.notifications.unshift({
          ...notification,
          id,
          read: notification.read || false,
          createdAt:
            notification.createdAt ||
            new Date().toISOString(),
        });
      }
    },

    clearNotificationError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n._id === action.payload || n.id === action.payload
        );

        if (notification) {
          notification.read = true;
        }
      })

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => {
          n.read = true;
        });
      })

      .addCase(clearNotifications.fulfilled, (state) => {
        state.notifications = [];
      });
  },
});

export const selectNotifications = (state) =>
  state.notification.notifications;

export const selectUnreadCount = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((n) => !n.read).length
);

export const {
  addRealtimeNotification,
  clearNotificationError,
} = notificationSlice.actions;

export default notificationSlice.reducer;