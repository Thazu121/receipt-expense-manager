import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function ExpenseStats() {
  const expenses = useSelector(
    (state) => state.expense.expenses || []
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const stats = useMemo(() => {
    const categoryTotals = {};

    let totalAmount = 0;
    let recurringAmount = 0;
    let manualAmount = 0;

    expenses.forEach((expense) => {
      const amount = Number(expense.amount || 0);

      totalAmount += amount;

      if (
        expense.source === "recurring" ||
        expense.isRecurring
      ) {
        recurringAmount += amount;
      } else {
        manualAmount += amount;
      }

      const category =
        expense.category?.name ||
        expense.categoryId?.name ||
        expense.category ||
        "General";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + amount;
    });

    const topCategory =
      Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "N/A";

    return {
      totalAmount,
      recurringAmount,
      manualAmount,
      topCategory,
    };
  }, [expenses]);

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        mb-6
      "
    >
      <StatCard
        title="Total Spending"
        value={`₹${stats.totalAmount.toLocaleString()}`}
        isLight={isLight}
      />

      <StatCard
        title="Manual Spending"
        value={`₹${stats.manualAmount.toLocaleString()}`}
        isLight={isLight}
      />

      <StatCard
        title="Recurring Spending"
        value={`₹${stats.recurringAmount.toLocaleString()}`}
        isLight={isLight}
      />

      <StatCard
        title="Top Category"
        value={stats.topCategory}
        isLight={isLight}
      />
    </div>
  );
}

function StatCard({ title, value, isLight }) {
  return (
    <div
      className={`
        rounded-2xl
        p-4
        sm:p-5
        lg:p-6
        shadow-lg
        transition-all
        duration-300
        hover:scale-[1.02]
        overflow-hidden
        ${
          isLight
            ? "bg-white border border-gray-200"
            : "bg-white/5 border border-white/10 backdrop-blur-xl"
        }
      `}
    >
      <p
        className={`
          text-xs
          sm:text-sm
          mb-2
          ${
            isLight
              ? "text-gray-500"
              : "text-gray-400"
          }
        `}
      >
        {title}
      </p>

      <h2
        className="
          text-xl
          sm:text-2xl
          lg:text-3xl
          font-bold
          break-words
          leading-tight
        "
      >
        {value}
      </h2>
    </div>
  );
}