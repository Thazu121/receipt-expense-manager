import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const getToken = () =>
  localStorage.getItem("token");




const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});


export const fetchExpenses =
  createAsyncThunk(
    "expense/fetchExpenses",

    async (params = {}, thunkAPI) => {
      try {

        const response =
          await API.get(
            "/expenses",
            {
              ...authConfig(),
              params,
            }
          );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch expenses"
        );
      }
    }
  );




export const getSingleExpense =
  createAsyncThunk(
    "expense/getSingleExpense",

    async (id, thunkAPI) => {
      try {

        const response =
          await API.get(
            `/expenses/${id}`,
            authConfig()
          );

        return response.data.expense;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch expense"
        );
      }
    }
  );




export const createExpense =
  createAsyncThunk(
    "expense/createExpense",

    async (expenseData, thunkAPI) => {
      try {

        const response =
          await API.post(
            "/expenses",
            expenseData,
            authConfig()
          );

        return response.data.expense;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create expense"
        );
      }
    }
  );




export const updateExpense =
  createAsyncThunk(
    "expense/updateExpense",

    async (
      { id, updates },
      thunkAPI
    ) => {
      try {

        const response =
          await API.put(
            `/expenses/${id}`,
            updates,
            authConfig()
          );

        return response.data.expense;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update expense"
        );
      }
    }
  );




export const deleteExpense =
  createAsyncThunk(
    "expense/deleteExpense",

    async (id, thunkAPI) => {
      try {

        await API.delete(
          `/expenses/${id}`,
          authConfig()
        );

        return id;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete expense"
        );
      }
    }
  );




export const toggleFavoriteExpense =
  createAsyncThunk(
    "expense/toggleFavoriteExpense",

    async (id, thunkAPI) => {
      try {

        const response =
          await API.put(
            `/expenses/${id}/favourite`,
            {},
            authConfig()
          );

        return response.data.expense;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update favorite"
        );
      }
    }
  );




export const searchExpenses =
  createAsyncThunk(
    "expense/searchExpenses",

    async (query, thunkAPI) => {
      try {

        const response =
          await API.get(
            `/expenses/search?q=${query}`,
            authConfig()
          );

        return response.data.expenses;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Search failed"
        );
      }
    }
  );




export const fetchRecentExpenses =
  createAsyncThunk(
    "expense/fetchRecentExpenses",

    async (_, thunkAPI) => {
      try {

        const response =
          await API.get(
            "/expenses/recent",
            authConfig()
          );

        return response.data.expenses;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch recent expenses"
        );
      }
    }
  );




export const duplicateExpense =
  createAsyncThunk(
    "expense/duplicateExpense",

    async (id, thunkAPI) => {
      try {

        const response =
          await API.post(
            `/expenses/${id}/duplicate`,
            {},
            authConfig()
          );

        return response.data
          .duplicatedExpense;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to duplicate expense"
        );
      }
    }
  );





const initialState = {
  expenses: [],

  recentExpenses: [],

  selectedExpense: null,

  loading: false,

  error: null,

  success: null,

  totalExpenses: 0,

  totalPages: 1,

  currentPage: 1,

  count: 0,

  search: "",

  sort: "latest",

  filters: {
    categoryId: "",
    paymentMethod: "",
    favorite: false,
    startDate: "",
    endDate: "",
  },
};




const expenseSlice =
  createSlice({
    name: "expense",

    initialState,

    reducers: {

      clearExpenseError:
        (state) => {
          state.error = null;
        },

      clearExpenseSuccess:
        (state) => {
          state.success = null;
        },

      setExpenseSearch:
        (state, action) => {
          state.search =
            action.payload;
        },

      setExpenseSort:
        (state, action) => {
          state.sort =
            action.payload;
        },

      setExpenseFilters:
        (state, action) => {
          state.filters = {
            ...state.filters,
            ...action.payload,
          };
        },

      clearExpenseFilters:
        (state) => {
          state.filters = {
            categoryId: "",
            paymentMethod: "",
            favorite: false,
            startDate: "",
            endDate: "",
          };
        },
    },



    extraReducers: (builder) => {

      builder




        .addCase(
          fetchExpenses.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchExpenses.fulfilled,
          (state, action) => {
            state.loading = false;

            state.expenses =
              action.payload.expenses;

            state.totalExpenses =
              action.payload.totalExpenses;

            state.totalPages =
              action.payload.totalPages;

            state.currentPage =
              action.payload.currentPage;

            state.count =
              action.payload.count;
          }
        )

        .addCase(
          fetchExpenses.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )




        .addCase(
          getSingleExpense.fulfilled,
          (state, action) => {
            state.selectedExpense =
              action.payload;
          }
        )




        .addCase(
          createExpense.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          createExpense.fulfilled,
          (state, action) => {
            state.loading = false;

            state.expenses.unshift(
              action.payload
            );

            state.success =
              "Expense created successfully";
          }
        )

        .addCase(
          createExpense.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )




        .addCase(
          updateExpense.fulfilled,
          (state, action) => {

            const index =
              state.expenses.findIndex(
                (expense) =>
                  expense._id ===
                  action.payload._id
              );

            if (index !== -1) {
              state.expenses[index] =
                action.payload;
            }

            state.success =
              "Expense updated successfully";
          }
        )




        .addCase(
          deleteExpense.fulfilled,
          (state, action) => {

            state.expenses =
              state.expenses.filter(
                (expense) =>
                  expense._id !==
                  action.payload
              );

            state.success =
              "Expense deleted successfully";
          }
        )




        .addCase(
          toggleFavoriteExpense.fulfilled,
          (state, action) => {

            const index =
              state.expenses.findIndex(
                (expense) =>
                  expense._id ===
                  action.payload._id
              );

            if (index !== -1) {
              state.expenses[index] =
                action.payload;
            }
          }
        )




        .addCase(
          searchExpenses.fulfilled,
          (state, action) => {
            state.expenses =
              action.payload;
          }
        )




        .addCase(
          fetchRecentExpenses.fulfilled,
          (state, action) => {
            state.recentExpenses =
              action.payload;
          }
        )




        .addCase(
          duplicateExpense.fulfilled,
          (state, action) => {

            state.expenses.unshift(
              action.payload
            );

            state.success =
              "Expense duplicated successfully";
          }
        );
    },
  });




export const selectExpenseStats =
  createSelector(
    [(state) => state.expense.expenses],

    (expenses) => {

      const totalAmount =
        expenses.reduce(
          (sum, expense) =>
            sum +
            Number(
              expense.amount || 0
            ),
          0
        );

      const favoriteExpenses =
        expenses.filter(
          (expense) =>
            expense.favorite
        ).length;

      const recurringExpenses =
        expenses.filter(
          (expense) =>
            expense.isRecurring
        ).length;

      return {
        totalAmount,
        totalExpenses:
          expenses.length,
        favoriteExpenses,
        recurringExpenses,
      };
    }
  );



export const {
  clearExpenseError,
  clearExpenseSuccess,
  setExpenseSearch,
  setExpenseSort,
  setExpenseFilters,
  clearExpenseFilters,
} = expenseSlice.actions;

export default expenseSlice.reducer;