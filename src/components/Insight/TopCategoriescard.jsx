import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TopCategoriesCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const categories = useMemo(() => {
    const map = {};

    expenses.forEach((expense) => {
      const category =
        expense.categoryId?.name ||
        expense.category?.name ||
        expense.category ||
        "Other";

      const amount = Number(expense.amount || 0);
      map[category] = (map[category] || 0) + amount;
    });

    const total = Object.values(map).reduce((a, b) => a + b, 0);

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
        percentage: total ? (value / total) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [expenses]);

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5 lg:p-6
        overflow-hidden
      "
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
        Top Categories
      </h3>

      {categories.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-gray-400 text-center">
          No category data available
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {categories.map((item) => (
            <div key={item.name} className="min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="min-w-0 truncate text-sm sm:text-base font-medium">
                  {item.name}
                </span>

                <span className="shrink-0 text-sm sm:text-base font-semibold">
                  {formatCurrency(item.value, currency)}
                </span>
              </div>

              <div className="w-full h-2.5 sm:h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${Math.min(item.percentage, 100)}%`,
                  }}
                />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.percentage.toFixed(1)}% of spending
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}