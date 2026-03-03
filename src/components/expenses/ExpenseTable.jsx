import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteReceipt,
  updateReceipt,
  toggleStatus,
} from "../../redux/features/receiptSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ExpenseTable({ search = "" }) {
  const { receipts, error } = useSelector(
    (state) => state.receipt
  )


  const dispatch = useDispatch()
  const [editing, setEditing] = useState(null)
  const [openStatus, setOpenStatus] = useState(false);
  const statusRef = useRef(null)


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setEditing(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ===============================
     FILTER + SORT
  =============================== */
  const filteredReceipts = receipts
    .filter((r) =>
      r.store?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      dispatch(deleteReceipt(id));
    }
  };

  /* ===============================
     SAVE EDIT
  =============================== */
  const handleSave = () => {
    dispatch(
      updateReceipt({
        id: editing.id,
        updates: {
          store: editing.store,
          amount: Number(editing.amount),
          date: editing.date,
          category: editing.category,
          status: editing.status,
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
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setOpenStatus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden">

        {error && (
          <div className="p-4 bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="hidden md:grid grid-cols-6 px-6 py-4 text-sm font-semibold border-b border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
          <span>Merchant</span>
          <span>Date</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
          <span className="text-center">Actions</span>
        </div>

        {filteredReceipts.length === 0 && (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            No expenses found
          </div>
        )}

        {filteredReceipts.map((r) => (
          <div
            key={r.id}
            className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            <div className="hidden md:grid grid-cols-6 items-center">

              <span className="font-medium text-gray-800 dark:text-white">
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
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="md:hidden space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800 dark:text-white">
                  {r.store}
                </span>

                <span className="font-bold text-emerald-600">
                  {formatCurrency(r.amount)}
                </span>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
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

      {editing && (
        <div
          onClick={() => setEditing(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[400px] max-w-[95%] rounded-2xl p-6 shadow-2xl border
            bg-white dark:bg-[#0f2e24]
            border-gray-200 dark:border-green-900"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              Edit Transaction
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={editing.store ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, store: e.target.value })
                }
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-white/10 dark:text-white"
                placeholder="Merchant"
              />

              <input
                type="number"
                value={editing.amount ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, amount: e.target.value })
                }
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-white/10 dark:text-white"
                placeholder="Amount"
              />

              <input
                type="date"
                value={
                  editing.date
                    ? new Date(editing.date)
                      .toISOString()
                      .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-white/10 dark:text-white"
              />

              <input
                type="text"
                value={editing.category ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-white/10 dark:text-white"
                placeholder="Category"
              />
              <div className="relative" ref={statusRef}>
                <div
                  onClick={() => setOpenStatus(!openStatus)}
                  className="
      w-full p-3 rounded-lg border
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-white
      border-gray-300 dark:border-gray-600
      cursor-pointer
      flex justify-between items-center
    "
                >
                  {editing.status || "Pending"}
                  <span className="text-sm">▼</span>
                </div>

                {openStatus && (
                  <div className="
      absolute left-0 mt-2 w-full rounded-lg
      bg-white dark:bg-gray-800
      border border-gray-300 dark:border-gray-600
      shadow-lg z-50 overflow-hidden
    ">
                    {["Pending", "Verified", "Rejected"].map((status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setEditing({ ...editing, status });
                          setOpenStatus(false);
                        }}
                        className="
            px-4 py-2 cursor-pointer
            hover:bg-emerald-500 hover:text-white
            transition
          "
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
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
