import { createSlice, createSelector } from "@reduxjs/toolkit";


const generateId = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

const normalizeStatus = (status) => {
  if (!status) return "Pending";
  const s = status.toLowerCase();
  if (s === "verified") return "Verified";
  if (s === "rejected") return "Rejected";
  return "Pending";
};

const validateReceipt = (data) => {
  if (!data.store?.trim()) return "Merchant name is required";
  if (!data.amount || Number(data.amount) <= 0)
    return "Valid amount is required";
  if (!data.date) return "Date is required";
  return null;
};

const isDuplicate = (receipts, newReceipt, excludeId = null) =>
  receipts.some((r) => {
    if (excludeId && r.id === excludeId) return false;
    return (
      r.store?.toLowerCase() === newReceipt.store?.toLowerCase() &&
      Number(r.amount) === Number(newReceipt.amount) &&
      r.date === newReceipt.date
    );
  });


const loadReceipts = () => {
  try {
    const data = localStorage.getItem("receipts");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveReceipts = (receipts) => {
  try {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  } catch (err) {
    console.error("Receipt save error:", err);
  }
};


const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    receipts: loadReceipts(),
    search: "",
    statusFilter: "All",
    categoryFilter: "All",
    sortBy: "Newest",
    error: null,
  },
  reducers: {
    addReceipt: (state, action) => {
      state.error = null;

      const validationError = validateReceipt(action.payload);
      if (validationError) {
        state.error = validationError;
        return;
      }

      if (isDuplicate(state.receipts, action.payload)) {
        state.error = "Duplicate receipt detected";
        return;
      }

      const newReceipt = {
        id: generateId(),
        ...action.payload,
        amount: Number(action.payload.amount),
        status: normalizeStatus(action.payload.status),
        category: action.payload.category || "Other",
        createdAt: new Date().toISOString(),
      };

      state.receipts.push(newReceipt);
      saveReceipts(state.receipts);
    },

    updateReceipt: (state, action) => {
      const { id, updates } = action.payload;
      state.error = null;

      const index = state.receipts.findIndex((r) => r.id === id);
      if (index === -1) {
        state.error = "Receipt not found";
        return;
      }

      const updated = { ...state.receipts[index], ...updates };

      const validationError = validateReceipt(updated);
      if (validationError) {
        state.error = validationError;
        return;
      }

      if (isDuplicate(state.receipts, updated, id)) {
        state.error = "Duplicate receipt detected";
        return;
      }

      state.receipts[index] = {
        ...updated,
        amount: Number(updated.amount),
        status: normalizeStatus(updated.status),
        updatedAt: new Date().toISOString(),
      };

      saveReceipts(state.receipts);
    },

    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(
        (r) => r.id !== action.payload
      );
      saveReceipts(state.receipts);
    },

    toggleStatus: (state, action) => {
      const receipt = state.receipts.find(
        (r) => r.id === action.payload
      );
      if (!receipt) return;

      receipt.status =
        receipt.status === "Pending"
          ? "Verified"
          : receipt.status === "Verified"
          ? "Rejected"
          : "Pending";

      saveReceipts(state.receipts);
    },

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
});


export const selectFilteredReceipts = createSelector(
  [(state) => state.receipt],
  ({ receipts, search, statusFilter, categoryFilter, sortBy }) => {
    let data = receipts.filter((r) => {
      const matchesSearch = r.store
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || r.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || r.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    if (sortBy === "Newest")
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "Oldest")
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "Amount High-Low")
      data.sort((a, b) => b.amount - a.amount);
    if (sortBy === "Amount Low-High")
      data.sort((a, b) => a.amount - b.amount);

    return data;
  }
);

export const {
  addReceipt,
  updateReceipt,
  deleteReceipt,
  toggleStatus,
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  clearError,
} = receiptSlice.actions;

export default receiptSlice.reducer;
