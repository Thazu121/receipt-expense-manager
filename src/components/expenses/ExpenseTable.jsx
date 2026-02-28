import { useSelector } from "react-redux"

export default function ExpenseTable({ search }) {
  const receipts = useSelector((state) => state.receipt.receipts)

  // 🔍 Filter receipts
  const filteredReceipts = receipts.filter((r) =>
    r.store?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-white/5 
                    dark:backdrop-blur-xl border border-gray-200 
                    dark:border-white/10 transition">

      {/* If No Expenses At All */}
      {receipts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🧾</div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No expenses added yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Add your first expense to get started.
          </p>
        </div>
      )}

      {/* If Expenses Exist But Search Has No Match */}
      {receipts.length > 0 && filteredReceipts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No results found
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Try searching with a different keyword.
          </p>
        </div>
      )}

      {/* Table Header */}
      {filteredReceipts.length > 0 && (
        <>
          <div className="hidden md:grid grid-cols-4 px-6 py-4 text-sm font-medium
                          border-b border-gray-200 dark:border-white/10
                          text-gray-600 dark:text-gray-400">
            <span>Merchant</span>
            <span>Date</span>
            <span>Category</span>
            <span>Amount</span>
          </div>

          {filteredReceipts.map((r) => (
            <div
              key={r.id}
              className="px-4 md:px-6 py-4 border-b 
                         border-gray-200 dark:border-white/5
                         hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-4 items-center">
                <span className="font-medium truncate">
                  {r.store}
                </span>

                <span className="text-gray-500 dark:text-gray-400">
                  {r.date
                    ? new Date(r.date).toLocaleDateString()
                    : "-"}
                </span>

                <span className="text-sm px-3 py-1 rounded-full w-fit
                                 bg-emerald-100 text-emerald-600
                                 dark:bg-emerald-500/20 dark:text-emerald-400">
                  {r.category}
                </span>

                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ₹{Number(r.amount || 0).toFixed(2)}
                </span>
              </div>

              {/* Mobile Card */}
              <div className="md:hidden space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold truncate">
                    {r.store}
                  </span>

                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{Number(r.amount || 0).toFixed(2)}
                  </span>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {r.date
                    ? new Date(r.date).toLocaleDateString()
                    : "-"}{" "}
                  • {r.category}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
