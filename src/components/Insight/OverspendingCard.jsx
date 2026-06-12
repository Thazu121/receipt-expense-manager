import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AlertTriangle, CheckCircle } from "lucide-react";
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

      const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
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
      previous > 0 ? ((current - previous) / previous) * 100 : 0;

    return { current, previous, change };
  }, [expenses]);

  const alert = data.change > 20;

  return (
    <div
      className={`
        w-full
        rounded-2xl
        border
        shadow-sm
        p-4
        sm:p-5
        lg:p-6
        transition-all
        ${
          alert
            ? "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
            : "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold truncate">
            Overspending Alert
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Current Month
          </p>
        </div>

        <div
          className={`
            shrink-0
            h-10
            w-10
            rounded-xl
            flex
            items-center
            justify-center
            ${
              alert
                ? "bg-red-100 text-red-600 dark:bg-red-900/40"
                : "bg-green-100 text-green-600 dark:bg-green-900/40"
            }
          `}
        >
          {alert ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
        </div>
      </div>

      <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
        {formatCurrency(data.current, currency)}
      </h2>

      <div className="mt-4 sm:mt-5 space-y-2">
        {alert ? (
          <p className="text-sm sm:text-base text-red-600 font-semibold leading-relaxed">
            ⚠ Spending increased by {data.change.toFixed(1)}%
          </p>
        ) : (
          <p className="text-sm sm:text-base text-green-600 font-semibold leading-relaxed">
            ✅ Spending is under control
          </p>
        )}

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
          Previous month: {formatCurrency(data.previous, currency)}
        </p>
      </div>
    </div>
  );
}