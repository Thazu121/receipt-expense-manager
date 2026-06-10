import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const safeDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().split("T")[0];
};

const normalizeReceipt = (r = {}) => ({
  _id: r._id,

  image: r.imageUrl || r.image || "",

  store:
    r.merchantName ||
    r.store ||
    "Unknown Store",

  amount:
    r.extractedAmount ??
    r.amount ??
    0,

  date: safeDate(
    r.extractedDate ||
      r.date
  ),

  category:
    r.category ||
    "General",

  createdAt:
    r.createdAt ||
    new Date().toISOString(),

  confidence:
    r.confidenceScore ??
    r.confidence ??
    0,

  isVerified:
    Boolean(r.isVerified),

  status:
    r.isVerified
      ? "Verified"
      : "Pending",

  rawText:
    r.extractedText || "",
});

const dedupeReceipts = (receipts = []) => {
  const map = new Map();

  receipts.forEach((receipt) => {
    if (!receipt?._id) return;
    map.set(receipt._id, receipt);
  });

  return Array.from(map.values());
};

export const fetchReceipts = createAsyncThunk(
  "receipt/fetchReceipts",
  async (_, thunkAPI) => {
    try {
      const res = await API.get(
        "/receipts",
        auth()
      );

      return res.data.receipts || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch receipts"
      );
    }
  }
);

export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append(
        "receipt",
        file
      );

      const res = await API.post(
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

      return res.data.receipt;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Upload failed"
      );
    }
  }
);

export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async (
    { id, updates },
    thunkAPI
  ) => {
    try {
      const res = await API.put(
        `/receipts/${id}`,
        updates,
        auth()
      );

      return res.data.receipt;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Update failed"
      );
    }
  }
);

export const deleteReceipt = createAsyncThunk(
  "receipt/deleteReceipt",
  async (id, thunkAPI) => {
    try {
      await API.delete(
        `/receipts/${id}`,
        auth()
      );

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  }
);

const initialState = {
  receipts: [],
  loading: false,
  uploading: false,
  updating: false,
  deleting: false,
  error: null,
  success: null,

  search: "",
  statusFilter: "All",
  categoryFilter: "All",
  sortBy: "Newest",
};

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

    clearReceiptSuccess: (state) => {
      state.success = null;
    },

    resetReceiptFilters: (state) => {
      state.search = "";
      state.statusFilter = "All";
      state.categoryFilter = "All";
      state.sortBy = "Newest";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReceipts.fulfilled, (state, action) => {
        state.loading = false;

        state.receipts = dedupeReceipts(
          (action.payload || []).map(
            normalizeReceipt
          )
        );
      })

      .addCase(fetchReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addReceipt.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })

      .addCase(addReceipt.fulfilled, (state, action) => {
        state.uploading = false;

        const newReceipt =
          normalizeReceipt(action.payload);

        state.receipts = dedupeReceipts([
          newReceipt,
          ...state.receipts,
        ]);

        state.success =
          "Receipt uploaded successfully";
      })

      .addCase(addReceipt.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      .addCase(updateReceipt.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateReceipt.fulfilled, (state, action) => {
        state.updating = false;

        const updated =
          normalizeReceipt(action.payload);

        state.receipts = dedupeReceipts(
          state.receipts.map((receipt) =>
            receipt._id === updated._id
              ? updated
              : receipt
          )
        );

        state.success =
          "Receipt updated successfully";
      })

      .addCase(updateReceipt.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      .addCase(deleteReceipt.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })

      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.deleting = false;

        state.receipts =
          state.receipts.filter(
            (receipt) =>
              receipt._id !==
              action.payload
          );

        state.success =
          "Receipt deleted successfully";
      })

      .addCase(deleteReceipt.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const selectFilteredReceipts = createSelector(
  [(state) => state.receipt],
  ({
    receipts,
    search,
    statusFilter,
    categoryFilter,
    sortBy,
  }) => {
    let list = dedupeReceipts(
      receipts || []
    );

    if (search) {
      const q =
        search.toLowerCase();

      list = list.filter((r) =>
        [
          r.store,
          r.category,
          r.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (statusFilter !== "All") {
      list = list.filter(
        (r) =>
          r.status ===
          statusFilter
      );
    }

    if (categoryFilter !== "All") {
      list = list.filter(
        (r) =>
          String(r.category)
            .toLowerCase() ===
          String(categoryFilter)
            .toLowerCase()
      );
    }

    switch (sortBy) {
      case "Newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      case "Oldest":
        list.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "Amount High-Low":
        list.sort(
          (a, b) =>
            Number(b.amount || 0) -
            Number(a.amount || 0)
        );
        break;

      case "Amount Low-High":
        list.sort(
          (a, b) =>
            Number(a.amount || 0) -
            Number(b.amount || 0)
        );
        break;

      default:
        break;
    }

    return list;
  }
);

export const selectReceiptStats =
  createSelector(
    [(state) => state.receipt.receipts],
    (receipts = []) => {
      const totalAmount =
        receipts.reduce(
          (sum, receipt) =>
            sum +
            Number(
              receipt.amount || 0
            ),
          0
        );

      const verified =
        receipts.filter(
          (r) => r.isVerified
        ).length;

      const pending =
        receipts.length - verified;

      return {
        totalReceipts:
          receipts.length,
        totalAmount,
        verified,
        pending,
        averageAmount:
          receipts.length > 0
            ? totalAmount /
              receipts.length
            : 0,
      };
    }
  );

export const {
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  clearError,
  clearReceiptSuccess,
  resetReceiptFilters,
} = receiptSlice.actions;

export default receiptSlice.reducer;