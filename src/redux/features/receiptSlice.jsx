import { createSlice } from "@reduxjs/toolkit";

/* -----------------------------
   Safe Load from localStorage
------------------------------*/
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

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    receipts: loadReceipts(),
    scannedReceipt: null,
  },

  reducers: {
   
    setScannedReceipt: (state, action) => {
      state.scannedReceipt = action.payload;
    },

   
    addReceipt: (state, action) => {
      const newReceipt = {
        ...action.payload,
        amount: Number(action.payload.amount),
        currency: action.payload.currency || "$",
      };

      state.receipts.unshift(newReceipt); 
      saveReceipts(state.receipts);
    },

   
    deleteReceipt: (state, action) => {
      state.receipts = state.receipts.filter(
        (r) => r.id !== action.payload
      );
      saveReceipts(state.receipts);
    },

   
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
