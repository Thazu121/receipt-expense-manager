import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  Pencil,
  Trash2,
  Star,
  Calendar,
  Tag,
  Repeat,
  Receipt,
  Wallet,
  ScanLine,
} from "lucide-react";

import {
  deleteExpense,
  updateExpense,
  toggleFavoriteExpense,
  selectFilteredExpenses,
} from "../../redux/features/expenseSlice";

export default function ExpenseTable() {
  const dispatch = useDispatch();

  const expenses = useSelector(selectFilteredExpenses);
  const { loading, error } = useSelector((state) => state.expense);
  const isLight = useSelector((state) => state.theme.isLight);

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const categories = [
    "Food",
    "Grocery",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment",
    "Medical",
    "Travel",
    "Education",
    "Investment",
    "General",
  ];

  const getSourceBadge = (expense) => {
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

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleSave = () => {
    dispatch(
      updateExpense({
        id: editing._id,
        updates: {
          title: editing.title,
          amount: Number(editing.amount),
          expenseDate: editing.expenseDate,
          notes: editing.notes,
          category: editing.category || "General",
          paymentMethod: editing.paymentMethod,
        },
      })
    );

    setEditing(null);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div
        className={`rounded-2xl p-8 text-center ${
          isLight
            ? "bg-white border border-gray-200"
            : "bg-white/5 border border-white/10"
        }`}
      >
        No expenses found
      </div>
    );
  }

  return (
    <>
      <div
        className={`
          w-full
          max-w-full
          overflow-hidden
          rounded-2xl
          ${
            isLight
              ? "bg-white border border-gray-200"
              : "bg-white/5 border border-white/10"
          }
        `}
      >
        <div
          className={`
            hidden xl:grid
            grid-cols-7
            gap-4
            px-6
            py-4
            border-b
            text-sm
            font-semibold
            ${
              isLight
                ? "border-gray-200 text-gray-600"
                : "border-white/10 text-gray-300"
            }
          `}
        >
          <span>Title</span>
          <span>Date</span>
          <span>Category</span>
          <span>Source</span>
          <span>Favorite</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>

        <div
          className={`divide-y ${
            isLight ? "divide-gray-200" : "divide-white/10"
          }`}
        >
          {expenses.map((expense) => {
            const badge = getSourceBadge(expense);
            const SourceIcon = badge.icon;
            const isFavorite = expense.favorite || expense.isFavorite;

            return (
              <div
                key={expense._id}
                className={`
                  w-full
                  max-w-full
                  p-3
                  sm:p-4
                  transition
                  ${
                    isLight
                      ? "hover:bg-gray-50"
                      : "hover:bg-white/5"
                  }
                `}
              >
                {/* Desktop */}
                <div className="hidden xl:grid grid-cols-7 gap-4 items-center">
                  <div className="font-medium truncate">
                    {expense.title || expense.merchant || "Untitled"}
                  </div>

                  <div className="text-sm text-gray-500">
                    {formatDate(
                      expense.expenseDate ||
                        expense.date ||
                        expense.createdAt
                    )}
                  </div>

                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      {expense.categoryId?.name ||
                        expense.category ||
                        "General"}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}
                    >
                      <SourceIcon size={13} />
                      {badge.label}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(toggleFavoriteExpense(expense._id))
                    }
                    className="w-fit"
                  >
                    <Star
                      size={18}
                      className={isFavorite ? "text-yellow-500" : ""}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  <div className="font-bold text-emerald-500">
                    ₹{formatAmount(expense.amount)}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditing(expense)}
                      className="hover:text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => setDeleteId(expense._id)}
                      className="hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Mobile / Tablet */}
                <div
                  className={`
                    xl:hidden
                    w-full
                    max-w-full
                    rounded-xl
                    p-4
                    overflow-hidden
                    ${
                      isLight
                        ? "bg-gray-50"
                        : "bg-white/5"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`
                          text-sm
                          sm:text-base
                          font-semibold
                          leading-snug
                          break-words
                          ${
                            isLight
                              ? "text-gray-900"
                              : "text-white"
                          }
                        `}
                      >
                        {expense.title ||
                          expense.merchant ||
                          "Untitled"}
                      </h3>

                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Calendar size={14} className="shrink-0" />
                        <span>
                          {formatDate(
                            expense.expenseDate ||
                              expense.date ||
                              expense.createdAt
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold text-emerald-500 text-sm">
                        ₹{formatAmount(expense.amount)}
                      </p>

                      <button
                        onClick={() =>
                          dispatch(toggleFavoriteExpense(expense._id))
                        }
                        className="mt-2"
                      >
                        <Star
                          size={18}
                          className={
                            isFavorite ? "text-yellow-500" : ""
                          }
                          fill={
                            isFavorite ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-emerald-100 text-emerald-700">
                      <Tag size={12} />
                      {expense.categoryId?.name ||
                        expense.category ||
                        "General"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${badge.className}`}
                    >
                      <SourceIcon size={12} />
                      {badge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => setEditing(expense)}
                      className="py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(expense._id)}
                      className="py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div
            className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-5 ${
              isLight
                ? "bg-white text-black"
                : "bg-zinc-900 text-white border border-zinc-700"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              Edit Expense
            </h2>

            <div className="space-y-4">
              <input
                value={editing.title || ""}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="Expense title"
                className="w-full p-3 rounded-lg border outline-none"
              />

              <input
                type="number"
                value={editing.amount || ""}
                onChange={(e) =>
                  setEditing({ ...editing, amount: e.target.value })
                }
                placeholder="Amount"
                className="w-full p-3 rounded-lg border outline-none"
              />

              <select
                value={editing.category || "General"}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                className="w-full p-3 rounded-lg border outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={
                  editing.expenseDate
                    ? editing.expenseDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    expenseDate: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border outline-none"
              />

              <textarea
                rows={4}
                value={editing.notes || ""}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                placeholder="Notes..."
                className="w-full p-3 rounded-lg border outline-none resize-none"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-3 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-lg bg-emerald-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div
            className={`rounded-2xl p-6 w-full max-w-sm ${
              isLight
                ? "bg-white text-black"
                : "bg-zinc-900 text-white border border-zinc-700"
            }`}
          >
            <h2 className="font-semibold text-lg">
              Delete Expense?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  dispatch(deleteExpense(deleteId));
                  setDeleteId(null);
                }}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}