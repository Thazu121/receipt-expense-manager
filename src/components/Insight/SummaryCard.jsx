import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  ReceiptText,
  TrendingUp,
  BadgeIndianRupee,
  CalendarDays,
} from "lucide-react";

export default function SummaryCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const summary = useMemo(() => {
    const total = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const today = new Date();

    const thisMonth = expenses
      .filter((e) => {
        const date = new Date(e.expenseDate);
        return (
          !isNaN(date) &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const highest = expenses.length
      ? Math.max(...expenses.map((e) => Number(e.amount || 0)))
      : 0;

    return {
      total,
      count: expenses.length,
      thisMonth,
      highest,
    };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Item
        icon={<BadgeIndianRupee size={22} />}
        label="Total Spending"
        value={formatCurrency(summary.total, currency)}
      />

      <Item
        icon={<ReceiptText size={22} />}
        label="Transactions"
        value={summary.count}
      />

      <Item
        icon={<CalendarDays size={22} />}
        label="This Month"
        value={formatCurrency(summary.thisMonth, currency)}
      />

      <Item
        icon={<TrendingUp size={22} />}
        label="Highest Expense"
        value={formatCurrency(summary.highest, currency)}
      />
    </div>
  );
}

function Item({ icon, label, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <div className="text-emerald-500">{icon}</div>
      </div>

      <h2 className="text-2xl font-bold mt-3 break-words">
        {value}
      </h2>
    </div>
  );
}