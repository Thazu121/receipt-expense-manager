import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function ExpenseStats() {
  const expenses = useSelector(
    (state) => state.expense.expenses
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const {
    totalAmount,
    totalExpenses,
    topCategory,
  } = useMemo(() => {
    if (!expenses?.length) {
      return {
        totalAmount: 0,
        totalExpenses: 0,
        topCategory: "N/A",
      };
    }

    const categoryMap = {};

    let totalAmount = 0;

    expenses.forEach((expense) => {
      const amount = Number(
        expense.amount || 0
      );

      totalAmount += amount;

      const category =
        expense.categoryId?.name ||
        expense.category ||
        "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) +
        amount;
    });

    const sortedCategories =
      Object.entries(categoryMap).sort(
        (a, b) => b[1] - a[1]
      );

    return {
      totalAmount,
      totalExpenses:
        expenses.length,
      topCategory:
        sortedCategories[0]?.[0] ||
        "N/A",
    };
  }, [expenses]);

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3

        gap-4
        sm:gap-5
        lg:gap-6

        mb-6
        sm:mb-8
      "
    >
      <StatCard
        title="Total Spending"
        value={`₹${totalAmount.toFixed(
          2
        )}`}
        isLight={isLight}
      />

      <StatCard
        title="Total Expenses"
        value={totalExpenses}
        isLight={isLight}
      />

      <StatCard
        title="Top Category"
        value={topCategory}
        isLight={isLight}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  isLight,
}) {
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

        min-w-0

        ${
          isLight
            ? `
              bg-white
              border
              border-gray-200
            `
            : `
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
            `
        }
      `}
    >
      <p
        className={`
          text-sm
          sm:text-base

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

          mt-2

          break-words
        "
      >
        {value}
      </h2>
    </div>
  );
}