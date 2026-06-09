import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function OverspendingCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const data = useMemo(() => {
    const now = new Date();

    let current = 0;
    let previous = 0;

    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate);
      if (isNaN(date)) return;

      const amount = Number(expense.amount || 0);

      const prevMonth =
        now.getMonth() === 0
          ? 11
          : now.getMonth() - 1;

      const prevYear =
        now.getMonth() === 0
          ? now.getFullYear() - 1
          : now.getFullYear();

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        current += amount;
      }

      if (
        date.getMonth() === prevMonth &&
        date.getFullYear() === prevYear
      ) {
        previous += amount;
      }
    });

    const change =
      previous > 0
        ? ((current - previous) / previous) * 100
        : 0;

    return { current, previous, change };
  }, [expenses]);

  const alert = data.change > 20;

  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm ${
        alert
          ? "bg-red-50 border-red-300 dark:bg-red-900/20"
          : "bg-green-50 border-green-300 dark:bg-green-900/20"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">
        Overspending Alert
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Current Month
      </p>

      <h2 className="text-3xl font-bold mt-1">
        {formatCurrency(data.current, currency)}
      </h2>

      <div className="mt-5">
        {alert ? (
          <p className="text-red-600 font-semibold">
            ⚠ Spending increased by {data.change.toFixed(1)}%
          </p>
        ) : (
          <p className="text-green-600 font-semibold">
            ✅ Spending is under control
          </p>
        )}

        <p className="text-sm text-gray-500 mt-2">
          Previous month: {formatCurrency(data.previous, currency)}
        </p>
      </div>
    </div>
  );
}