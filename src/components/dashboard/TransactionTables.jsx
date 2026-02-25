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
    <div className="bg-[#13242c] border border-[#1f2f36] rounded-xl p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Recent Transactions
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Your latest spending activity
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead>
            <tr className="text-gray-400 border-b border-[#1f2f36]">
              <th className="text-left pb-3">Merchant</th>
              <th className="text-left pb-3">Category</th>
              <th className="text-left pb-3">Date</th>
              <th className="text-right pb-3">Amount</th>
              <th className="text-right pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={i}
                className="border-b border-[#1f2f36] hover:bg-[#0f1c22] transition"
              >
                <td className="py-4 text-gray-300">{tx.merchant}</td>
                <td className="text-gray-400">{tx.category}</td>
                <td className="text-gray-400">{tx.date}</td>

                <td
                  className={`text-right font-medium ${
                    tx.amount < 0
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}$
                  {Math.abs(tx.amount).toFixed(2)}
                </td>

                <td className="text-right">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      tx.status === "Verified"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
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
