import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Store } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TopMerchantCard({ receipts = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const merchants = useMemo(() => {
    const map = {};

    receipts.forEach((receipt) => {
      const merchant =
        receipt.store || receipt.merchantName || "Unknown";

      const amount = Number(
        receipt.amount || receipt.extractedAmount || 0
      );

      map[merchant] = (map[merchant] || 0) + amount;
    });

    return Object.entries(map)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [receipts]);

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5 lg:p-6
        overflow-hidden
      "
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
        Top Merchants
      </h3>

      {merchants.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-gray-400 text-center">
          No merchant data available
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {merchants.map((merchant, index) => (
            <div
              key={merchant.name}
              className="
                flex items-center justify-between gap-3
                p-3 sm:p-4
                rounded-xl
                bg-gray-50 dark:bg-white/5
              "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="
                    shrink-0
                    w-9 h-9
                    sm:w-10 sm:h-10
                    rounded-xl
                    bg-emerald-100 dark:bg-emerald-500/10
                    text-emerald-600
                    flex items-center justify-center
                  "
                >
                  <Store size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-medium truncate">
                    {merchant.name}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    #{index + 1} merchant
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-sm sm:text-base font-bold">
                {formatCurrency(merchant.amount, currency)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}