import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/api";


export const fetchRecurring =
  createAsyncThunk(
    "recurring/fetchRecurring",
    async (_, thunkAPI) => {
      try {
        const res = await API.get(
          "/recurring"
        );

        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load recurring expenses"
        );
      }
    }
  );

// ================= CREATE =================

export const addRecurring =
  createAsyncThunk(
    "recurring/addRecurring",
    async (
      recurringData,
      thunkAPI
    ) => {
      try {
        const res = await API.post(
          "/recurring",
          recurringData
        );

        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create recurring expense"
        );
      }
    }
  );

// ================= UPDATE =================

export const updateRecurring =
  createAsyncThunk(
    "recurring/updateRecurring",
    async (
      { id, data },
      thunkAPI
    ) => {
      try {
        const res = await API.put(
          `/recurring/${id}`,
          data
        );

        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update recurring expense"
        );
      }
    }
  );

// ================= DELETE =================

export const deleteRecurring =
  createAsyncThunk(
    "recurring/deleteRecurring",
    async (id, thunkAPI) => {
      try {
        await API.delete(
          `/recurring/${id}`
        );

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete recurring expense"
        );
      }
    }
  );

// ================= TOGGLE =================

export const toggleRecurring =
  createAsyncThunk(
    "recurring/toggleRecurring",
    async (id, thunkAPI) => {
      try {
        const res = await API.patch(
          `/recurring/${id}/toggle`
        );

        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to toggle recurring expense"
        );
      }
    }
  );

// ================= SINGLE =================

export const getRecurringById =
  createAsyncThunk(
    "recurring/getRecurringById",
    async (id, thunkAPI) => {
      try {
        const res = await API.get(
          `/recurring/${id}`
        );

        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch recurring expense"
        );
      }
    }
  );

// ================= SLICE =================

const recurringSlice =
  createSlice({
    name: "recurring",

    initialState: {
      items: [],
      selectedItem: null,

      loading: false,
      creating: false,
      updating: false,
      deleting: false,

      success: false,
      error: null,
    },

    reducers: {
      clearRecurringError: (
        state
      ) => {
        state.error = null;
      },

      clearRecurringSuccess: (
        state
      ) => {
        state.success = false;
      },

      clearSelectedRecurring: (
        state
      ) => {
        state.selectedItem = null;
      },
    },

    extraReducers: (
      builder
    ) => {
      builder

        // FETCH

        .addCase(
          fetchRecurring.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchRecurring.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.items =
              action.payload || [];
          }
        )

        .addCase(
          fetchRecurring.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )

        // ADD

        .addCase(
          addRecurring.pending,
          (state) => {
            state.creating = true;
          }
        )

        .addCase(
          addRecurring.fulfilled,
          (
            state,
            action
          ) => {
            state.creating = false;
            state.success = true;

            state.items.unshift(
              action.payload
            );
          }
        )

        .addCase(
          addRecurring.rejected,
          (
            state,
            action
          ) => {
            state.creating = false;
            state.error =
              action.payload;
          }
        )

        // UPDATE

        .addCase(
          updateRecurring.pending,
          (state) => {
            state.updating = true;
          }
        )

        .addCase(
          updateRecurring.fulfilled,
          (
            state,
            action
          ) => {
            state.updating = false;
            state.success = true;

            const index =
              state.items.findIndex(
                (item) =>
                  item._id ===
                  action.payload._id
              );

            if (
              index !== -1
            ) {
              state.items[
                index
              ] =
                action.payload;
            }
          }
        )

        .addCase(
          updateRecurring.rejected,
          (
            state,
            action
          ) => {
            state.updating = false;
            state.error =
              action.payload;
          }
        )

        // DELETE

        .addCase(
          deleteRecurring.pending,
          (state) => {
            state.deleting = true;
          }
        )

        .addCase(
          deleteRecurring.fulfilled,
          (
            state,
            action
          ) => {
            state.deleting = false;

            state.items =
              state.items.filter(
                (item) =>
                  item._id !==
                  action.payload
              );
          }
        )

        .addCase(
          deleteRecurring.rejected,
          (
            state,
            action
          ) => {
            state.deleting = false;
            state.error =
              action.payload;
          }
        )

        // TOGGLE

        .addCase(
          toggleRecurring.fulfilled,
          (
            state,
            action
          ) => {
            const index =
              state.items.findIndex(
                (item) =>
                  item._id ===
                  action.payload._id
              );

            if (
              index !== -1
            ) {
              state.items[
                index
              ] =
                action.payload;
            }
          }
        )

        // SINGLE

        .addCase(
          getRecurringById.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          getRecurringById.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.selectedItem =
              action.payload;
          }
        )

        .addCase(
          getRecurringById.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        );
    },
  });

export const {
  clearRecurringError,
  clearRecurringSuccess,
  clearSelectedRecurring,
} = recurringSlice.actions;

export default recurringSlice.reducer;