import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import API from "../../api/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (params = {}, thunkAPI) => {
    try {
      const response = await API.get("/expenses", {
        ...authConfig(),
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch expenses"
      );
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (expenseData, thunkAPI) => {
    try {
      const response = await API.post(
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

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await API.put(
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

export const deleteExpense = createAsyncThunk(
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
        const response = await API.put(
          `/expenses/${id}/favorite`,
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
    category: "",
    paymentMethod: "",
    favorite: false,
    startDate: "",
    endDate: "",
    source: "",
    isRecurring: "",
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    clearExpenseError: (state) => {
      state.error = null;
    },

    clearExpenseSuccess: (state) => {
      state.success = null;
    },

    setExpenseSearch: (state, action) => {
      state.search = action.payload;
    },

    setExpenseSort: (state, action) => {
      state.sort = action.payload;
    },

    setExpenseFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearExpenseFilters: (state) => {
      state.filters = {
        category: "",
        paymentMethod: "",
        favorite: false,
        startDate: "",
        endDate: "",
        source: "",
        isRecurring: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;

        state.expenses =
          action.payload.expenses || [];

        state.totalExpenses =
          action.payload.totalExpenses || 0;

        state.totalPages =
          action.payload.totalPages || 1;

        state.currentPage =
          action.payload.currentPage || 1;

        state.count =
          action.payload.count || 0;
      })

      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Expense created successfully";
        state.expenses.unshift(action.payload);
      })

      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) =>
            expense._id === action.payload._id
        );

        if (index !== -1) {
          state.expenses[index] = action.payload;
        }

        state.success = "Expense updated successfully";
      })

      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) =>
            expense._id !== action.payload
        );

        state.success = "Expense deleted successfully";
      })

      .addCase(
        toggleFavoriteExpense.fulfilled,
        (state, action) => {
          const index = state.expenses.findIndex(
            (expense) =>
              expense._id === action.payload._id
          );

          if (index !== -1) {
            state.expenses[index] = action.payload;
          }
        }
      );
  },
});

export const selectFilteredExpenses =
  createSelector(
    [(state) => state.expense],
    ({ expenses, search, sort, filters }) => {
      let filtered = [...expenses];

      if (search) {
        const q = search.toLowerCase();

        filtered = filtered.filter(
          (expense) =>
            expense.title?.toLowerCase().includes(q) ||
            expense.notes?.toLowerCase().includes(q) ||
            expense.merchant?.toLowerCase().includes(q)
        );
      }

      if (filters.category) {
        filtered = filtered.filter(
          (expense) =>
            expense.category === filters.category
        );
      }

      if (filters.paymentMethod) {
        filtered = filtered.filter(
          (expense) =>
            expense.paymentMethod ===
            filters.paymentMethod
        );
      }

      if (filters.favorite) {
        filtered = filtered.filter(
          (expense) => expense.favorite
        );
      }

      if (filters.source) {
        filtered = filtered.filter(
          (expense) =>
            expense.source === filters.source
        );
      }

      if (filters.isRecurring === "true") {
        filtered = filtered.filter(
          (expense) => expense.isRecurring === true
        );
      }

      if (filters.isRecurring === "false") {
        filtered = filtered.filter(
          (expense) => expense.isRecurring === false
        );
      }

      if (filters.startDate) {
        filtered = filtered.filter(
          (expense) =>
            new Date(expense.expenseDate) >=
            new Date(filters.startDate)
        );
      }

      if (filters.endDate) {
        filtered = filtered.filter(
          (expense) =>
            new Date(expense.expenseDate) <=
            new Date(filters.endDate)
        );
      }

      switch (sort) {
        case "highest":
          filtered.sort(
            (a, b) => b.amount - a.amount
          );
          break;

        case "lowest":
          filtered.sort(
            (a, b) => a.amount - b.amount
          );
          break;

        case "oldest":
          filtered.sort(
            (a, b) =>
              new Date(a.expenseDate) -
              new Date(b.expenseDate)
          );
          break;

        default:
          filtered.sort(
            (a, b) =>
              new Date(b.expenseDate) -
              new Date(a.expenseDate)
          );
      }

      return filtered;
    }
  );

export const selectRecurringExpenses =
  createSelector(
    [(state) => state.expense.expenses],
    (expenses) =>
      expenses.filter(
        (expense) =>
          expense.source === "recurring" ||
          expense.isRecurring === true
      )
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