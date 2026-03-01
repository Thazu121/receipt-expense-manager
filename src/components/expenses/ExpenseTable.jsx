import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteReceipt,
  updateReceipt,
} from "../../redux/features/receiptSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ExpenseTable({ search = "" }) {
  const receipts = useSelector((state) => state.receipt.receipts);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  // 🔍 Filter + Sort
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
      id: id,
      updatedData: rest,
    })
  );

  setEditing(null);
};


  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-5 px-6 py-4 text-sm font-semibold border-b border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
          <span>Merchant</span>
          <span>Date</span>
          <span>Category</span>
          <span className="text-right">Amount</span>
          <span className="text-center">Actions</span>
        </div>

        {/* Rows */}
        {filteredReceipts.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No expenses found
          </div>
        )}

        {filteredReceipts.map((r) => (
          <div
            key={r.id}
            className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-5 items-center">
              <span className="font-medium">{r.store}</span>

              <span className="text-gray-500 dark:text-gray-400">
                {r.date
                  ? new Date(r.date).toLocaleDateString()
                  : "-"}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 w-fit">
                {r.category}
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
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Mobile */}
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
                • {r.category}
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setEditing(r)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(r.id)}
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

            {/* Merchant */}
            <input
              type="text"
              value={editing.store || ""}
              onChange={(e) =>
                setEditing({ ...editing, store: e.target.value })
              }
              placeholder="Merchant"
              className="w-full mb-3 p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />

            {/* Amount */}
            <input
              type="number"
              value={editing.amount || ""}
              onChange={(e) =>
                setEditing({ ...editing, amount: e.target.value })
              }
              placeholder="Amount"
              className="w-full mb-3 p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />

            {/* Date */}
            <input
              type="date"
              value={editing.date || ""}
              onChange={(e) =>
                setEditing({ ...editing, date: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />

            {/* Category */}
            <input
              type="text"
              value={editing.category || ""}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              placeholder="Category"
              className="w-full mb-4 p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
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
