import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import {
  deleteReceipt,
  updateReceipt,
} from "../../redux/features/receiptSlice";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const receipts = useSelector((state) => state.receipt.receipts);
  const isLight = useSelector((state) => state.theme.isLight);

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  // ================= FILTER =================
  const filteredReceipts = useMemo(() => {
    return receipts.filter((r) =>
      r.store?.toLowerCase().includes(search.toLowerCase()) ||
      r.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [receipts, search]);

  // ================= CALCULATIONS =================
  const income = receipts
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const expense = receipts
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const balance = income - expense;

  // ================= EDIT =================
  const handleEdit = (receipt) => {
    setEditing(receipt.id);
    setFormData(receipt);
  };

  const handleUpdate = () => {
    dispatch(
      updateReceipt({
        id: editing,
        updatedData: formData,
      })
    );
    setEditing(null);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isLight ? "bg-gray-50 text-gray-800" : "bg-[#0f172a] text-white"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-8">Transactions</h2>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm">Income</p>
          <h3 className="text-2xl font-bold text-emerald-500">
            ₹{income}
          </h3>
        </div>

        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm">Expense</p>
          <h3 className="text-2xl font-bold text-red-500">
            ₹{expense}
          </h3>
        </div>

        <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm">Balance</p>
          <h3
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            ₹{balance}
          </h3>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Merchant or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-3 rounded-lg border ${
            isLight
              ? "bg-white border-gray-300"
              : "bg-[#1E293B] border-gray-700"
          }`}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-700">
        <table className="min-w-[700px] w-full text-sm text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-6 py-3">Merchant</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReceipts.map((receipt) => (
              <tr key={receipt.id} className="border-b border-gray-800">
                {/* STORE */}
                <td className="px-6 py-4">
                  {editing === receipt.id ? (
                    <input
                      value={formData.store}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          store: e.target.value,
                        })
                      }
                      className="p-1 rounded bg-gray-200 text-black"
                    />
                  ) : (
                    receipt.store
                  )}
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-4">
                  {editing === receipt.id ? (
                    <input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="p-1 rounded bg-gray-200 text-black"
                    />
                  ) : (
                    receipt.category
                  )}
                </td>

                {/* AMOUNT */}
                <td className="px-6 py-4">
                  {editing === receipt.id ? (
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount: e.target.value,
                        })
                      }
                      className="p-1 rounded bg-gray-200 text-black"
                    />
                  ) : (
                    <span
                      className={
                        receipt.type === "income"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    >
                      ₹{receipt.amount}
                    </span>
                  )}
                </td>

                {/* DATE */}
                <td className="px-6 py-4">{receipt.date}</td>

                {/* TYPE */}
                <td className="px-6 py-4 capitalize">
                  {receipt.type}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {editing === receipt.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="px-2 py-1 text-xs md:px-3 md:py-1 rounded bg-emerald-500 text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-2 py-1 text-xs md:px-3 md:py-1 rounded bg-gray-500 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(receipt)}
                        className="px-2 py-1 text-xs md:px-3 md:py-1 rounded bg-blue-500 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          dispatch(deleteReceipt(receipt.id))
                        }
                        className="px-2 py-1 text-xs md:px-3 md:py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReceipts.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}
