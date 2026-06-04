import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

/* =========================
   AUTH HEADER
========================= */

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* =========================
   NORMALIZER (CRITICAL FIX)
========================= */

const normalizeReceipt = (r) => ({
  _id: r._id,

  image: r.imageUrl || "",

  store: r.store || r.merchantName || "Unknown Store",

  amount: r.amount ?? r.extractedAmount ?? 0,

  date: r.date
    ? new Date(r.date).toISOString().split("T")[0]
    : r.extractedDate
    ? new Date(r.extractedDate).toISOString().split("T")[0]
    : "",

  status: (r.status || r.ocrStatus || "pending")
    .toString()
    .toLowerCase(),

  category: r.category || "Other",

  createdAt: r.createdAt,

  confidence: r.confidenceScore || 0,

  verified: r.isVerified || false,
});

/* =========================
   FETCH RECEIPTS
========================= */

export const fetchReceipts = createAsyncThunk(
  "receipt/fetchReceipts",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/receipts", auth());
      return res.data.receipts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch receipts"
      );
    }
  }
);



export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("receipt", file);

      const res = await API.post("/receipts/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.receipt;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Upload failed"
      );
    }
  }
);



export const deleteReceipt = createAsyncThunk(
  "receipt/deleteReceipt",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/receipts/${id}`, auth());
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Delete failed"
      );
    }
  }
);


export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async ({ id, updates }, thunkAPI) => {
    try {
      const res = await API.put(`/receipts/${id}`, updates, auth());
      return res.data.receipt;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Update failed"
      );
    }
  }
);

/* =========================
   INITIAL STATE
========================= */

const initialState = {
  receipts: [],
  loading: false,
  error: null,

  search: "",
  statusFilter: "All",
  categoryFilter: "All",
  sortBy: "Newest",
};

/* =========================
   SLICE
========================= */

const receiptSlice = createSlice({
  name: "receipt",
  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },

    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = (action.payload || []).map(normalizeReceipt);
      })

      .addCase(fetchReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addReceipt.fulfilled, (state, action) => {
        state.receipts.unshift(normalizeReceipt(action.payload));
      })

      /* UPDATE */
      .addCase(updateReceipt.fulfilled, (state, action) => {
        const updated = normalizeReceipt(action.payload);

        const index = state.receipts.findIndex(
          (r) => r._id === updated._id
        );

        if (index !== -1) {
          state.receipts[index] = {
            ...state.receipts[index],
            ...updated,
          };
        }
      })

      /* DELETE */
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.receipts = state.receipts.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

/* =========================
   FILTERED SELECTOR (FIXED)
========================= */

export const selectFilteredReceipts = createSelector(
  [(state) => state.receipt],
  ({ receipts, search, statusFilter, categoryFilter, sortBy }) => {
    let list = [...receipts];

    /* SEARCH FIX */
    if (search) {
      const q = search.toLowerCase();

      list = list.filter((r) =>
        [r.store, r.category, r.status]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    /* STATUS FILTER */
    if (statusFilter !== "All") {
      list = list.filter(
        (r) =>
          (r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    /* CATEGORY FILTER */
    if (categoryFilter !== "All") {
      list = list.filter(
        (r) =>
          (r.category || "").toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    /* SORT */
    switch (sortBy) {
      case "Newest":
        list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "Oldest":
        list.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Amount High-Low":
        list.sort((a, b) => (b.amount || 0) - (a.amount || 0));
        break;

      case "Amount Low-High":
        list.sort((a, b) => (a.amount || 0) - (b.amount || 0));
        break;
    }

    return list;
  }
);

/* =========================
   EXPORTS
========================= */

export const {
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  clearError,
} = receiptSlice.actions;

export default receiptSlice.reducer;