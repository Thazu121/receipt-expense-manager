import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// ---------------- HELPERS ----------------
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const getToken = () => localStorage.getItem("token") || null;

const handleError = (err, thunkAPI, msg) =>
  thunkAPI.rejectWithValue(
    err.response?.data?.message || msg
  );

// ---------------- INITIAL STATE ----------------
const initialState = {
  user: getUser(),
  token: getToken(),
  isAuthenticated: !!getToken(),

  loading: false,
  error: null,
  success: null,
};

// ---------------- AUTH THUNKS ----------------

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return handleError(err, thunkAPI, "Login failed");
    }
  }
);

// SIGNUP
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      return handleError(err, thunkAPI, "Signup failed");
    }
  }
);

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/forgot-password", data);
      return res.data.message;
    } catch (err) {
      return handleError(err, thunkAPI, "Forgot password failed");
    }
  }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/reset-password", data);
      return res.data.message;
    } catch (err) {
      return handleError(err, thunkAPI, "Reset password failed");
    }
  }
);

// UPDATE USERNAME
export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async (name, thunkAPI) => {
    try {
      const res = await API.put("/auth/profile", { name });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (err) {
      return handleError(err, thunkAPI, "Update failed");
    }
  }
);

// CHANGE PASSWORD (FIXED ERROR HANDLING)
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.put("/auth/change-password", data);
      return res.data.message;
    } catch (err) {
      return handleError(err, thunkAPI, "Password change failed");
    }
  }
);

// UPDATE PROFILE PHOTO
export const updateProfilePhoto = createAsyncThunk(
  "auth/updateProfilePhoto",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await API.put("/auth/profile-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (err) {
      return handleError(err, thunkAPI, "Photo upload failed");
    }
  }
);

// DELETE ACCOUNT
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const res = await API.delete("/auth/delete-account");

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return res.data.message;
    } catch (err) {
      return handleError(err, thunkAPI, "Delete failed");
    }
  }
);

// ---------------- SLICE ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------------- LOGIN ----------------
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- SIGNUP ----------------
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.success = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- FORGOT PASSWORD ----------------
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- RESET PASSWORD ----------------
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE USERNAME ----------------
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = "Username updated";
        state.error = null;
      })

      // ---------------- CHANGE PASSWORD (FIXED) ----------------
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 👈 "Current password incorrect"
        state.success = null;
      })

      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
  state.user = action.payload;
  state.success = "Profile updated";
  state.error = null;

  localStorage.setItem("user", JSON.stringify(action.payload));
})

      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.success = action.payload;
        state.error = null;
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;