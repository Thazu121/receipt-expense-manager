import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SpendingChart() {
  const receipts = useSelector((state) => state.receipt.receipts);

  const data = useMemo(() => {
    if (!receipts || !receipts.length) return [];

    const monthly = {};

    receipts.forEach((r) => {
      if (!r.date) return;

      const date = new Date(r.date);
      if (isNaN(date)) return;

      const monthTimestamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getTime();

      const amount = Math.abs(Number(r.amount) || 0);

      monthly[monthTimestamp] =
        (monthly[monthTimestamp] || 0) + amount;
    });

    return Object.entries(monthly)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([timestamp, amount]) => {
        const date = new Date(Number(timestamp));
        return {
          month: date.toLocaleString("default", {
            month: "short",
          }),
          amount,
        };
      });
  }, [receipts]);

  if (!data.length) {
    return (
      <div className="p-4 sm:p-6 bg-white dark:bg-[#0F1B22] rounded-2xl shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold">
          Spending Trends
        </h2>
        <p className="text-gray-500 mt-3 text-sm">
          No chart data
        </p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.amount));

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-[#0F1B22] rounded-2xl shadow-sm w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
        Spending Trends
      </h2>

      <div className="flex items-end gap-4 h-48 sm:h-60 overflow-x-auto pb-2">
        {data.map((item, i) => {
          const isHighest = item.amount === max;
          const height = max
            ? (item.amount / max) * 180
            : 0;

          return (
            <div
              key={i}
              className="flex flex-col items-center min-w-[55px] group"
            >
              <div className="h-44 sm:h-56 w-6 sm:w-8 bg-gray-100 dark:bg-white/10 rounded-full flex items-end overflow-hidden">
                
                <div
                  className={`
                    w-full rounded-full transition-all duration-700
                    bg-gradient-to-t
                    ${
                      isHighest
                        ? "from-red-600 via-red-500 to-red-400 shadow-lg scale-105"
                        : "from-emerald-600 via-emerald-500 to-emerald-400"
                    }
                  `}
                  style={{
                    height: `${height}px`,
                  }}
                />
              </div>

              <span className="text-[10px] sm:text-xs mt-2 text-gray-600 dark:text-gray-400">
                {item.month}
              </span>

              <span
                className={`text-[9px] sm:text-[10px] mt-1 ${
                  isHighest
                    ? "text-red-500 font-semibold"
                    : "text-gray-400"
                }`}
              >
                ₹{item.amount.toFixed(0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
