import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/api";




const getToken = () =>
  localStorage.getItem("token");




const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});




export const fetchCategories =
  createAsyncThunk(
    "category/fetchCategories",

    async (_, thunkAPI) => {
      try {

        const response =
          await API.get(
            "/categories",
            authConfig()
          );

        return response.data.categories;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch categories"
        );
      }
    }
  );




export const getSingleCategory =
  createAsyncThunk(
    "category/getSingleCategory",

    async (id, thunkAPI) => {
      try {

        const response =
          await API.get(
            `/categories/${id}`,
            authConfig()
          );

        return response.data.category;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch category"
        );
      }
    }
  );





export const createCategory =
  createAsyncThunk(
    "category/createCategory",

    async (categoryData, thunkAPI) => {
      try {

        const response =
          await API.post(
            "/categories",
            categoryData,
            authConfig()
          );

        return response.data.category;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create category"
        );
      }
    }
  );




export const updateCategory =
  createAsyncThunk(
    "category/updateCategory",

    async (
      { id, updates },
      thunkAPI
    ) => {
      try {

        const response =
          await API.put(
            `/categories/${id}`,
            updates,
            authConfig()
          );

        return response.data.category;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update category"
        );
      }
    }
  );




export const deleteCategory =
  createAsyncThunk(
    "category/deleteCategory",

    async (id, thunkAPI) => {
      try {

        await API.delete(
          `/categories/${id}`,
          authConfig()
        );

        return id;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete category"
        );
      }
    }
  );





const initialState = {

  categories: [],

  selectedCategory: null,

  loading: false,

  error: null,

  success: null,
};




const categorySlice =
  createSlice({
    name: "category",

    initialState,

    reducers: {

      clearCategoryError:
        (state) => {
          state.error = null;
        },

      clearCategorySuccess:
        (state) => {
          state.success = null;
        },
    },



    extraReducers: (builder) => {

      builder




        .addCase(
          fetchCategories.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchCategories.fulfilled,
          (state, action) => {
            state.loading = false;

            state.categories =
              action.payload;
          }
        )

        .addCase(
          fetchCategories.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )




        .addCase(
          getSingleCategory.fulfilled,
          (state, action) => {

            state.selectedCategory =
              action.payload;
          }
        )




        .addCase(
          createCategory.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          createCategory.fulfilled,
          (state, action) => {

            state.loading = false;

            state.categories.unshift(
              action.payload
            );

            state.success =
              "Category created successfully";
          }
        )

        .addCase(
          createCategory.rejected,
          (state, action) => {

            state.loading = false;

            state.error =
              action.payload;
          }
        )




        .addCase(
          updateCategory.fulfilled,
          (state, action) => {

            const index =
              state.categories.findIndex(
                (category) =>
                  category._id ===
                  action.payload._id
              );

            if (index !== -1) {
              state.categories[index] =
                action.payload;
            }

            state.success =
              "Category updated successfully";
          }
        )




        .addCase(
          deleteCategory.fulfilled,
          (state, action) => {

            state.categories =
              state.categories.filter(
                (category) =>
                  category._id !==
                  action.payload
              );

            state.success =
              "Category deleted successfully";
          }
        );
    },
  });



export const {
  clearCategoryError,
  clearCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;