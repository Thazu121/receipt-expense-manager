export default function TransactionsTable() {
  const transactions = [
    {
      merchant: "Starbucks Coffee",
      category: "Food & Drink",
      date: "Oct 24, 2023",
      amount: -12.5,
      status: "Verified",
    },
    {
      merchant: "Uber Ride",
      category: "Transport",
      date: "Oct 22, 2023",
      amount: -28.0,
      status: "Verified",
    },
    {
      merchant: "Amazon",
      category: "Shopping",
      date: "Oct 20, 2023",
      amount: -120.99,
      status: "Pending",
    },
  ];

  return (
    <div
      className="
        rounded-2xl p-5 sm:p-6 lg:p-8
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your latest spending activity
        </p>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {transactions.map((tx, i) => (
          <div
            key={i}
            className="
              p-4 rounded-xl
              border border-gray-200 dark:border-white/5
              bg-gray-50 dark:bg-[#0B1418]
            "
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900 dark:text-white">
                {tx.merchant}
              </p>
              <p
                className={`font-semibold ${
                  tx.amount < 0
                    ? "text-red-500"
                    : "text-emerald-500"
                }`}
              >
                {tx.amount < 0 ? "-" : "+"}$
                {Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {tx.category} • {tx.date}
            </div>

            <div className="mt-3">
              <span
                className={`
                  px-3 py-1 text-[10px] rounded-full
                  ${
                    tx.status === "Verified"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                  }
                `}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/5">
              <th className="text-left pb-4">Merchant</th>
              <th className="text-left pb-4">Category</th>
              <th className="text-left pb-4">Date</th>
              <th className="text-right pb-4">Amount</th>
              <th className="text-right pb-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={i}
                className="
                  border-b border-gray-200 dark:border-white/5
                  hover:bg-gray-50 dark:hover:bg-white/5
                  transition-colors duration-200
                "
              >
                <td className="py-4 text-gray-900 dark:text-gray-300">
                  {tx.merchant}
                </td>

                <td className="text-gray-500 dark:text-gray-400">
                  {tx.category}
                </td>

                <td className="text-gray-500 dark:text-gray-400">
                  {tx.date}
                </td>

                <td
                  className={`text-right font-medium ${
                    tx.amount < 0
                      ? "text-red-500 dark:text-red-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}$
                  {Math.abs(tx.amount).toFixed(2)}
                </td>

                <td className="text-right">
                  <span
                    className={`
                      px-3 py-1 text-xs rounded-full
                      ${
                        tx.status === "Verified"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                      }
                    `}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
