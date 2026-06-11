import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpenseHeader from "../expenses/ExpenseHeader";
import ExpenseStats from "../expenses/ExpenseStats";
import ExpenseFilters from "../expenses/ExpenseFilters";
import ExpenseTable from "../expenses/ExpenseTable";

import { fetchExpenses } from "../../redux/features/expenseSlice";

export default function Expenses() {
  const dispatch = useDispatch();

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const { loading, error } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div
      className={`
        min-h-screen
        w-full
        min-w-0
        overflow-x-hidden
        transition-colors
        duration-300
        px-3
        py-4
        sm:px-5
        sm:py-6
        lg:px-8
        ${
          isLight
            ? "bg-green-50 sm:bg-gray-100 lg:bg-gray-200 text-gray-900"
            : "bg-emerald-950 sm:bg-gradient-to-br sm:from-emerald-950 sm:via-emerald-900 sm:to-black text-white"
        }
      `}
    >
      <div
        className="
          w-full
          max-w-7xl
          min-w-0
          mx-auto
          space-y-5
          sm:space-y-6
          lg:space-y-8
          overflow-hidden
        "
      >
        <ExpenseHeader />

        <ExpenseStats />

        <ExpenseFilters />

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 break-words">
            {error}
          </div>
        )}

        <div className="w-full min-w-0 overflow-hidden rounded-2xl">
          <ExpenseTable loading={loading} />
        </div>
      </div>
    </div>
  );
}