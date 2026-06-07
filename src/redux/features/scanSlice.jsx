import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scanReceipt as scanReceiptService } from "../../services/scanService";

export const scanReceipt = createAsyncThunk(
  "scan/scanReceipt",
  async ({ file, receiptId }, { rejectWithValue }) => {
    try {
      const response = await scanReceiptService(
        file,
        receiptId
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Scan failed"
      );
    }
  }
);

const initialState = {
  mode: "camera",
  scanning: false,
  progress: 0,
  error: null,
  image: null,
  receiptId: null,

  extracted: {
    merchant: "",
    amount: "",
    date: "",
    category: "",
    rawText: "",
  },

  confidence: 0,
  warnings: [],
  isValid: false,
  history: [],
};

const scanSlice = createSlice({
  name: "scan",
  initialState,

  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    setImage: (state, action) => {
      state.image = action.payload;
    },

    setReceiptId: (state, action) => {
      state.receiptId = action.payload;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearScanData: (state) => {
      state.extracted = {
        merchant: "",
        amount: "",
        date: "",
        category: "",
        rawText: "",
      };

      state.confidence = 0;
      state.progress = 0;
      state.error = null;
      state.warnings = [];
      state.isValid = false;
    },

    resetScan: (state) => {
      state.mode = "camera";
      state.scanning = false;
      state.progress = 0;
      state.error = null;
      state.image = null;
      state.receiptId = null;

      state.extracted = {
        merchant: "",
        amount: "",
        date: "",
        category: "",
        rawText: "",
      };

      state.confidence = 0;
      state.warnings = [];
      state.isValid = false;
      state.history = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(scanReceipt.pending, (state) => {
        state.scanning = true;
        state.progress = 20;
        state.error = null;
      })

      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.scanning = false;
        state.progress = 100;

     

        const response = action.payload || {};
        const data = response.data || {};

        state.extracted = {
          merchant: data.merchant || "",
          amount: data.amount || "",
          date: data.date || "",
          category: data.category || "",
          rawText: data.rawText || "",
        };

        state.confidence =
          response.confidence || 0;

        state.receiptId =
          response.receiptId || state.receiptId;

        state.warnings =
          response.warnings || [];

        state.isValid =
          !!data.merchant &&
          !!data.amount &&
          state.confidence > 50;

        if (data.merchant || data.amount) {
          state.history.unshift({
            merchant: data.merchant,
            amount: data.amount,
            date: data.date,
            category: data.category,
            confidence: response.confidence,
            scannedAt: new Date().toISOString(),
          });
        }

        if (state.history.length > 50) {
          state.history.pop();
        }
      })

      .addCase(scanReceipt.rejected, (state, action) => {
        state.scanning = false;
        state.progress = 0;
        state.error =
          action.payload || "Scan failed";
      });
  },
});

export const {
  setMode,
  setImage,
  setReceiptId,
  setProgress,
  setError,
  clearError,
  clearScanData,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;