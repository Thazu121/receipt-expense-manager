import { createSlice } from "@reduxjs/toolkit";


const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));

const storedUser = getCurrentUser();

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

      if (!name || !email || !password) {
        state.error = "All fields are required";
        return;
      }

      if (password.length < 6) {
        state.error = "Password must be at least 6 characters";
        return;
      }

      const users = getUsers();

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

      const users = getUsers();

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
      state.success = "Login successful";
    },


    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },

 
    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;

      state.error = null;
      state.success = null;

      const users = getUsers();
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        state.error = "User not found";
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        state.error = "Password must be at least 6 characters";
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      state.success = "Password updated successfully";
    },

   
    changePassword: (state, action) => {
      const { currentPassword, newPassword } = action.payload;

      state.error = null;
      state.success = null;

      if (!state.user) {
        state.error = "User not logged in";
        return;
      }

      if (state.user.password !== currentPassword) {
        state.error = "Current password is incorrect";
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        state.error = "New password must be at least 6 characters";
        return;
      }

      const users = getUsers();
      const userIndex = users.findIndex(
        (u) => u.email === state.user.email
      );

      if (userIndex === -1) {
        state.error = "User not found";
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      const updatedUser = {
        ...state.user,
        password: newPassword,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      state.user = updatedUser;
      state.success = "Password changed successfully";
    },

   
    updateUsername: (state, action) => {
      const { newName } = action.payload;

      state.error = null;
      state.success = null;

      if (!state.user) {
        state.error = "User not logged in";
        return;
      }

      if (!newName || newName.trim().length < 3) {
        state.error = "Username must be at least 3 characters";
        return;
      }

      const users = getUsers();
      const userIndex = users.findIndex(
        (u) => u.email === state.user.email
      );

      if (userIndex === -1) {
        state.error = "User not found";
        return;
      }

      users[userIndex].name = newName.trim();
      localStorage.setItem("users", JSON.stringify(users));

      const updatedUser = {
        ...state.user,
        name: newName.trim(),
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      state.user = updatedUser;
      state.success = "Username updated successfully";
    },
 
    deleteAccount: (state) => {
      state.error = null;
      state.success = null;

      if (!state.user) {
        state.error = "User not logged in";
        return;
      }

      const users = getUsers();

      const updatedUsers = users.filter(
        (u) => u.email !== state.user.email
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("currentUser");

      state.user = null;
      state.isAuthenticated = false;

      state.success = "Account deleted successfully";
    },

   
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    updateProfilePhoto: (state, action) => {
  if (state.user) {
    state.user.photo = action.payload;
  }
},

  },
});

export const {
  signup,
  login,
  logout,
  resetPassword,
  changePassword,
  updateUsername,
  deleteAccount,
  updateProfilePhoto,
  clearMessages,
} = authSlice.actions;

export default authSlice.reducer;
