import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function LargeExpensesCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const topExpenses = useMemo(() => {
    return [...expenses]
      .sort(
        (a, b) =>
          Number(b.amount || 0) - Number(a.amount || 0)
      )
      .slice(0, 5);
  }, [expenses]);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        Largest Expenses
      </h3>

      <div className="space-y-4">
        {topExpenses.map((expense) => (
          <div
            key={expense._id}
            className="flex justify-between items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5"
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {expense.title || "Untitled"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {expense.category || "General"}
              </p>
            </div>

            <p className="font-bold whitespace-nowrap">
              {formatCurrency(expense.amount, currency)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}