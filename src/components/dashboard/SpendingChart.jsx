import { useMemo } from "react";
import { useSelector } from "react-redux";

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

      const key = `${date.getFullYear()}-${date.getMonth()}`;

      monthly[key] =
        (monthly[key] || 0) +
        Math.abs(Number(expense.amount) || 0);
    });

    return Object.entries(monthly)
      .map(([key, amount]) => {
        const [year, month] = key.split("-").map(Number);
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
      <div
        className="
          w-full min-w-0
          rounded-2xl
          bg-white dark:bg-[#0F1B22]
          border border-gray-200 dark:border-white/5
          p-4 sm:p-6
          shadow-sm
        "
      >
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
    <div
      className="
        w-full min-w-0 overflow-hidden
        rounded-2xl
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        p-4 sm:p-5 lg:p-6
        shadow-sm
      "
    >
      <div className="mb-5 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Spending Trends
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monthly expense overview
        </p>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="flex items-end gap-3 sm:gap-5 min-w-max h-56 sm:h-72 pb-3 px-1">
          {data.map((item) => {
            const chartHeight =
              window.innerWidth < 640 ? 150 : 220;

            const height = maxAmount
              ? Math.max((item.amount / maxAmount) * chartHeight, 8)
              : 0;

            const isHighest = item.amount === maxAmount;

            return (
              <div
                key={item.key}
                className="flex flex-col items-center min-w-[52px] sm:min-w-[70px]"
              >
                <div className="flex items-end h-40 sm:h-60 w-7 sm:w-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
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
                  className={`mt-1 text-[10px] sm:text-xs whitespace-nowrap ${
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