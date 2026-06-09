import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function MonthlyComparisonCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const data = useMemo(() => {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let current = 0;
    let previous = 0;

    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate);
      if (isNaN(date)) return;

      const amount = Number(expense.amount || 0);

      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        current += amount;
      }

      if (
        date.getMonth() === previousMonth &&
        date.getFullYear() === previousYear
      ) {
        previous += amount;
      }
    });

    const change =
      previous > 0 ? ((current - previous) / previous) * 100 : 0;

    return { current, previous, change };
  }, [expenses]);

  const increased = data.change > 0;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        Monthly Comparison
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Box
          label="Current Month"
          value={formatCurrency(data.current, currency)}
        />

        <Box
          label="Previous Month"
          value={formatCurrency(data.previous, currency)}
        />
      </div>

      <div
        className={`mt-5 p-4 rounded-xl ${
          increased
            ? "bg-red-50 text-red-600 dark:bg-red-900/20"
            : "bg-green-50 text-green-600 dark:bg-green-900/20"
        }`}
      >
        <p className="font-semibold">
          {increased ? "↑ Spending Increased" : "↓ Spending Reduced"}
        </p>

        <p className="text-sm mt-1">
          {Math.abs(data.change).toFixed(1)}% compared to previous month
        </p>
      </div>
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5">
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-xl font-bold mt-1">{value}</h2>
    </div>
  );
}