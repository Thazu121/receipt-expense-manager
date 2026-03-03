import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;

      state.error = null;
      state.success = null;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.find((u) => u.email === email);
      if (exists) {
        state.error = "User already exists";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      state.success = "Account created successfully";
    },

    login: (state, action) => {
      const { email, password } = action.payload;

      state.error = null;
      state.success = null;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        state.error = "Invalid email or password";
        return;
      }

      state.user = user;
      state.isAuthenticated = true;

      localStorage.setItem("currentUser", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },

    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        state.error = "User not found";
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      state.success = "Password updated successfully";
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  signup,
  login,
  logout,
  resetPassword,
  clearMessages,
} = authSlice.actions;

export default authSlice.reducer;
