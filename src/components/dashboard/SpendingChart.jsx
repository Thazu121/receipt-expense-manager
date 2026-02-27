import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SpendingChart() {
  const receipts = useSelector(
    (state) => state.receipt?.receipts || []
  );

  const data = useMemo(() => {
    if (!receipts.length) return [];

    const monthly = {};

    receipts.forEach((r) => {
      if (!r.date) return;

      const date = new Date(r.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

      monthly[monthKey] =
        (monthly[monthKey] || 0) +
        (Number(r.amount) || 0);
    });

    return Object.entries(monthly)
      .sort((a, b) => new Date(a[0]) - new Date(b[0])) // ✅ sort by date
      .map(([key, amount]) => {
        const date = new Date(key);
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

      <div className="flex items-end justify-between gap-3 sm:gap-4 h-40 sm:h-56 overflow-x-auto">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[40px]"
          >
            <div
              className="w-6 sm:w-8 bg-emerald-500 rounded-t-md transition-all duration-700"
              style={{
                height: `${
                  max ? (item.amount / max) * 100 : 0
                }%`,
              }}
            />
            <span className="text-[10px] sm:text-xs mt-2">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
