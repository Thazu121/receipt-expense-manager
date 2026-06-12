import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FinancialOverviewCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const stats = useMemo(() => {
    const amounts = expenses.map((e) => Number(e.amount || 0));
    const total = amounts.reduce((a, b) => a + b, 0);

    return {
      total,
      count: expenses.length,
      average: expenses.length ? total / expenses.length : 0,
      highest: amounts.length ? Math.max(...amounts) : 0,
      lowest: amounts.length ? Math.min(...amounts) : 0,
    };
  }, [expenses]);

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
        Financial Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Total Spending" value={formatCurrency(stats.total, currency)} />
        <Stat label="Transactions" value={stats.count} />
        <Stat label="Average Expense" value={formatCurrency(stats.average, currency)} />
        <Stat label="Highest Expense" value={formatCurrency(stats.highest, currency)} />
        <Stat label="Lowest Expense" value={formatCurrency(stats.lowest, currency)} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="min-w-0 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
        {label}
      </p>

      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mt-2 break-words">
        {value}
      </h2>
    </div>
  );
}