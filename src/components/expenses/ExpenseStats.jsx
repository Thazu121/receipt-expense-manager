import { useSelector } from "react-redux"
import { useMemo } from "react"

export default function ExpenseStats() {
  const receipts = useSelector((state) => state.receipt.receipts)
  const isLight = useSelector((state) => state.theme.isLight)

  // Calculate total spending
  const total = useMemo(() => {
    return receipts.reduce(
      (sum, r) => sum + Number(r.amount || 0),
      0
    )
  }, [receipts])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Spending"
        value={`₹${total.toFixed(2)}`}
        isLight={isLight}
      />
      <StatCard
        title="Active Budgets"
        value="8"
        isLight={isLight}
      />
      <StatCard
        title="Top Category"
        value="Groceries"
        isLight={isLight}
      />
    </div>
  )
}

function StatCard({ title, value, isLight }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300
      ${
        isLight
          ? "bg-white border border-gray-200"
          : "bg-white/5 backdrop-blur-xl border border-white/10"
      }`}
    >
      <p className={`${isLight ? "text-gray-500" : "text-gray-400"}`}>
        {title}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  )
}
