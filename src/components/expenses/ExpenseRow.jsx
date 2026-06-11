import { useSelector } from "react-redux";
import {
  Repeat,
  Receipt,
  Wallet,
  ScanLine,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function ExpenseRow({ expense }) {
  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  if (!expense) return null;

  const categoryName =
    expense.categoryId?.name ||
    expense.category?.name ||
    expense.category ||
    "General";

  const expenseDate =
    expense.expenseDate ||
    expense.date ||
    expense.createdAt;

  const amount = Number(expense.amount || 0);

  const getSourceBadge = () => {
    if (
      expense.source === "recurring" ||
      expense.isRecurring
    ) {
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

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (value) =>
    value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const sourceBadge = getSourceBadge();
  const SourceIcon = sourceBadge.icon;

  return (
    <div
      className={`
        w-full
        px-3 sm:px-4 lg:px-6
        py-4
        transition-all duration-200
        ${
          isLight
            ? "border-b border-gray-200 hover:bg-gray-50"
            : "border-b border-white/5 hover:bg-white/5"
        }
      `}
    >
      {/* Desktop / Tablet Row */}
      <div className="hidden lg:grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center">
        <div className="min-w-0">
          <p className="font-semibold truncate">
            {expense.title ||
              expense.merchant ||
              "Untitled"}
          </p>

          {expense.notes && (
            <p
              className={`text-xs mt-1 truncate ${
                isLight
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              {expense.notes}
            </p>
          )}
        </div>

        <div
          className={`text-sm ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {formatDate(expenseDate)}
        </div>

        <div>
          <span
            className={`
              inline-flex items-center px-3 py-1 rounded-full
              text-xs font-medium max-w-full truncate
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
          className={`font-bold text-right ${
            isLight ? "text-emerald-600" : "text-emerald-400"
          }`}
        >
          ₹{formatAmount(amount)}
        </div>
      </div>

      {/* Mobile Card */}
      <div
        className={`
          lg:hidden
          rounded-2xl
          p-4
          ${
            isLight
              ? "bg-white border border-gray-200"
              : "bg-white/5 border border-white/10"
          }
        `}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold truncate">
              {expense.title ||
                expense.merchant ||
                "Untitled"}
            </h3>

            {expense.notes && (
              <p
                className={`text-xs mt-1 line-clamp-1 ${
                  isLight
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                {expense.notes}
              </p>
            )}
          </div>

          <p
            className={`font-bold text-sm sm:text-base whitespace-nowrap ${
              isLight
                ? "text-emerald-600"
                : "text-emerald-400"
            }`}
          >
            ₹{formatAmount(amount)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-2">
          <span
            className={`inline-flex items-center gap-2 text-xs ${
              isLight ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <Calendar size={14} />
            {formatDate(expenseDate)}
          </span>

          <span
            className={`inline-flex items-center gap-2 text-xs capitalize ${
              isLight ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <CreditCard size={14} />
            {expense.paymentMethod || "cash"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
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
        </div>
      </div>
    </div>
  );
}