import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "INR", // default currency
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
