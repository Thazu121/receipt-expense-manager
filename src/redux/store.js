import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"
import authReducer from "./features/authSlice"
import settingsReducer from "./features/settingSlice"
import scanReducer from "./features/scanSlice"
import expenseReducer from "./features/expenseSlice";
import categoryReducer from "./features/categorySlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt:receiptReducer,
        auth: authReducer,
            settings: settingsReducer, 
        scan:scanReducer,
        expense:expenseReducer,
category:categoryReducer
  }

  
});
