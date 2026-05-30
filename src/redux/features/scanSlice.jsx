import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { uploadReceipt } from "../../services/scanService";

export const scanReceipt =
  createAsyncThunk(
    "scan/scanReceipt",

    async (file, { rejectWithValue }) => {
      try {
        const response =
          await uploadReceipt(file);

        return response;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Receipt scan failed"
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
};

const scanSlice = createSlice({
  name: "scan",

  initialState,

  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    setProgress: (state, action) => {
      state.progress =
        action.payload;
    },

    setError: (state, action) => {
      state.error =
        action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetScan: (state) => {
      Object.assign(
        state,
        initialState
      );
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        scanReceipt.pending,
        (state) => {
          state.scanning = true;
          state.error = null;
          state.progress = 0;
        }
      )

      .addCase(
        scanReceipt.fulfilled,
        (state, action) => {
          state.scanning = false;
          state.progress = 100;

          state.extracted =
            action.payload.data;

          state.confidence =
            Math.round(
              action.payload
                .confidence || 0
            );

          state.isValid =
            !!action.payload.data
              ?.amount;
        }
      )

      .addCase(
        scanReceipt.rejected,
        (state, action) => {
          state.scanning = false;
          state.progress = 0;

          state.error =
            action.payload ||
            "Scan failed";
        }
      );
  },
});

export const {
  setMode,
  setProgress,
  setError,
  clearError,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;