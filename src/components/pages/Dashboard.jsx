import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../dashboard/Header";
import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";

import { fetchExpenses } from "../../redux/features/expenseSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { expenses = [], loading, error } = useSelector(
    (state) => state.expense
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalSpending = expenses.reduce(
      (sum, expense) =>
        sum + Math.abs(Number(expense.amount || 0)),
      0
    );

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlySpending = expenses
      .filter((expense) => {
        const rawDate =
          expense.expenseDate ||
          expense.date ||
          expense.createdAt;

        if (!rawDate) return false;

        const date = new Date(rawDate);

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce(
        (sum, expense) =>
          sum + Math.abs(Number(expense.amount || 0)),
        0
      );

    const categories = new Set(
      expenses.map(
        (expense) =>
          expense.categoryId?.name ||
          expense.category ||
          "General"
      )
    );

    const favoriteCount = expenses.filter(
      (expense) =>
        expense.favorite || expense.isFavorite
    ).length;

    return {
      totalSpending,
      monthlySpending,
      totalCategories: categories.size,
      favoriteCount,
      totalExpenses: expenses.length,
    };
  }, [expenses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-100 text-red-600 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Error Loading Dashboard
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen transition-all
        ${
          isLight
            ? "bg-gray-100 text-gray-900"
            : "bg-gradient-to-br from-[#071b11] via-[#0b2a1b] to-[#071b11] text-white"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <Header />
        </div>

        {expenses.length === 0 ? (
          <div
            className={`
              rounded-3xl p-10 text-center
              ${
                isLight
                  ? "bg-white border border-gray-200"
                  : "bg-white/5 border border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <h2 className="text-3xl font-bold">
              No Expenses Found
            </h2>

            <p className="mt-4 text-gray-500">
              Start adding expenses to see analytics and reports.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
              <StatCard
                title="Total Spending"
                value={stats.totalSpending}
                isCurrency
              />

              <StatCard
                title="This Month"
                value={stats.monthlySpending}
                isCurrency
              />

              <StatCard
                title="Categories"
                value={stats.totalCategories}
              />

              <StatCard
                title="Favorites"
                value={stats.favoriteCount}
              />

              <StatCard
                title="Expenses"
                value={stats.totalExpenses}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <SpendingChart expenses={expenses} />
              </div>

              <CategoriesCard expenses={expenses} />
            </div>

            <TransactionsTable expenses={expenses} />
          </>
        )}
      </div>
    </div>
  );
}