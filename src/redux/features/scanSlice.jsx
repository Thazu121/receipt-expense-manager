import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scanReceipt as scanReceiptService } from "../../services/scanService";

/**
 * Scan receipt thunk
 */
export const scanReceipt = createAsyncThunk(
  "scan/scanReceipt",
  async (file, { rejectWithValue }) => {
    try {
      const response = await scanReceiptService(file);

      // backend already returns data directly
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
  mode: "camera", // camera | upload

  scanning: false,
  progress: 0,

  error: null,

  image: null,

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
      state.extracted = initialState.extracted;
      state.confidence = 0;
      state.isValid = false;
      state.warnings = [];
      state.progress = 0;
      state.error = null;
    },

    resetScan: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // PENDING
      // =====================
      .addCase(scanReceipt.pending, (state) => {
        state.scanning = true;
        state.error = null;
        state.progress = 10;
      })

      // =====================
      // SUCCESS
      // =====================
      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.scanning = false;
        state.progress = 100;

        const data = action.payload?.data || action.payload;

        state.extracted = {
          merchant: data?.merchant || "",
          amount: data?.amount || "",
          date: data?.date || "",
          category: data?.category || "",
          rawText: data?.rawText || "",
        };

        state.confidence = Math.round(action.payload?.confidence ?? 0);

        state.isValid =
          !!data?.amount &&
          !!data?.merchant &&
          state.confidence > 50;

        state.warnings = data?.warnings || [];

        // limit history to 50 items
        state.history.unshift({
          ...data,
          scannedAt: new Date().toISOString(),
        });

        if (state.history.length > 50) {
          state.history.pop();
        }
      })

      // =====================
      // ERROR
      // =====================
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
  setProgress,
  setError,
  clearError,
  clearScanData,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;