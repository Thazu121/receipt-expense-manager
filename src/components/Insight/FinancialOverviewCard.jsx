import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FinancialOverviewCard({ receipts = [] }) {
  const currency = useSelector(
    (state) => state.settings.currency
  );

  const stats = useMemo(() => {
    if (!receipts.length) {
      return {
        total: 0,
        count: 0,
        average: 0,
        highest: 0,
      };
    }

    const amounts = receipts.map((r) =>
      Math.abs(Number(r.amount || 0))
    );

    const total = amounts.reduce(
      (sum, value) => sum + value,
      0
    );

    const highest = Math.max(...amounts);

    const average =
      receipts.length > 0
        ? total / receipts.length
        : 0;

    return {
      total,
      count: receipts.length,
      average,
      highest,
    };
  }, [receipts]);

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      
      <h3 className="font-semibold text-lg sm:text-xl mb-6">
        Financial Summary
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Spent */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Spent
          </p>
          <p className="text-lg sm:text-2xl font-bold">
            {formatCurrency(stats.total, currency)}
          </p>
        </div>

        {/* Total Entries */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Entries
          </p>
          <p className="text-lg sm:text-2xl font-bold">
            {stats.count}
          </p>
        </div>

        {/* Average Expense */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Average Expense
          </p>
          <p className="text-lg sm:text-2xl font-bold">
            {formatCurrency(stats.average, currency)}
          </p>
        </div>

        {/* Highest Expense */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Highest Expense
          </p>
          <p className="text-lg sm:text-2xl font-bold">
            {formatCurrency(stats.highest, currency)}
          </p>
        </div>

      </div>
    </div>
  );
}
