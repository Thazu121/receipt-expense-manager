import { createSlice, createSelector } from "@reduxjs/toolkit";

/* ======================================================
   🔧 HELPERS
====================================================== */

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

const normalizeStatus = (status) => {
  if (!status) return "Pending";

  const s = status.toLowerCase();
  if (s === "verified") return "Verified";
  if (s === "rejected") return "Rejected";

  return "Pending";
};

const validateReceipt = (data) => {
  if (!data.store || data.store.trim() === "") {
    return "Merchant name is required";
  }

  if (!data.amount || Number(data.amount) <= 0) {
    return "Valid amount is required";
  }

  if (!data.date) {
    return "Date is required";
  }

  return null;
};

const isDuplicateReceipt = (receipts, newReceipt) => {
  return receipts.some(
    (r) =>
      r.store === newReceipt.store &&
      Number(r.amount) === Number(newReceipt.amount) &&
      r.date === newReceipt.date
  );
};

const loadReceipts = () => {
  try {
    const data = localStorage.getItem("receipts");
    if (!data) return [];

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((r) => ({
      ...r,
      amount: Number(r.amount),
      status: normalizeStatus(r.status),
    }));
  } catch (err) {
    console.error("Load error:", err);
    return [];
  }
};

const saveReceipts = (receipts) => {
  try {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  } catch (err) {
    console.error("Save error:", err);
  }
};

/* ======================================================
   🧠 SLICE
====================================================== */

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
    /* ---------------- ADD RECEIPT ---------------- */
    addReceipt: (state, action) => {
      state.error = null;

      const validationError = validateReceipt(action.payload);
      if (validationError) {
        state.error = validationError;
        return;
      }

      if (isDuplicateReceipt(state.receipts, action.payload)) {
        state.error = "Duplicate receipt detected";
        return;
      }

      const newReceipt = {
        id: generateId(),
        ...action.payload,
        amount: Number(action.payload.amount),
        status: normalizeStatus(action.payload.status ?? "Pending"),
        category: action.payload.category || "Other",
        source: action.payload.source || "manual",
        createdAt: new Date().toISOString(),
      };

      state.receipts.push(newReceipt);
      saveReceipts(state.receipts);
    },

    /* ---------------- UPDATE RECEIPT ---------------- */
    updateReceipt: (state, action) => {
      const { id, updates } = action.payload;

      const index = state.receipts.findIndex((r) => r.id === id);
      if (index === -1) {
        state.error = "Receipt not found";
        return;
      }

      const existing = state.receipts[index];

      state.receipts[index] = {
        ...existing,
        ...updates,
        amount:
          updates.amount !== undefined
            ? Number(updates.amount)
            : existing.amount,
        status:
          updates.status !== undefined
            ? normalizeStatus(updates.status)
            : existing.status,
        updatedAt: new Date().toISOString(),
      };

      state.error = null;
      saveReceipts(state.receipts);
    },

    /* ---------------- DELETE ---------------- */
    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(
        (r) => r.id !== action.payload
      );
      saveReceipts(state.receipts);
    },

    /* ---------------- TOGGLE STATUS ---------------- */
    toggleStatus: (state, action) => {
      const receipt = state.receipts.find(
        (r) => r.id === action.payload
      );

      if (!receipt) return;

      if (receipt.status === "Pending")
        receipt.status = "Verified";
      else if (receipt.status === "Verified")
        receipt.status = "Rejected";
      else receipt.status = "Pending";

      saveReceipts(state.receipts);
    },

    /* ---------------- FILTERS ---------------- */
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

    /* ---------------- ERROR ---------------- */
    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});



export const selectFilteredReceipts = createSelector(
  [(state) => state.receipt],
  (receiptState) => {
    const {
      receipts,
      search,
      statusFilter,
      categoryFilter,
      sortBy,
    } = receiptState;

    let data = receipts.filter((receipt) => {
      const matchesSearch =
        receipt.store
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : receipt.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All"
          ? true
          : receipt.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });

    switch (sortBy) {
      case "Newest":
        data.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "Oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Amount High-Low":
        data.sort((a, b) => b.amount - a.amount);
        break;

      case "Amount Low-High":
        data.sort((a, b) => a.amount - b.amount);
        break;

      default:
        break;
    }

    return data;
  }
);

/* ======================================================
   📦 EXPORTS
====================================================== */

export const {
  addReceipt,
  updateReceipt,
  deleteReceipt,
  toggleStatus,
  setSearch,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  setError,
  clearError,
} = receiptSlice.actions;

export default receiptSlice.reducer;
