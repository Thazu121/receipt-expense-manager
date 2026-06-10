import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SpendingChart() {
  const expenses = useSelector(
    (state) => state.expense?.expenses || []
  );

  const data = useMemo(() => {
    if (!expenses.length) return [];

    const monthly = {};

    expenses.forEach((expense) => {
      const rawDate =
        expense.expenseDate ||
        expense.date ||
        expense.createdAt;

      if (!rawDate) return;

      const date = new Date(rawDate);

      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${month}`;

      monthly[key] =
        (monthly[key] || 0) +
        Math.abs(Number(expense.amount) || 0);
    });

    return Object.entries(monthly)
      .map(([key, amount]) => {
        const [year, month] = key
          .split("-")
          .map(Number);

        const date = new Date(year, month);

        return {
          key,
          year,
          monthIndex: month,
          month: date.toLocaleString("en-IN", {
            month: "short",
          }),
          amount,
        };
      })
      .sort(
        (a, b) =>
          a.year - b.year ||
          a.monthIndex - b.monthIndex
      );
  }, [expenses]);

  if (!data.length) {
    return (
      <div className="w-full rounded-2xl bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Spending Trends
        </h2>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          No chart data
        </p>
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Spending Trends
      </h2>

      <div className="w-full overflow-x-auto">
        <div className="flex items-end gap-3 sm:gap-5 min-w-max h-56 sm:h-72 pb-2">
          {data.map((item) => {
            const height = maxAmount
              ? Math.max((item.amount / maxAmount) * 220, 8)
              : 0;

            const isHighest = item.amount === maxAmount;

            return (
              <div
                key={item.key}
                className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]"
              >
                <div className="flex items-end h-44 sm:h-60 w-7 sm:w-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                  <div
                    style={{ height: `${height}px` }}
                    className={`
                      w-full rounded-full transition-all duration-700 bg-gradient-to-t
                      ${
                        isHighest
                          ? "from-red-600 via-red-500 to-red-400"
                          : "from-emerald-600 via-emerald-500 to-emerald-400"
                      }
                    `}
                  />
                </div>

                <span className="mt-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
                  {item.month}
                </span>

                <span
                  className={`mt-1 text-[10px] sm:text-xs ${
                    isHighest
                      ? "text-red-500 font-semibold"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  ₹
                  {Number(item.amount).toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}