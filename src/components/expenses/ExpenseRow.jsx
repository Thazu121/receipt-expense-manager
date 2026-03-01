import { useSelector } from "react-redux"

export default function ExpenseRow({ receipt }) {
  const isLight = useSelector((state) => state.theme.isLight)

  return (
    <div
      className={`px-4 md:px-6 py-4 transition-all duration-200
      ${
        isLight
          ? "border-b border-gray-200 hover:bg-gray-50"
          : "border-b border-white/5 hover:bg-white/5"
      }`}
    >
      <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
        <div className="font-semibold">{receipt.merchant}</div>

        <div className={isLight ? "text-gray-500" : "text-gray-400"}>
          {receipt.date
            ? new Date(receipt.date).toLocaleDateString()
            : "-"}
        </div>

        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              isLight
                ? "bg-emerald-100 text-emerald-600"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {receipt.category}
          </span>
        </div>

        <div
          className={`font-semibold
          ${
            isLight ? "text-emerald-600" : "text-emerald-400"
          }`}
        >
          ₹{Number(receipt.amount).toFixed(2)}
        </div>
      </div>

      <div className="md:hidden space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            {receipt.merchant}
          </span>

          <span
            className={`font-bold
            ${
              isLight ? "text-emerald-600" : "text-emerald-400"
            }`}
          >
            ₹{Number(receipt.amount).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className={isLight ? "text-gray-500" : "text-gray-400"}>
            {receipt.date
              ? new Date(receipt.date).toLocaleDateString()
              : "-"}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-xs
            ${
              isLight
                ? "bg-emerald-100 text-emerald-600"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {receipt.category}
          </span>
        </div>
      </div>
    </div>
  )
}
