import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FinancialOverviewCard({ receipts }) {
  const currency = useSelector((state) => state.settings.currency);

  const { total, transactions } = useMemo(() => {
    const total = receipts.reduce(
      (sum, r) => sum + Math.abs(Number(r.amount || 0)),
      0
    );

    return {
      total,
      transactions: receipts.length,
    };
  }, [receipts]);

  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#0f2e24]/60 border border-emerald-100 dark:border-green-800 shadow-sm">
      <h3 className="font-semibold mb-4 text-lg">
        Financial Overview
      </h3>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Spend</p>
          <p className="text-2xl font-bold">
            {formatCurrency(total, currency)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Transactions</p>
          <p className="text-2xl font-bold">
            {transactions}
          </p>
        </div>
      </div>
    </div>
  );
}
