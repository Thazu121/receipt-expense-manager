import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useMemo } from "react";

export default function GroceryTipCard() {
  const receipts = useSelector(
    (state) => state.receipt.receipts
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const { currentSpend, lastSpend } = useMemo(() => {
    if (!receipts || receipts.length === 0) {
      return { currentSpend: 0, lastSpend: 0 };
    }

    let current = 0;
    let last = 0;

    receipts.forEach((r) => {
      if (!r.date) return;

      const d = new Date(r.date);
      if (isNaN(d)) return;

      // Flexible grocery detection
      const category = (r.category || "").toLowerCase();
      const isGrocery =
        category.includes("food") ||
        category.includes("grocery");

      if (!isGrocery) return;

      const amount = Math.abs(Number(r.amount || 0));

      if (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      ) {
        current += amount;
      }

      if (
        d.getMonth() === lastMonth &&
        d.getFullYear() === lastMonthYear
      ) {
        last += amount;
      }
    });

    return { currentSpend: current, lastSpend: last };
  }, [receipts, currentMonth, currentYear, lastMonth, lastMonthYear]);

  const increasePercent =
    lastSpend > 0
      ? ((currentSpend - lastSpend) / lastSpend) * 100
      : 0;

  /* ===============================
     AI SAVINGS LOGIC
  =============================== */

  let savingRate = 0.08; // base 8%
  let message = "Meal planning could help you save around";

  if (increasePercent > 20) {
    savingRate = 0.18;
    message =
      "Your grocery spending jumped significantly. You could save about";
  } else if (increasePercent > 10) {
    savingRate = 0.15;
    message =
      "Your grocery spending increased. You could save about";
  } else if (increasePercent > 5) {
    savingRate = 0.12;
    message =
      "Grocery costs are rising slightly. You could save about";
  }

  const weeklySavings = Math.round(
    (currentSpend * savingRate) / 4
  );

  const yearlySavings = weeklySavings * 52;

  const isAlert = increasePercent > 10;

  return (
    <div
      className={`
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        ${
          isAlert
            ? "bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700"
            : "bg-white/80 backdrop-blur-md border border-emerald-100 dark:bg-[#0f2e24]/60 dark:border-green-800"
        }
        shadow-sm hover:shadow-lg
      `}
    >
      <div
        className="
          w-10 h-10 sm:w-11 sm:h-11 
          flex items-center justify-center 
          rounded-lg mb-4
          bg-emerald-100 text-emerald-600
          dark:bg-green-900 dark:text-green-400
        "
      >
        <ShoppingCart size={20} />
      </div>

      <h3 className="font-semibold text-base sm:text-lg mb-2">
        Smart Grocery Insight
      </h3>

      {!receipts || receipts.length === 0 ? (
        <p className="text-sm text-gray-500">
          No grocery data available yet.
        </p>
      ) : currentSpend === 0 ? (
        <p className="text-sm text-gray-500">
          No grocery spending recorded this month.
        </p>
      ) : (
        <>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {message}{" "}
            <span className="text-emerald-600 dark:text-green-400 font-semibold">
              ${weeklySavings}/week
            </span>{" "}
            (${yearlySavings}/year).
          </p>

          {lastSpend > 0 && (
            <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">
              {increasePercent >= 0
                ? `+${increasePercent.toFixed(1)}%`
                : `${increasePercent.toFixed(1)}%`}{" "}
              vs last month.
            </p>
          )}
        </>
      )}

      <button
        className="
          mt-5 sm:mt-6 w-full py-2.5 rounded-lg
          transition-all duration-300
          bg-emerald-500 hover:bg-emerald-600
          active:scale-[0.98]
          text-white font-medium
          dark:bg-green-500 
          dark:hover:bg-green-600
          dark:text-black
        "
      >
        Create Grocery Plan
      </button>
    </div>
  );
}
