import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FinancialOverviewCard({ receipts = [] }) {
  const currency = useSelector((state) => state.settings.currency);

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

    const total = amounts.reduce((sum, value) => sum + value, 0);
    const highest = Math.max(...amounts);
    const average = total / receipts.length;

    return {
      total,
      count: receipts.length,
      average,
      highest,
    };
  }, [receipts]);

  return (
    <div className="w-full p-4 sm:p-6 rounded-2xl 
      bg-white dark:bg-[#0f172a] 
      border border-gray-200 dark:border-gray-700 
      shadow-sm transition-colors duration-300"
    >
      <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
        Financial Summary
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Spent */}
        <StatItem
          label="Total Spent"
          value={formatCurrency(stats.total, currency)}
        />

        {/* Total Entries */}
        <StatItem
          label="Total Entries"
          value={stats.count}
        />

        {/* Average Expense */}
        <StatItem
          label="Average Expense"
          value={formatCurrency(stats.average, currency)}
        />

        {/* Highest Expense */}
        <StatItem
          label="Highest Expense"
          value={formatCurrency(stats.highest, currency)}
        />
      </div>
    </div>
  );
}

/* Small reusable stat block */
function StatItem({ label, value }) {
  return (
    <div className="p-3 sm:p-4 rounded-xl 
      bg-gray-50 dark:bg-white/5 
      transition-colors duration-300"
    >
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">
        {value}
      </p>
    </div>
  );
}
