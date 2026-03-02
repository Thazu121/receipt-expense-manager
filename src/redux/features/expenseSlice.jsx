import { createSlice } from "@reduxjs/toolkit";

const savedExpenses =
  JSON.parse(localStorage.getItem("expenses")) || [];

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: savedExpenses,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
