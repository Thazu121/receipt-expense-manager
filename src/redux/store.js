import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"
import authReducer from "./features/authSlice"
import userReducer from "./features/userSlice"
import settingsReducer from "./features/settingSlice"
import scanReducer from "./features/scanSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt:receiptReducer,
        auth: authReducer,
        user:userReducer,
            settings: settingsReducer, 
        scan:scanReducer

  }
});
