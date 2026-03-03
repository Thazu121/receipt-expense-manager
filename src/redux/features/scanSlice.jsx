import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scanReceiptOCR } from "../../services/OcrService";


export const scanReceipt = createAsyncThunk(
  "scan/scanReceipt",
  async (base64Image, { dispatch, rejectWithValue }) => {
    try {
      if (!base64Image) {
        return rejectWithValue("No image provided.");
      }

      const data = await scanReceiptOCR(
        base64Image,
        (progress) => {
          dispatch(setProgress(progress));
        }
      );

      if (!data) {
        return rejectWithValue(
          "Unable to extract receipt data."
        );
      }

      return {
        ...data,
        image: base64Image,
      };
    } catch (error) {
      return rejectWithValue(
        error?.message || "Failed to scan receipt"
      );
    }
  }
);


const normalizeAmount = (value) => {
  if (!value) return "";

  const cleaned = String(value)
    .replace(/[^\d.]/g, "")
    .trim();

  const number = parseFloat(cleaned);

  return isNaN(number) ? "" : number.toFixed(2);
};

const normalizeDate = (value) => {
  if (!value) return "";

  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return "";

  return parsed.toISOString().split("T")[0];
};


const initialState = {
  mode: "camera",
  scanning: false,
  progress: 0,
  error: null,
  image: null,

  extracted: {
    merchant: "",
    date: "",
    amount: "",
    category: "",
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
      state.error = null;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    resetScan: (state) => {
      Object.assign(state, initialState);
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(scanReceipt.pending, (state) => {
        state.scanning = true;
        state.progress = 0;
        state.error = null;
        state.warnings = [];
        state.isValid = false;
      })

      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.scanning = false;
        state.progress = 100;
        state.image = action.payload.image;

        const {
          merchant,
          date,
          amount,
          category,
          confidence,
        } = action.payload;

        const normalizedAmount =
          normalizeAmount(amount);

        const normalizedDate =
          normalizeDate(date);

        const normalizedConfidence =
          confidence <= 1
            ? confidence * 100
            : confidence || 0;

        state.extracted = {
          merchant: merchant?.trim() || "",
          date: normalizedDate,
          amount: normalizedAmount,
          category: category?.trim() || "",
        };

        state.confidence = normalizedConfidence;
        state.warnings = [];


        if (!state.extracted.merchant) {
          state.warnings.push(
            "Merchant not detected"
          );
        }

        if (!state.extracted.date) {
          state.warnings.push(
            "Date not detected or invalid"
          );
        }

        if (!state.extracted.amount) {
          state.warnings.push(
            "Amount not detected or invalid"
          );
        }

        if (normalizedConfidence < 70) {
          state.warnings.push(
            "Low confidence result"
          );
        }

       
        state.isValid =
          !!normalizedAmount &&
          Number(normalizedAmount) > 0;
      })

      .addCase(scanReceipt.rejected, (state, action) => {
        state.scanning = false;
        state.progress = 0;
        state.error =
          action.payload ||
          "Scan failed. Please try again.";
        state.isValid = false;
      });
  },
});

export const {
  setProgress,
  resetScan,
  setMode,
  clearError,
} = scanSlice.actions;

export default scanSlice.reducer;
