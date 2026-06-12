export default function TransactionsTable({ expenses = [] }) {
  const latestExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.expenseDate || b.date || b.createdAt || 0) -
        new Date(a.expenseDate || a.date || a.createdAt || 0)
    )
    .slice(0, 8);

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
      </div>

      {!latestExpenses.length ? (
        <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
          No transactions found
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="block md:hidden divide-y divide-gray-200 dark:divide-white/10">
            {latestExpenses.map((expense, index) => {
              const date =
                expense.expenseDate || expense.date || expense.createdAt;

              return (
                <div
                  key={expense._id || index}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {expense.title || expense.merchant || "Untitled"}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {date
                          ? new Date(date).toLocaleDateString("en-IN")
                          : "-"}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-emerald-500">
                      ₹
                      {Number(expense.amount || 0).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <span className="inline-flex max-w-full rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 truncate">
                    {expense.categoryId?.name || expense.category || "General"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {latestExpenses.map((expense, index) => {
                  const date =
                    expense.expenseDate || expense.date || expense.createdAt;

                  return (
                    <tr
                      key={expense._id || index}
                      className="border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {expense.title || expense.merchant || "Untitled"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                          {expense.categoryId?.name ||
                            expense.category ||
                            "General"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {date
                          ? new Date(date).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-bold text-emerald-500">
                        ₹
                        {Number(expense.amount || 0).toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}