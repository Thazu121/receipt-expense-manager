import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { Activity } from "lucide-react";

export default function AverageTransactionCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const avg = useMemo(() => {
    if (!expenses.length) return 0;

    const total = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    return total / expenses.length;
  }, [expenses]);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Average Transaction
        </h3>

        <Activity className="text-emerald-500" size={24} />
      </div>

      <h2 className="text-3xl font-bold mt-5">
        {formatCurrency(avg, currency)}
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Average amount per expense
      </p>
    </div>
  );
}