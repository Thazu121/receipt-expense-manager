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
        const date = new Date(e.expenseDate || e.date);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
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
    <div
      className="
        w-full min-w-0
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5
        overflow-hidden
      "
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {label}
        </p>

        <div
          className="
            shrink-0
            w-9 h-9
            rounded-xl
            bg-emerald-100 dark:bg-emerald-500/10
            text-emerald-500
            flex items-center justify-center
          "
        >
          {icon}
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-3 break-words">
        {value}
      </h2>
    </div>
  );
}