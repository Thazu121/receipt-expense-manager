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
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        Top Categories
      </h3>

      <div className="space-y-5">
        {categories.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.name}</span>
              <span className="font-semibold">
                {formatCurrency(item.value, currency)}
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {item.percentage.toFixed(1)}% of spending
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}