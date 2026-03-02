import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteReceipt,
  updateReceipt,
  toggleStatus,
} from "../../redux/features/receiptSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ExpenseTable({ search = "" }) {
  const receipts = useSelector(
    (state) => state.receipt.receipts
  );
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  /* ===============================
     FILTER + SORT
  =============================== */
  const filteredReceipts = receipts
    .filter((r) =>
      r.store?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      dispatch(deleteReceipt(id));
    }
  };

  const handleSave = () => {
    const { id, ...rest } = editing;

    dispatch(
      updateReceipt({
        id,
        updatedData: {
          ...rest,
          amount: Number(rest.amount),
        },
      })
    );

    setEditing(null);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "Rejected":
        return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden">
        
        {/* HEADER */}
        <div className="hidden md:grid grid-cols-6 px-6 py-4 text-sm font-semibold border-b border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
          <span>Merchant</span>
          <span>Date</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
          <span className="text-center">Actions</span>
        </div>

        {/* EMPTY */}
        {filteredReceipts.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No expenses found
          </div>
        )}

        {/* ROWS */}
        {filteredReceipts.map((r) => (
          <div
            key={r.id}
            className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            {/* DESKTOP */}
            <div className="hidden md:grid grid-cols-6 items-center">
              <span className="font-medium">
                {r.store}
              </span>

              <span className="text-gray-500 dark:text-gray-400">
                {r.date
                  ? new Date(r.date).toLocaleDateString()
                  : "-"}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 w-fit">
                {r.category}
              </span>

              {/* STATUS BADGE */}
              <span
                onClick={() =>
                  dispatch(toggleStatus(r.id))
                }
                className={`cursor-pointer px-3 py-1 text-xs rounded-full w-fit transition ${statusStyle(
                  r.status
                )}`}
              >
                {r.status || "Pending"}
              </span>

              <span className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(r.amount)}
              </span>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setEditing(r)}
                  className="text-blue-500 hover:scale-110 transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    handleDelete(r.id)
                  }
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {r.store}
                </span>
                <span className="font-bold text-emerald-600">
                  {formatCurrency(r.amount)}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                {r.date
                  ? new Date(r.date).toLocaleDateString()
                  : "-"}{" "}
                • {r.category} •{" "}
                <span
                  onClick={() =>
                    dispatch(toggleStatus(r.id))
                  }
                  className={`cursor-pointer ${statusStyle(
                    r.status
                  )} px-2 py-1 rounded`}
                >
                  {r.status || "Pending"}
                </span>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setEditing(r)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(r.id)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f2e24] w-96 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-green-900">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Transaction
            </h3>

            <input
              type="text"
              value={editing.store || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  store: e.target.value,
                })
              }
              placeholder="Merchant"
              className="w-full mb-3 p-2 rounded-lg border"
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
              className="w-full mb-3 p-2 rounded-lg border"
            />

            <input
              type="date"
              value={editing.date || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  date: e.target.value,
                })
              }
              className="w-full mb-3 p-2 rounded-lg border"
            />

            <input
              type="text"
              value={editing.category || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value,
                })
              }
              placeholder="Category"
              className="w-full mb-3 p-2 rounded-lg border"
            />

            <select
              value={editing.status || "Pending"}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  status: e.target.value,
                })
              }
              className="w-full mb-4 p-2 rounded-lg border"
            >
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
