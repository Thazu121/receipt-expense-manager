import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "camera",
  scanning: false,
  error: null,
  image: null,
  extracted: {
    merchant: "",
    date: "",
    amount: "",
  },
  confidence: 0,
};

const scanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
      state.error = null;
    },

    setImage: (state, action) => {
      state.image = action.payload;
      state.error = null;
    },

    startScanning: (state) => {
      state.scanning = true;
      state.error = null;
    },

    setExtractedData: (state, action) => {
      const { merchant, date, amount, confidence } = action.payload;

      state.extracted = {
        merchant: merchant || "",
        date: date || "",
        amount: amount || "",
      };

      state.confidence = confidence || 0;
      state.scanning = false;
      state.error = null;
    },

    setScanError: (state, action) => {
      state.error = action.payload;
      state.scanning = false;
    },

    resetScan: (state) => {
      state.scanning = false;
      state.image = null;
      state.mode = "upload";
      state.error = null;
      state.extracted = { merchant: "", date: "", amount: "" };
      state.confidence = 0;
    },
  },
});

export const {
  setMode,
  setImage,
  startScanning,
  setExtractedData,
  setScanError,
  resetScan,
} = scanSlice.actions;

export default scanSlice.reducer;
