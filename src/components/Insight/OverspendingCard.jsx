import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function OverspendingCard() {
  const receipts = useSelector((state) => state.receipt.receipts);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const { alertCategory, maxIncrease } = useMemo(() => {
    if (!receipts || receipts.length === 0) {
      return { alertCategory: null, maxIncrease: 0 };
    }

    const currentMap = {};
    const lastMap = {};

    receipts.forEach((r) => {
      if (!r.date) return;

      const d = new Date(r.date);
      if (isNaN(d)) return;

      const category = r.category || "Other";
      const amount = Math.abs(Number(r.amount || 0));

      // Current Month
      if (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      ) {
        currentMap[category] =
          (currentMap[category] || 0) + amount;
      }

      // Last Month
      if (
        d.getMonth() === lastMonth &&
        d.getFullYear() === lastMonthYear
      ) {
        lastMap[category] =
          (lastMap[category] || 0) + amount;
      }
    });

    let alertCat = null;
    let highestIncrease = 0;

    Object.keys(currentMap).forEach((cat) => {
      const current = currentMap[cat] || 0;
      const last = lastMap[cat] || 0;

      if (last <= 0) return;

      const increasePercent =
        ((current - last) / last) * 100;

      // Ignore very small differences (< ₹100 change)
      if (current - last < 100) return;

      if (increasePercent > highestIncrease) {
        highestIncrease = increasePercent;
        alertCat = cat;
      }
    });

    return {
      alertCategory: alertCat,
      maxIncrease: highestIncrease,
    };
  }, [receipts, currentMonth, currentYear, lastMonth, lastMonthYear]);

  const isAlert = maxIncrease > 10; // 10% threshold

  return (
    <div
      className={`
        p-5 rounded-2xl transition-all duration-300
        ${
          isAlert
            ? `
              bg-red-50 border border-red-200
              dark:bg-red-900/20 dark:border-red-700
            `
            : `
              bg-white/80 border border-emerald-100
              dark:bg-[#0f2e24]/60 dark:border-green-800
            `
        }
      `}
    >
      <h3 className="font-semibold mb-4">
        Overspending Alert
      </h3>

      {!receipts || receipts.length === 0 ? (
        <p className="text-sm text-gray-500">
          No receipt data available.
        </p>
      ) : alertCategory && isAlert ? (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Spending increased in:
          </p>

          <p className="text-lg font-bold mt-2">
            {alertCategory}
          </p>

          <p className="text-red-600 dark:text-red-400 mt-1 font-semibold">
            +{maxIncrease.toFixed(1)}% vs last month
          </p>

          <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">
            Consider reducing this category to stay on track.
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-500">
          No unusual spending increases detected.
        </p>
      )}
    </div>
  );
}
