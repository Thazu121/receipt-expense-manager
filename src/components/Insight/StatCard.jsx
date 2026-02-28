import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function StatCard() {
  const receipts = useSelector((state) => state.receipt.receipts);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  /* ===============================
     FILTER MONTH DATA
  =============================== */
  const currentMonthReceipts = receipts.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  const lastMonthReceipts = receipts.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getMonth() === lastMonth &&
      d.getFullYear() === lastMonthYear
    );
  });

  const currentTotal = currentMonthReceipts.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0
  );

  const lastTotal = lastMonthReceipts.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0
  );

  /* ===============================
     TREND CALCULATION
  =============================== */
  let trend = 0;

  if (lastTotal > 0) {
    trend = ((currentTotal - lastTotal) / lastTotal) * 100;
  }

  const isPositive = trend > 0;
  const percentage = Math.abs(trend).toFixed(1);

  return (
    <div
      className="
        relative p-5 sm:p-6 rounded-2xl transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      {/* Title */}
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        Monthly Spend
      </p>

      {/* Value */}
      <h2
        className="
          text-xl sm:text-2xl md:text-3xl font-bold mt-2 transition-colors
          text-gray-900 dark:text-white
        "
      >
        ${currentTotal.toFixed(2)}
      </h2>

      {/* Trend */}
      {lastTotal > 0 && (
        <div
          className={`
            mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium
            ${
              isPositive
                ? "text-emerald-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          `}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {percentage}% vs last month
        </div>
      )}
    </div>
  );
}
