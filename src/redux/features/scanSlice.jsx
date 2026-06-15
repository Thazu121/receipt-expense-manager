import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  scanReceipt as scanReceiptService,
} from "../../services/scanService";

export const scanReceipt = createAsyncThunk(
  "scan/scanReceipt",
  async (payload, { rejectWithValue }) => {
    try {
      const file = payload?.file || payload;

      if (!file) {
        return rejectWithValue("No image file selected");
      }

      const response = await scanReceiptService(file);
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
  success: null,
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

    increaseProgress: (state) => {
      if (state.scanning && state.progress < 90) {
        state.progress += 5;
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = null;
    },

    clearScanData: (state) => {
      state.progress = 0;
      state.error = null;
      state.success = null;
      state.receiptId = null;
      state.extracted = initialState.extracted;
      state.confidence = 0;
      state.warnings = [];
      state.isValid = false;
    },

    resetScan: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(scanReceipt.pending, (state) => {
        state.scanning = true;
        state.progress = 20;
        state.error = null;
        state.success = null;
      })

      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.scanning = false;
        state.progress = 100;
        state.success = "Receipt scanned successfully";

        const response = action.payload || {};
        const data = response.data || {};
        const receipt = response.receipt || {};

        state.extracted = {
          merchant:
            data.merchant ||
            data.merchantName ||
            receipt.merchantName ||
            receipt.merchant ||
            "",

          amount:
            data.amount ||
            data.extractedAmount ||
            receipt.extractedAmount ||
            receipt.amount ||
            "",

          date:
            data.date ||
            data.extractedDate ||
            receipt.extractedDate ||
            receipt.date ||
            "",

          category:
            data.category ||
            receipt.category ||
            "General",

          rawText:
            data.rawText ||
            data.extractedText ||
            receipt.extractedText ||
            receipt.rawText ||
            "",
        };

        state.confidence =
          response.confidence ||
          response.confidenceScore ||
          data.confidence ||
          data.confidenceScore ||
          receipt.confidenceScore ||
          0;

        state.receiptId =
          response.receiptId ||
          data.receiptId ||
          receipt._id ||
          null;

        state.warnings =
          response.warnings ||
          data.warnings ||
          [];

        state.isValid =
          Boolean(state.extracted.merchant) &&
          Boolean(state.extracted.amount) &&
          Number(state.confidence) > 50;

        if (
          state.extracted.merchant ||
          state.extracted.amount
        ) {
          state.history.unshift({
            merchant: state.extracted.merchant,
            amount: state.extracted.amount,
            date: state.extracted.date,
            category: state.extracted.category,
            confidence: state.confidence,
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
        state.error = action.payload || "Scan failed";
      });
  },
});

export const {
  setMode,
  setImage,
  setReceiptId,
  setProgress,
  increaseProgress,
  setError,
  clearError,
  clearSuccess,
  clearScanData,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;