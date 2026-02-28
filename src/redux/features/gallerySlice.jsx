import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  dateFilter: "30",
  category: "all",
  currentPage: 1,
  receiptsPerPage: 6,
  sortBy: "newest", // optional
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },

    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
      state.currentPage = 1;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setSearch,
  setDateFilter,
  setCategory,
  setCurrentPage,
  setSortBy,
} = gallerySlice.actions;

export default gallerySlice.reducer;
