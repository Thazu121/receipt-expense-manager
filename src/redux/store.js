import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"
import authReducer from "./features/authSlice"
import settingsReducer from "./features/settingSlice"
import scanReducer from "./features/scanSlice"
import expenseReducer from "./features/expenseSlice";
import recurringReducer from "./features/recurringSlice"
import notificationReducer from "./features/notificationSlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt: receiptReducer,
    auth: authReducer,
    settings: settingsReducer,
    scan: scanReducer,
    expense: expenseReducer,
    recurring: recurringReducer,
    notification: notificationReducer

  }


});
