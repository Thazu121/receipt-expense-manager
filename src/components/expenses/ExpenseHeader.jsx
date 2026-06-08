import { Plus, Repeat, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ExpenseHeader() {
  const { expenses = [], count, loading } = useSelector(
    (state) => state.expense
  );

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const recurringCount = expenses.filter(
    (e) => e.source === "recurring" || e.isRecurring
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Expenses
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Manage and track your spending.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
          <Link
            to="/dashboard/add-expense"
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl text-white font-semibold"
          >
            <Plus size={18} />
            Add Expense
          </Link>

          <Link
            to="/dashboard/recurring"
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl text-white font-semibold"
          >
            <Repeat size={18} />
            Recurring
          </Link>
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <HeaderCard title="Total Expenses" value={count || expenses.length} />

          <HeaderCard
            title="Total Spent"
            value={`₹${totalAmount.toLocaleString()}`}
            highlight
          />

          <HeaderCard
            title="Recurring Expenses"
            value={recurringCount}
            icon={<Receipt size={18} className="text-blue-500" />}
          />
        </div>
      )}
    </div>
  );
}

function HeaderCard({ title, value, icon, highlight }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl p-4 sm:p-5 overflow-hidden">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      </div>

      <h2
        className={`text-xl sm:text-2xl font-bold mt-2 break-words ${
          highlight ? "text-green-600" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}