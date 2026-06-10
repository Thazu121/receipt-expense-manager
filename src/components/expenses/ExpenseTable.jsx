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

  const { loading, error } = useSelector(
    (state) => state.expense
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

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
      <div className="p-8 text-center">
        Loading expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div
        className={`rounded-2xl p-10 text-center ${
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
        className={`rounded-2xl overflow-hidden ${
          isLight
            ? "bg-white border border-gray-200"
            : "bg-white/5 border border-white/10 backdrop-blur-xl"
        }`}
      >
        <div
          className={`
            hidden lg:grid grid-cols-7 gap-4 px-6 py-4 border-b
            font-semibold text-sm
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

        {expenses.map((expense) => {
          const badge = getSourceBadge(expense);
          const SourceIcon = badge.icon;

          return (
            <div
              key={expense._id}
              className={`border-b px-4 py-5 ${
                isLight
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="hidden lg:grid grid-cols-7 gap-4 items-center">
                <div className="font-medium truncate">
                  {expense.title || "Untitled"}
                </div>

                <div className="text-sm">
                  {expense.expenseDate
                    ? new Date(expense.expenseDate).toLocaleDateString()
                    : "-"}
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
                    className={
                      expense.favorite ? "text-yellow-500" : ""
                    }
                    fill={
                      expense.favorite ? "currentColor" : "none"
                    }
                  />
                </button>

                <div className="font-bold text-emerald-500">
                  ₹{Number(expense.amount || 0).toFixed(2)}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setEditing(expense)}>
                    <Pencil size={18} />
                  </button>

                  <button onClick={() => setDeleteId(expense._id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="lg:hidden">
                <div
                  className={`rounded-xl p-4 ${
                    isLight ? "bg-gray-50" : "bg-white/5"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">
                        {expense.title || "Untitled"}
                      </h3>

                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Calendar size={14} />
                        {expense.expenseDate
                          ? new Date(expense.expenseDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>

                    <div className="font-bold text-emerald-500">
                      ₹{Number(expense.amount || 0).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      <Tag size={13} />
                      {expense.categoryId?.name ||
                        expense.category ||
                        "General"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}
                    >
                      <SourceIcon size={13} />
                      {badge.label}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(toggleFavoriteExpense(expense._id))
                      }
                      className="ml-auto"
                    >
                      <Star
                        size={18}
                        className={
                          expense.favorite
                            ? "text-yellow-500"
                            : ""
                        }
                        fill={
                          expense.favorite
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setEditing(expense)}
                      className="flex-1 py-2 rounded-lg bg-blue-500 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(expense._id)}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-xl ${
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
                type="text"
                value={editing.title || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                  })
                }
                placeholder="Expense title"
                className={`w-full p-3 rounded-lg border outline-none ${
                  isLight
                    ? "bg-white border-gray-300 text-black"
                    : "bg-zinc-800 border-zinc-700 text-white"
                }`}
              />

              <input
                type="number"
                value={editing.amount || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    amount: e.target.value,
                  })
                }
                placeholder="Amount"
                className={`w-full p-3 rounded-lg border outline-none ${
                  isLight
                    ? "bg-white border-gray-300 text-black"
                    : "bg-zinc-800 border-zinc-700 text-white"
                }`}
              />

              <div className="relative">
                <Tag
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                />

                <select
                  value={editing.category || "General"}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      category: e.target.value,
                    })
                  }
                  className={`w-full pl-10 p-3 rounded-lg border outline-none ${
                    isLight
                      ? "bg-white border-gray-300 text-black"
                      : "bg-zinc-800 border-zinc-700 text-white"
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

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
                style={{
                  colorScheme: isLight ? "light" : "dark",
                }}
                className={`w-full p-3 rounded-lg border outline-none ${
                  isLight
                    ? "bg-white border-gray-300 text-black"
                    : "bg-zinc-800 border-zinc-700 text-white"
                }`}
              />

              <textarea
                rows={4}
                value={editing.notes || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    notes: e.target.value,
                  })
                }
                placeholder="Notes..."
                className={`w-full p-3 rounded-lg border outline-none resize-none ${
                  isLight
                    ? "bg-white border-gray-300 text-black"
                    : "bg-zinc-800 border-zinc-700 text-white"
                }`}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  isLight
                    ? "bg-gray-300 text-black"
                    : "bg-zinc-700 text-white"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
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
                className={`flex-1 py-3 rounded-lg ${
                  isLight ? "bg-gray-300" : "bg-zinc-700"
                }`}
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