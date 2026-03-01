import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"
import authReducer from "./features/authSlice"
import userReducer from "./features/userSlice"
import galleryReducer from "./features/gallerySlice"
import settingsReducer from "./features/settingSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt:receiptReducer,
        auth: authReducer,
        user:userReducer,
        gallery:galleryReducer,
            settings: settingsReducer, 
        

  }
});
