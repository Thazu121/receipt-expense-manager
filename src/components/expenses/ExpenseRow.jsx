import { useSelector } from "react-redux";
import { Repeat, Receipt, Wallet, ScanLine } from "lucide-react";

export default function ExpenseRow({ expense }) {
  const isLight = useSelector((state) => state.theme.isLight);

  if (!expense) return null;

  const categoryName =
    expense.category?.name || expense.category || "General";

  const expenseDate = expense.expenseDate || expense.date;

  const getSourceBadge = () => {
    if (expense.source === "recurring" || expense.isRecurring) {
      return {
        label: "Recurring",
        icon: Repeat,
        className: isLight
          ? "bg-blue-100 text-blue-700"
          : "bg-blue-500/20 text-blue-300",
      };
    }

    if (expense.source === "receipt-scan") {
      return {
        label: "Receipt",
        icon: Receipt,
        className: isLight
          ? "bg-purple-100 text-purple-700"
          : "bg-purple-500/20 text-purple-300",
      };
    }

    if (expense.source === "ocr") {
      return {
        label: "OCR",
        icon: ScanLine,
        className: isLight
          ? "bg-orange-100 text-orange-700"
          : "bg-orange-500/20 text-orange-300",
      };
    }

    return {
      label: "Manual",
      icon: Wallet,
      className: isLight
        ? "bg-gray-100 text-gray-700"
        : "bg-white/10 text-gray-300",
    };
  };

  const sourceBadge = getSourceBadge();
  const SourceIcon = sourceBadge.icon;

  return (
    <div
      className={`
        w-full
        px-3 sm:px-4 lg:px-6
        py-4
        transition-all
        duration-200
        overflow-hidden
        ${
          isLight
            ? "border-b border-gray-200 hover:bg-gray-50"
            : "border-b border-white/5 hover:bg-white/5"
        }
      `}
    >
      <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
        <div className="font-semibold truncate">
          {expense.title || "Untitled"}
        </div>

        <div
          className={`text-sm ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {expenseDate
            ? new Date(expenseDate).toLocaleDateString()
            : "-"}
        </div>

        <div>
          <span
            className={`
              inline-flex items-center px-3 py-1 rounded-full
              text-xs font-medium
              ${
                isLight
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-emerald-500/20 text-emerald-400"
              }
            `}
          >
            {categoryName}
          </span>
        </div>

        <div>
          <span
            className={`
              inline-flex items-center gap-1 px-3 py-1 rounded-full
              text-xs font-medium
              ${sourceBadge.className}
            `}
          >
            <SourceIcon size={13} />
            {sourceBadge.label}
          </span>
        </div>

        <div
          className={`text-sm capitalize ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {expense.paymentMethod || "cash"}
        </div>

        <div
          className={`font-bold ${
            isLight ? "text-emerald-600" : "text-emerald-400"
          }`}
        >
          ₹{Number(expense.amount || 0).toFixed(2)}
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">
              {expense.title || "Untitled"}
            </h3>

            <p
              className={`text-xs mt-1 ${
                isLight ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {expenseDate
                ? new Date(expenseDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div
            className={`font-bold whitespace-nowrap ${
              isLight ? "text-emerald-600" : "text-emerald-400"
            }`}
          >
            ₹{Number(expense.amount || 0).toFixed(2)}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${
                isLight
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-emerald-500/20 text-emerald-400"
              }
            `}
          >
            {categoryName}
          </span>

          <span
            className={`
              inline-flex items-center gap-1 px-3 py-1 rounded-full
              text-xs font-medium
              ${sourceBadge.className}
            `}
          >
            <SourceIcon size={13} />
            {sourceBadge.label}
          </span>

          <span
            className={`text-xs capitalize ${
              isLight ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {expense.paymentMethod || "cash"}
          </span>
        </div>
      </div>
    </div>
  );
}