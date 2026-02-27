import { useSelector } from "react-redux";

export default function TransactionsTable() {
  const receipts = useSelector(
    (state) => state.receipt.receipts
  );

  if (!receipts.length) {
    return (
      <div className="p-6 bg-white dark:bg-[#0F1B22] rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h2>
        <p className="text-gray-500">
          No transactions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-[#0F1B22] border border-gray-200 dark:border-white/5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b dark:border-white/5 text-gray-500">
              <th className="text-left py-3">
                Merchant
              </th>
              <th className="text-left">
                Category
              </th>
              <th className="text-left">
                Date
              </th>
              <th className="text-right">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((r, index) => (
              <tr
                key={r.id || index}
                className="border-b dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                <td className="py-4">
                  {r.store || "Unknown"}
                </td>
                <td>
                  {r.category || "Other"}
                </td>
                <td>{r.date || "-"}</td>
                <td className="text-right text-red-500 font-medium">
                  -$
                  {Number(r.amount || 0).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
