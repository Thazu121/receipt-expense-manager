import { createSlice, createSelector } from "@reduxjs/toolkit";

/* ======================================================
   🔧 HELPERS
====================================================== */

// Safe ID generator
const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

// Normalize status
const normalizeStatus = (status) => {
  if (!status) return "Pending";

  const s = status.toLowerCase();
  if (s === "verified") return "Verified";
  if (s === "rejected") return "Rejected";

  return "Pending";
};

// Validate receipt
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

// Load from localStorage
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

// Save to localStorage
const saveReceipts = (receipts) => {
  try {
    localStorage.setItem(
      "receipts",
      JSON.stringify(receipts)
    );
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

    // Filters
    search: "",
    statusFilter: "All",
    sortBy: "Newest",

    // Pagination
    currentPage: 1,
    receiptsPerPage: 6,

    error: null,
  },

  reducers: {
    /* ---------------- ADD RECEIPT ---------------- */
    addReceipt: (state, action) => {
      state.error = null;

      const validationError = validateReceipt(
        action.payload
      );

      if (validationError) {
        state.error = validationError;
        return;
      }

      const newReceipt = {
        id: generateId(),
        ...action.payload,
        amount: Number(action.payload.amount),
        status: normalizeStatus(
          action.payload.status ?? "Pending"
        ),
        createdAt: new Date().toISOString(),
      };

      state.receipts.push(newReceipt);
      saveReceipts(state.receipts);
    },

    /* ---------------- UPDATE RECEIPT ---------------- */
    updateReceipt: (state, action) => {
      const { id, updates } = action.payload;

      const index = state.receipts.findIndex(
        (r) => r.id === id
      );

      if (index === -1) {
        state.error = "Receipt not found";
        return;
      }

      if (
        updates.amount !== undefined &&
        (isNaN(updates.amount) ||
          Number(updates.amount) <= 0)
      ) {
        state.error = "Amount must be greater than 0";
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
      state.currentPage = 1;
    },

    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },

    /* ---------------- PAGINATION ---------------- */
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    nextPage: (state) => {
      state.currentPage += 1;
    },

    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },

    setReceiptsPerPage: (state, action) => {
      state.receiptsPerPage = action.payload;
      state.currentPage = 1;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

/* ======================================================
   🎯 MEMOIZED SELECTOR (NO WARNING)
====================================================== */

export const selectPaginatedReceipts = createSelector(
  [(state) => state.receipt],
  (receiptState) => {
    const {
      receipts,
      search,
      statusFilter,
      sortBy,
      currentPage,
      receiptsPerPage,
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

      return matchesSearch && matchesStatus;
    });

    // Sorting
    if (sortBy === "Newest") {
      data = [...data].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "Oldest") {
      data = [...data].sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sortBy === "Amount High-Low") {
      data = [...data].sort(
        (a, b) => b.amount - a.amount
      );
    }

    if (sortBy === "Amount Low-High") {
      data = [...data].sort(
        (a, b) => a.amount - b.amount
      );
    }

    const totalPages = Math.ceil(
      data.length / receiptsPerPage
    );

    const paginatedData = data.slice(
      (currentPage - 1) * receiptsPerPage,
      currentPage * receiptsPerPage
    );

    return {
      receipts: paginatedData,
      totalPages,
      currentPage,
    };
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
  setSortBy,
  setCurrentPage,
  nextPage,
  prevPage,
  setReceiptsPerPage,
  clearError,
} = receiptSlice.actions;

export default receiptSlice.reducer;
