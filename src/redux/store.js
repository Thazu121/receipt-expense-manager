import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice"
import receiptReducer from "./features/receiptSlice"
import authReducer from "./features/authSlice"
import userReducer from "./features/userSlice"
import goalReducer from "./features/goalSlice"
import galleryReducer from "./features/gallerySlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    receipt:receiptReducer,
        auth: authReducer,
        user:userReducer,
        goal:goalReducer,
        gallery:galleryReducer
        

  }
});
