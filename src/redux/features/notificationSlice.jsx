import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const getNotificationId = (notification = {}) =>
  notification._id ||
  notification.id ||
  notification.uniqueKey;

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/notification");

      return res.data.notifications || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationRead =
  createAsyncThunk(
    "notification/markNotificationRead",
    async (id, thunkAPI) => {
      try {
        await API.put(
          `/notification/${id}/read`,
          {}
        );

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message ||
            "Failed to mark read"
        );
      }
    }
  );

export const markAllNotificationsRead =
  createAsyncThunk(
    "notification/markAllNotificationsRead",
    async (_, thunkAPI) => {
      try {
        await API.put(
          "/notification/read-all",
          {}
        );

        return true;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message ||
            "Failed to mark all read"
        );
      }
    }
  );

export const deleteNotification =
  createAsyncThunk(
    "notification/deleteNotification",
    async (id, thunkAPI) => {
      try {
        await API.delete(`/notification/${id}`);

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message ||
            "Failed to delete notification"
        );
      }
    }
  );

export const clearNotifications =
  createAsyncThunk(
    "notification/clearNotifications",
    async (_, thunkAPI) => {
      try {
        await API.delete(
          "/notification/clear"
        );

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
    addRealtimeNotification: (
      state,
      action
    ) => {
      const incoming = action.payload || {};
      const id = getNotificationId(incoming);

      const exists =
        state.notifications.some((n) => {
          const existingId =
            getNotificationId(n);

          return (
            existingId === id ||
            (incoming.uniqueKey &&
              n.uniqueKey ===
                incoming.uniqueKey)
          );
        });

      if (!exists) {
        state.notifications.unshift({
          ...incoming,
          id: id || Date.now().toString(),
          read: Boolean(incoming.read),
          createdAt:
            incoming.createdAt ||
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

      .addCase(
        fetchNotifications.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchNotifications.fulfilled,
        (state, action) => {
          state.loading = false;
          state.notifications =
            action.payload || [];
        }
      )

      .addCase(
        fetchNotifications.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        markNotificationRead.fulfilled,
        (state, action) => {
          const notification =
            state.notifications.find(
              (n) =>
                getNotificationId(n) ===
                action.payload
            );

          if (notification) {
            notification.read = true;
          }
        }
      )

      .addCase(
        markAllNotificationsRead.fulfilled,
        (state) => {
          state.notifications.forEach((n) => {
            n.read = true;
          });
        }
      )

      .addCase(
        deleteNotification.fulfilled,
        (state, action) => {
          state.notifications =
            state.notifications.filter(
              (n) =>
                getNotificationId(n) !==
                action.payload
            );
        }
      )

      .addCase(
        clearNotifications.fulfilled,
        (state) => {
          state.notifications = [];
        }
      );
  },
});

export const selectNotifications = (state) =>
  state.notification?.notifications || [];

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