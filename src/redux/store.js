import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt:receiptReducer,
  }
});
