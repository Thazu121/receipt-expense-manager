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
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        Financial Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
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
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <h2 className="text-xl sm:text-2xl font-bold mt-2 break-words">
        {value}
      </h2>
    </div>
  );
}