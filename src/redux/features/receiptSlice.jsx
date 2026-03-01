import { createSlice } from "@reduxjs/toolkit";

/* ===============================
   Load from LocalStorage
================================ */
const loadReceipts = () => {
  try {
    const data = localStorage.getItem("receipts");
    if (!data) return [];

    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Storage Load Error:", error);
    return [];
  }
};

const saveReceipts = (receipts) => {
  try {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  } catch (error) {
    console.error("Storage Save Error:", error);
  }
};

/* ===============================
   Slice
================================ */
const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    receipts: loadReceipts(),
    scannedReceipt: null,
  },

  reducers: {
    /* -------- SET SCANNED -------- */
    setScannedReceipt: (state, action) => {
      state.scannedReceipt = action.payload;
    },

    /* -------- ADD -------- */
    addReceipt: (state, action) => {
      const exists = state.receipts.some(
        (r) =>
          r.store?.toLowerCase() ===
            action.payload.store?.toLowerCase() &&
          r.date === action.payload.date &&
          r.amount === action.payload.amount
      );

      if (!exists) {
        state.receipts.push({
          ...action.payload,
          amount: Number(action.payload.amount),
        });

        saveReceipts(state.receipts);
      }
    },

    /* -------- DELETE -------- */
    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(
        (r) => r.id !== action.payload
      );

      saveReceipts(state.receipts);
    },

    /* -------- UPDATE -------- */
    updateReceipt: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.receipts.findIndex(
        (r) => r.id === id
      );

      if (index !== -1) {
        state.receipts[index] = {
          ...state.receipts[index],
          ...updatedData,
          amount: Number(updatedData.amount),
        };

        saveReceipts(state.receipts);
      }
    },

    /* -------- CLEAR -------- */
    clearScannedReceipt: (state) => {
      state.scannedReceipt = null;
    },

    clearAllReceipts: (state) => {
      state.receipts = [];
      saveReceipts([]);
    },
  },
});

export const {
  setScannedReceipt,
  addReceipt,
  deleteReceipt,
  updateReceipt,
  clearScannedReceipt,
  clearAllReceipts,
} = receiptSlice.actions;

export default receiptSlice.reducer;
