import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("currentUser"),
    user: JSON.parse(localStorage.getItem("currentUser")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("currentUser");
    },
       changePassword: (state, action) => {
      const { currentPassword, newPassword } = action.payload;

      if (!state.user) return;

      if (state.user.password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }

      state.user.password = newPassword;

      localStorage.setItem("currentUser", JSON.stringify(state.user));

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = users.map((u) =>
        u.email === state.user.email
          ? { ...u, password: newPassword }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    },
      updateName: (state, action) => {
      if (state.user) {
        state.user.name = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.user));
      }
    },
       updatePassword: (state, action) => {
      if (state.user) {
        state.user.password = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.user));
      }
    }

  },
  
  
});

export const { login, logout,changePassword ,updateName,updatePassword} = authSlice.actions;
export default authSlice.reducer;
