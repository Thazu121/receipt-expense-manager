import { createSlice } from "@reduxjs/toolkit";

/* ================= GET CURRENT USER ================= */
const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: !!localStorage.getItem("currentUser"),
    user: getCurrentUser(),
  },

  reducers: {
    /* ================= LOGIN ================= */
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload)
      );
    },

    /* ================= LOGOUT ================= */
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("currentUser");
    },

    /* ================= CHANGE PASSWORD ================= */
    changePassword: (state, action) => {
      const { currentPassword, newPassword } = action.payload;

      if (!state.user) return;

      // Check current password
      if (state.user.password !== currentPassword) {
        throw new Error("Current password is incorrect.");
      }

      // Update password in current user
      state.user.password = newPassword;

      // Update currentUser in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify(state.user)
      );

      // Update password inside users list
      const users =
        JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = users.map((u) =>
        u.email === state.user.email
          ? { ...u, password: newPassword }
          : u
      );

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );
    },

    /* ================= UPDATE NAME ================= */
    updateName: (state, action) => {
      if (!state.user) return;

      state.user.name = action.payload;

      // Update currentUser
      localStorage.setItem(
        "currentUser",
        JSON.stringify(state.user)
      );

      // Update users list
      const users =
        JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = users.map((u) =>
        u.email === state.user.email
          ? { ...u, name: action.payload }
          : u
      );

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );
    },
  },
});

export const {
  login,
  logout,
  changePassword,
  updateName,
} = authSlice.actions;

export default authSlice.reducer;
