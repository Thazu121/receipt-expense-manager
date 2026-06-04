import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Star } from "lucide-react";

import {
  deleteExpense,
  updateExpense,
  toggleFavoriteExpense,
} from "../../redux/features/expenseSlice";

export default function ExpenseTable({ search = "" }) {
  const dispatch = useDispatch();

  const { expenses, loading, error } = useSelector(
    (state) => state.expense
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setEditing(null);
        setDeleteId(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredExpenses = (expenses || [])
    .filter((expense) =>
      expense.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleEdit = (expense) => {
    setEditing({
      _id: expense._id,
      title: expense.title || "",
      amount: expense.amount || "",
      expenseDate: expense.expenseDate
        ? expense.expenseDate.split("T")[0]
        : "",
      notes: expense.notes || "",
    });
  };

  const handleSave = () => {
    dispatch(
      updateExpense({
        id: editing._id,
        updates: {
          title: editing.title,
          amount:
            editing.amount === ""
              ? 0
              : Number(editing.amount),
          expenseDate: editing.expenseDate,
          notes: editing.notes,
        },
      })
    );

    setEditing(null);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading expenses...
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
        {error && (
          <div className="p-4 bg-red-100 text-red-600">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="hidden lg:grid grid-cols-6 gap-4 px-6 py-4 border-b text-sm font-semibold">
          <span>Title</span>
          <span>Date</span>
          <span>Category</span>
          <span>Favorite</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No expenses found
          </div>
        )}

        {filteredExpenses.map((expense) => (
          <div
            key={expense._id}
            className={`px-4 sm:px-6 py-5 border-b ${
              isLight
                ? "border-gray-200 hover:bg-gray-50"
                : "border-white/10 hover:bg-white/5"
            }`}
          >
            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-6 gap-4 items-center">
              <div>{expense.title}</div>

              <div>
                {expense.expenseDate
                  ? new Date(
                      expense.expenseDate
                    ).toLocaleDateString()
                  : "-"}
              </div>

              <div>
                {expense.categoryId?.name ||
                  "General"}
              </div>

              <button
                onClick={() =>
                  dispatch(
                    toggleFavoriteExpense(
                      expense._id
                    )
                  )
                }
              >
                <Star
                  size={18}
                  fill={
                    expense.favorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <div className="font-semibold text-emerald-500">
                ₹
                {Number(
                  expense.amount || 0
                ).toFixed(2)}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleEdit(expense)
                  }
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    handleDelete(expense._id)
                  }
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
              <div
                className={`rounded-xl p-4 ${
                  isLight
                    ? "bg-gray-50"
                    : "bg-white/5"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {expense.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {expense.expenseDate
                        ? new Date(
                            expense.expenseDate
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div className="font-bold text-emerald-500">
                    ₹
                    {Number(
                      expense.amount || 0
                    ).toFixed(2)}
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span>
                    {expense.categoryId?.name ||
                      "General"}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        toggleFavoriteExpense(
                          expense._id
                        )
                      )
                    }
                  >
                    <Star
                      size={18}
                      fill={
                        expense.favorite
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      handleEdit(expense)
                    }
                    className="flex-1 py-2 rounded-lg bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(expense._id)
                    }
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL (UNCHANGED) */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
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
                placeholder="Title"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black"
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
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black"
              />

              <input
                type="date"
                value={editing.expenseDate || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    expenseDate: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black"
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
                placeholder="Notes"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-3 rounded-lg bg-gray-300 text-gray-900"
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

      {/* DELETE MODAL (ADDED ONLY LOGIC) */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-semibold mb-2">
              Delete Expense?
            </h2>

            <p className="text-sm text-gray-500">
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
                className="flex-1 py-3 rounded-lg bg-red-500 text-white"
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