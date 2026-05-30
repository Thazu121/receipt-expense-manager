import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const fetchReceipts =
  createAsyncThunk(
    "receipt/fetchReceipts",

    async (_, thunkAPI) => {
      try {
        const response =
          await API.get(
            "/receipts",
            authConfig()
          );

        return response.data.receipts;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to fetch receipts"
        );
      }
    }
  );

export const addReceipt =
  createAsyncThunk(
    "receipt/addReceipt",

    async (file, thunkAPI) => {
      try {
        const formData =
          new FormData();

        formData.append(
          "receipt",
          file
        );

        const response =
          await API.post(
            "/receipts/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to upload receipt"
        );
      }
    }
  );

export const deleteReceipt =
  createAsyncThunk(
    "receipt/deleteReceipt",

    async (id, thunkAPI) => {
      try {
        await API.delete(
          `/receipts/${id}`,
          authConfig()
        );

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to delete receipt"
        );
      }
    }
  );

const receiptSlice =
  createSlice({
    name: "receipt",

    initialState: {
      receipts: [],

      loading: false,

      error: null,

      success: null,

      search: "",

      statusFilter: "All",

      categoryFilter: "All",

      sortBy: "Newest",
    },

    reducers: {
      clearError: (
        state
      ) => {
        state.error = null;
      },

      clearSuccess: (
        state
      ) => {
        state.success = null;
      },

      setSearch: (
        state,
        action
      ) => {
        state.search =
          action.payload;
      },

      setStatusFilter: (
        state,
        action
      ) => {
        state.statusFilter =
          action.payload;
      },

      setCategoryFilter: (
        state,
        action
      ) => {
        state.categoryFilter =
          action.payload;
      },

      setSortBy: (
        state,
        action
      ) => {
        state.sortBy =
          action.payload;
      },
    },

    extraReducers: (
      builder
    ) => {
      builder

        .addCase(
          fetchReceipts.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchReceipts.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.receipts =
              action.payload;
          }
        )

        .addCase(
          fetchReceipts.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )

        .addCase(
          addReceipt.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          addReceipt.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.success =
              "Receipt uploaded successfully";

            if (
              action.payload
                .receipt
            ) {
              state.receipts.unshift(
                action.payload
                  .receipt
              );
            }
          }
        )

        .addCase(
          addReceipt.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )

        .addCase(
          deleteReceipt.fulfilled,
          (
            state,
            action
          ) => {
            state.receipts =
              state.receipts.filter(
                (receipt) =>
                  receipt._id !==
                  action.payload
              );
          }
        )

        .addCase(
          deleteReceipt.rejected,
          (
            state,
            action
          ) => {
            state.error =
              action.payload;
          }
        );
    },
  });

export const selectFilteredReceipts =
  createSelector(
    [
      (state) =>
        state.receipt,
    ],

    ({
      receipts,
      search,
      statusFilter,
      categoryFilter,
      sortBy,
    }) => {
      let filtered =
        receipts.filter(
          (receipt) => {
            const matchesSearch =
              !search ||
              receipt.merchantName
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesStatus =
              statusFilter ===
                "All" ||
              receipt.ocrStatus ===
                statusFilter;

            const matchesCategory =
              categoryFilter ===
                "All" ||
              receipt
                .extractedData
                ?.category ===
                categoryFilter;

            return (
              matchesSearch &&
              matchesStatus &&
              matchesCategory
            );
          }
        );

      switch (sortBy) {
        case "Newest":
          filtered.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
          );
          break;

        case "Oldest":
          filtered.sort(
            (a, b) =>
              new Date(
                a.createdAt
              ) -
              new Date(
                b.createdAt
              )
          );
          break;

        case "Amount High-Low":
          filtered.sort(
            (a, b) =>
              (b.extractedData
                ?.amount ||
                0) -
              (a.extractedData
                ?.amount ||
                0)
          );
          break;

        case "Amount Low-High":
          filtered.sort(
            (a, b) =>
              (a.extractedData
                ?.amount ||
                0) -
              (b.extractedData
                ?.amount ||
                0)
          );
          break;

        default:
          break;
      }

      return filtered;
    }
  );

export const {
  clearError,
  clearSuccess,
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
} = receiptSlice.actions;

export default receiptSlice.reducer;