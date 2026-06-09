import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TopMerchantCard({ receipts = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const merchants = useMemo(() => {
    const map = {};

    receipts.forEach((receipt) => {
      const merchant =
        receipt.store ||
        receipt.merchantName ||
        "Unknown";

      const amount = Number(
        receipt.amount ||
          receipt.extractedAmount ||
          0
      );

      map[merchant] = (map[merchant] || 0) + amount;
    });

    return Object.entries(map)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [receipts]);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        Top Merchants
      </h3>

      {merchants.length === 0 ? (
        <p className="text-gray-400">No merchant data</p>
      ) : (
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div
              key={merchant.name}
              className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-white/5"
            >
              <span className="font-medium truncate">
                {merchant.name}
              </span>

              <span className="font-bold">
                {formatCurrency(merchant.amount, currency)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}