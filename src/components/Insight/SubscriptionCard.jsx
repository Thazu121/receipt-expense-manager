import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function SubscriptionCard() {
  const receipts = useSelector((state) => state.receipt.receipts);
  const navigate = useNavigate();

  /* ===============================
     SMART RECURRING DETECTION
  =============================== */
  const { recurringSubscriptions, totalMonthly } = useMemo(() => {
    if (!receipts || receipts.length === 0) {
      return { recurringSubscriptions: [], totalMonthly: 0 };
    }

    const merchantMap = {};

    receipts.forEach((r) => {
      if (!r.date || !r.merchant) return;

      const date = new Date(r.date);
      if (isNaN(date)) return;

      const merchant = r.merchant.trim();
      const amount = Math.abs(Number(r.amount || 0));

      if (!merchantMap[merchant]) {
        merchantMap[merchant] = {
          entries: [],
        };
      }

      merchantMap[merchant].entries.push({
        date,
        amount,
      });
    });

    const recurring = Object.entries(merchantMap)
      .map(([name, data]) => {
        const monthsSet = new Set();
        let total = 0;

        data.entries.forEach((entry) => {
          const monthKey = `${entry.date.getFullYear()}-${entry.date.getMonth()}`;
          monthsSet.add(monthKey);
          total += entry.amount;
        });

        const monthsActive = monthsSet.size;

        // Recurring condition:
        // Active at least 2 months AND
        // Amounts are relatively consistent (within 30% variation)
        const amounts = data.entries.map((e) => e.amount);
        const avg =
          amounts.reduce((a, b) => a + b, 0) /
          amounts.length;

        const consistent = amounts.every(
          (amt) => Math.abs(amt - avg) / avg < 0.3
        );

        if (monthsActive >= 2 && consistent) {
          const monthlyAvg = total / monthsActive;
          const yearlyCost = monthlyAvg * 12;

          return {
            name,
            monthlyAvg,
            yearlyCost,
            monthsActive,
          };
        }

        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b.monthlyAvg - a.monthlyAvg);

    const total = recurring.reduce(
      (acc, item) => acc + item.monthlyAvg,
      0
    );

    return {
      recurringSubscriptions: recurring,
      totalMonthly: total,
    };
  }, [receipts]);

  const handleManage = () => {
    navigate("/transactions");
  };

  return (
    <div
      className="
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        shadow-sm hover:shadow-lg
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-base sm:text-lg">
          Subscription Audit
        </h3>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {recurringSubscriptions.length} Recurring
        </span>
      </div>

      {/* List */}
      <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
        {recurringSubscriptions.length > 0 ? (
          recurringSubscriptions.map((item) => {
            const suggestCancel = item.monthlyAvg > 25;

            return (
              <div
                key={item.name}
                className="
                  p-4 rounded-lg transition-all duration-200
                  bg-emerald-50 hover:bg-emerald-100
                  dark:bg-white/5 dark:hover:bg-white/10
                "
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    ${item.monthlyAvg.toFixed(2)}/mo
                  </span>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Active {item.monthsActive} months •
                  Yearly ${item.yearlyCost.toFixed(0)}
                </div>

                {suggestCancel && (
                  <div className="mt-3 text-xs text-red-600 dark:text-red-400 font-medium">
                    ⚠ Consider cancelling — Save $
                    {item.yearlyCost.toFixed(0)} per year
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No recurring subscriptions detected.
          </p>
        )}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-white/10 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Monthly
        </span>

        <span className="text-lg font-bold text-emerald-600 dark:text-green-400">
          ${totalMonthly.toFixed(2)}
        </span>
      </div>

      {/* Manage Button */}
      <button
        onClick={handleManage}
        className="
          mt-5 w-full py-2.5 rounded-lg transition-all duration-300
          text-sm font-medium
          bg-emerald-500 hover:bg-emerald-600
          text-white
          dark:bg-green-500
          dark:hover:bg-green-600
          dark:text-black
        "
      >
        Manage Subscriptions
      </button>
    </div>
  );
}
