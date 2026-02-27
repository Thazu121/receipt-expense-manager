import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: localStorage.getItem("profileImage") || null,
  username: localStorage.getItem("username") || "SpendWise User",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
      localStorage.setItem("profileImage", action.payload);
    },
    removeProfileImage: (state) => {
      state.profileImage = null;
      localStorage.removeItem("profileImage");
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    logout: (state) => {
      state.profileImage = null;
      state.username = "SpendWise User";
      localStorage.clear();
    },
  },
});

export const {
  setProfileImage,
  removeProfileImage,
  setUsername,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
