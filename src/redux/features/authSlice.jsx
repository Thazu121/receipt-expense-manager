import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const getUser = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      null
    );
  } catch {
    return null;
  }
};

const handleError = (err, thunkAPI, msg) =>
  thunkAPI.rejectWithValue(
    err.response?.data?.message || msg
  );

const initialState = {
  user: getUser(),
  isAuthenticated: !!getUser(),

  loading: false,
  error: null,
  success: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Login failed"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(
        "/auth/register",
        data
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Signup failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.post("/auth/logout");

      localStorage.removeItem("user");

      return res.data.message;
    } catch (err) {
      localStorage.removeItem("user");

      return handleError(
        err,
        thunkAPI,
        "Logout failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(
        "/auth/forgot-password",
        data
      );

      return res.data.message;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Forgot password failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.post(
        "/auth/reset-password",
        data
      );

      return res.data.message;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Reset password failed"
      );
    }
  }
);

export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async (name, thunkAPI) => {
    try {
      const res = await API.put("/auth/profile", {
        name,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data.user;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Update failed"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const res = await API.put(
        "/auth/change-password",
        data
      );

      return res.data.message;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Password change failed"
      );
    }
  }
);

export const updateProfilePhoto =
  createAsyncThunk(
    "auth/updateProfilePhoto",
    async (file, thunkAPI) => {
      try {
        const formData = new FormData();
        formData.append("photo", file);

        const res = await API.put(
          "/auth/profile-photo",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        return res.data.user;
      } catch (err) {
        return handleError(
          err,
          thunkAPI,
          "Photo upload failed"
        );
      }
    }
  );

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const res = await API.delete(
        "/auth/delete-account"
      );

      localStorage.removeItem("user");

      return res.data.message;
    } catch (err) {
      return handleError(
        err,
        thunkAPI,
        "Delete failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;

      localStorage.removeItem("user");
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = action.payload;
          state.error = null;
        }
      )
      .addCase(
        forgotPassword.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = null;
        }
      )

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = action.payload;
          state.error = null;
        }
      )
      .addCase(
        resetPassword.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = null;
        }
      )

      .addCase(updateUsername.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = "Username updated";
        state.error = null;
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = action.payload;
          state.error = null;
        }
      )
      .addCase(
        changePassword.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = null;
        }
      )

      .addCase(
        updateProfilePhoto.fulfilled,
        (state, action) => {
          state.user = action.payload;
          state.success = "Profile updated";
          state.error = null;
        }
      )

      .addCase(
        deleteAccount.fulfilled,
        (state, action) => {
          state.user = null;
          state.isAuthenticated = false;
          state.loading = false;
          state.success = action.payload;
          state.error = null;
        }
      );
  },
});

export const { logout, clearMessages } =
  authSlice.actions;

export default authSlice.reducer;