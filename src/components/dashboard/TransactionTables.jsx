export default function TransactionsTable({ expenses = [] }) {
  const latestExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.expenseDate || b.date || b.createdAt || 0) -
        new Date(a.expenseDate || a.date || a.createdAt || 0)
    )
    .slice(0, 8);

  if (!latestExpenses.length) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          No transactions found
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
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
            {latestExpenses.map((expense) => {
              const date =
                expense.expenseDate ||
                expense.date ||
                expense.createdAt;

              return (
                <tr
                  key={expense._id}
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
    </div>
  );
}