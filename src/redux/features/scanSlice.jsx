import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scanReceiptOCR } from "../../services/OcrService";

export const scanReceipt = createAsyncThunk(
  "scan/scanReceipt",
  async (base64Image, { dispatch, rejectWithValue }) => {
    try {
      const data = await scanReceiptOCR(
        base64Image,
        (progress) => {
          dispatch(setProgress(progress));
        }
      );

      return {
        ...data,
        image: base64Image,
      };
    } catch (error) {
      return rejectWithValue("Failed to scan");
    }
  }
)

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
}

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
    resetScan: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(scanReceipt.pending, (state) => {
        state.scanning = true;
        state.progress = 0;
      })
      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.scanning = false;
        state.progress = 100;
        state.image = action.payload.image;
        state.extracted = {
          merchant: action.payload.merchant,
          date: action.payload.date,
          amount: action.payload.amount,
          category: action.payload.category,
        };
        state.confidence = action.payload.confidence;
      })
      .addCase(scanReceipt.rejected, (state) => {
        state.scanning = false;
      });
  },
})

export const { setProgress, resetScan,setMode } =
  scanSlice.actions

export default scanSlice.reducer
