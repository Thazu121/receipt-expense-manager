import { useMemo } from "react";

export default function CategoriesCard({ expenses = [] }) {
  const categories = useMemo(() => {
    if (!expenses.length) return [];

    const totals = {};
    let grandTotal = 0;

    expenses.forEach((expense) => {
      const amount = Math.abs(Number(expense.amount) || 0);

      grandTotal += amount;

      const category =
        expense.categoryId?.name ||
        expense.category ||
        "General";

      totals[category] = (totals[category] || 0) + amount;
    });

    return Object.keys(totals)
      .map((key) => ({
        name: key,
        amount: totals[key],
        percent: grandTotal
          ? Math.round((totals[key] / grandTotal) * 100)
          : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }, [expenses]);

  const isEmpty = categories.length === 0;

  return (
    <div
      className="
        w-full rounded-2xl sm:rounded-3xl
        bg-white dark:bg-[#0F1B22]
        border border-gray-100 dark:border-white/5
        shadow-sm p-4 sm:p-6
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            Top Categories
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Spending distribution
          </p>
        </div>
      </div>

      {isEmpty ? (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No category data available
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 flex-shrink-0" />

                  <span className="text-sm sm:text-[15px] font-medium text-gray-700 dark:text-gray-200 truncate">
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    ₹
                    {Number(cat.amount).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>

                  <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {cat.percent}%
                  </span>
                </div>
              </div>

              <div className="h-2.5 sm:h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width: `${cat.percent}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}