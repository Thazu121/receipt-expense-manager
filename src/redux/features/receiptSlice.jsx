import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";



/* =========================================
   GET TOKEN
========================================= */

const token =
  localStorage.getItem("token");



/* =========================================
   AXIOS AUTH HEADER
========================================= */

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});



/* =========================================
   FETCH RECEIPTS
========================================= */

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
          error.response?.data?.message ||
            "Failed to fetch receipts"
        );
      }
    }
  );



/* =========================================
   ADD RECEIPT
========================================= */

export const addReceipt =
  createAsyncThunk(
    "receipt/addReceipt",

    async (receiptData, thunkAPI) => {
      try {

        const formData =
          new FormData();

        Object.keys(receiptData)
          .forEach((key) => {
            formData.append(
              key,
              receiptData[key]
            );
          });

        const response =
          await API.post(
            "/receipts/upload",
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        return response.data.receipt;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to upload receipt"
        );
      }
    }
  );



/* =========================================
   UPDATE RECEIPT
========================================= */

export const updateReceipt =
  createAsyncThunk(
    "receipt/updateReceipt",

    async (
      { id, updates },
      thunkAPI
    ) => {
      try {

        const response =
          await API.put(
            `/receipts/${id}`,
            updates,
            authConfig()
          );

        return response.data.receipt;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update receipt"
        );
      }
    }
  );



/* =========================================
   DELETE RECEIPT
========================================= */

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
          error.response?.data?.message ||
            "Failed to delete receipt"
        );
      }
    }
  );



/* =========================================
   TOGGLE STATUS
========================================= */

export const toggleStatus =
  createAsyncThunk(
    "receipt/toggleStatus",

    async (receipt, thunkAPI) => {
      try {

        let newStatus =
          receipt.status === "Pending"
            ? "Verified"
            : receipt.status ===
              "Verified"
            ? "Rejected"
            : "Pending";

        const response =
          await API.put(
            `/receipts/${receipt._id}`,
            {
              status: newStatus,
            },
            authConfig()
          );

        return response.data.receipt;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update status"
        );
      }
    }
  );



/* =========================================
   SLICE
========================================= */

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

      clearError: (state) => {
        state.error = null;
      },

      clearSuccess: (state) => {
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



    extraReducers: (builder) => {

      builder



        /* FETCH */

        .addCase(
          fetchReceipts.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchReceipts.fulfilled,
          (state, action) => {
            state.loading = false;
            state.receipts =
              action.payload;
          }
        )

        .addCase(
          fetchReceipts.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )



        /* ADD */

        .addCase(
          addReceipt.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          addReceipt.fulfilled,
          (state, action) => {
            state.loading = false;

            state.receipts.unshift(
              action.payload
            );

            state.success =
              "Receipt uploaded successfully";
          }
        )

        .addCase(
          addReceipt.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )



        /* UPDATE */

        .addCase(
          updateReceipt.fulfilled,
          (state, action) => {

            const index =
              state.receipts.findIndex(
                (r) =>
                  r._id ===
                  action.payload._id
              );

            if (index !== -1) {
              state.receipts[index] =
                action.payload;
            }

            state.success =
              "Receipt updated successfully";
          }
        )



        /* DELETE */

        .addCase(
          deleteReceipt.fulfilled,
          (state, action) => {

            state.receipts =
              state.receipts.filter(
                (r) =>
                  r._id !==
                  action.payload
              );
          }
        )



        /* TOGGLE STATUS */

        .addCase(
          toggleStatus.fulfilled,
          (state, action) => {

            const index =
              state.receipts.findIndex(
                (r) =>
                  r._id ===
                  action.payload._id
              );

            if (index !== -1) {
              state.receipts[index] =
                action.payload;
            }
          }
        );
    },
  });



/* =========================================
   SELECTOR
========================================= */

export const selectFilteredReceipts =
  createSelector(
    [(state) => state.receipt],

    ({
      receipts,
      search,
      statusFilter,
      categoryFilter,
      sortBy,
    }) => {

      let data =
        receipts.filter((r) => {

          const matchesSearch =
            r.merchantName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            statusFilter === "All" ||
            r.status === statusFilter;

          const matchesCategory =
            categoryFilter === "All" ||
            r.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
          );
        });



      if (sortBy === "Newest") {
        data.sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(a.createdAt)
        );
      }

      if (sortBy === "Oldest") {
        data.sort(
          (a, b) =>
            new Date(
              a.createdAt
            ) -
            new Date(b.createdAt)
        );
      }

      if (
        sortBy ===
        "Amount High-Low"
      ) {
        data.sort(
          (a, b) =>
            b.extractedAmount -
            a.extractedAmount
        );
      }

      if (
        sortBy ===
        "Amount Low-High"
      ) {
        data.sort(
          (a, b) =>
            a.extractedAmount -
            b.extractedAmount
        );
      }

      return data;
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