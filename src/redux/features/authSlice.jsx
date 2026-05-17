import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/api";



const storedUser =
  JSON.parse(
    localStorage.getItem("user")
  );

const storedToken =
  localStorage.getItem("token");



export const login =
  createAsyncThunk(
    "auth/login",

    async (
      userData,
      thunkAPI
    ) => {
      try {

        const response =
          await API.post(
            "/auth/login",
            userData
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



export const signup =
  createAsyncThunk(
    "auth/signup",

    async (
      userData,
      thunkAPI
    ) => {
      try {

        const response =
          await API.post(
            "/auth/register",
            userData
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



const initialState = {

  user: storedUser || null,

  token: storedToken || null,

  isAuthenticated:
    !!storedToken,

  loading: false,

  error: null,

  success: null,
};



const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    logout: (state) => {

      state.user = null;

      state.token = null;

      state.isAuthenticated =
        false;

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );
    },


    clearMessages: (state) => {

      state.error = null;

      state.success = null;
    },


    updateProfilePhoto: (
      state,
      action
    ) => {

      if (state.user) {

        state.user.profileImage =
          action.payload;

        localStorage.setItem(
          "user",

          JSON.stringify(
            state.user
          )
        );
      }
    },
  },


  
  extraReducers: (builder) => {

    builder

    
      .addCase(
        login.pending,

        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        login.fulfilled,

        (state, action) => {

          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.isAuthenticated =
            true;

          state.success =
            action.payload.message;
        }
      )

      .addCase(
        login.rejected,

        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )


      .addCase(
        signup.pending,

        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        signup.fulfilled,

        (state, action) => {

          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.isAuthenticated =
            true;

          state.success =
            action.payload.message;
        }
      )

      .addCase(
        signup.rejected,

        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});



export const {
  logout,
  clearMessages,
  updateProfilePhoto,
} = authSlice.actions;

export default authSlice.reducer;