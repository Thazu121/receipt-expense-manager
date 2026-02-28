import { AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OverspendingCard() {
  const receipts = useSelector((state) => state.receipt.receipts);
  const navigate = useNavigate();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  /* ===============================
     GROUP BY CATEGORY
  =============================== */
  const groupByCategory = (data) => {
    return data.reduce((acc, r) => {
      const cat = r.category || "Other";
      acc[cat] = (acc[cat] || 0) + Number(r.amount || 0);
      return acc;
    }, {});
  };

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

  const currentCategoryTotals = groupByCategory(currentMonthReceipts);
  const lastCategoryTotals = groupByCategory(lastMonthReceipts);

  /* ===============================
     FIND TOP INCREASE CATEGORY
  =============================== */
  let topCategory = null;
  let highestIncrease = 0;
  let topAmount = 0;

  for (const cat in currentCategoryTotals) {
    const current = currentCategoryTotals[cat];
    const last = lastCategoryTotals[cat] || 0;

    let change = 0;

    if (last === 0 && current > 0) {
      change = 100;
    } else if (last > 0) {
      change = ((current - last) / last) * 100;
    }

    if (change > highestIncrease) {
      highestIncrease = change;
      topCategory = cat;
      topAmount = current;
    }
  }

  const showOverspending = topCategory && highestIncrease > 10;

  if (!showOverspending) return null;

  const percentage = highestIncrease.toFixed(1);
  const isSevere = highestIncrease > 25;

  /* ===============================
     INTERNAL HANDLERS (NO PROPS)
  =============================== */
  const handleAdjust = () => {
    navigate("/goals"); // or budget page
  };

  const handleView = () => {
    navigate("/transactions");
  };

  return (
    <div
      className="
        lg:col-span-2
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        shadow-sm hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-red-200
        
        dark:bg-[#2a1111]/60
        dark:border-red-900
      "
    >
      <div className="flex items-start sm:items-center gap-3 mb-4">
        <div
          className={`
            relative w-10 h-10 flex items-center justify-center rounded-lg
            bg-red-100 text-red-600
            dark:bg-red-900/40 dark:text-red-400
            ${isSevere ? "animate-pulse" : ""}
          `}
        >
          <AlertTriangle size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            Overspending Alert: {topCategory}
          </h3>

          {isSevere && (
            <p className="text-xs text-red-500 mt-1">
              High spending risk detected
            </p>
          )}
        </div>
      </div>

      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        You've spent{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          ${topAmount.toLocaleString()}
        </span>
        , which is{" "}
        <span className="text-red-600 dark:text-red-400 font-semibold">
          {percentage}% higher
        </span>{" "}
        than last month.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleAdjust}
          className="
            w-full sm:w-auto
            px-4 py-2.5 rounded-lg transition-all duration-300
            text-sm font-medium
            bg-red-500 hover:bg-red-600
            active:scale-[0.98]
            text-white
          "
        >
          Adjust Budget
        </button>

        <button
          onClick={handleView}
          className="
            w-full sm:w-auto
            px-4 py-2.5 rounded-lg transition-all duration-300
            text-sm font-medium
            bg-white/70 backdrop-blur-md
            border border-gray-300
            text-gray-700
            hover:bg-gray-100
            dark:bg-white/5
            dark:border-white/20
            dark:text-white
            dark:hover:bg-white/10
          "
        >
          View Transactions
        </button>
      </div>
    </div>
  );
}
