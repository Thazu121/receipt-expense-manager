import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBudget,
  deleteBudget,
} from "../redux/features/budgetSlice";

export default function BudgetForm() {
  const dispatch = useDispatch();
  const receipts = useSelector((state) => state.receipt.receipts);
  const budgets = useSelector((state) => state.budget.budgets);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(currentMonth);
  const [editId, setEditId] = useState(null);


  const categories = useMemo(() => {
    const defaultCategories = [
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Health",
      "Entertainment",
    ];

    const unique = new Set(defaultCategories);

    receipts.forEach((r) => {
      if (r.category) unique.add(r.category);
    });

    return Array.from(unique);
  }, [receipts]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !month) return;

    dispatch(
      setBudget({
        category,
        amount: Number(amount),
        month,
      })
    );

    resetForm();
  };

  const resetForm = () => {
    setCategory("");
    setAmount("");
    setMonth(currentMonth);
    setEditId(null);
  };


  const handleEdit = (budget) => {
    setCategory(budget.category);
    setAmount(budget.amount);
    setMonth(budget.month);
    setEditId(budget.id);
  };

  
  const handleDelete = (id) => {
    dispatch(deleteBudget({ id }));
  };

  /* ============================
     Filter Budgets by Month
  ============================ */
  const filteredBudgets = budgets.filter(
    (b) => b.month === month
  );

  return (
    <div className="space-y-8">

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-[#111827] border border-gray-800 space-y-4"
      >
        <h2 className="text-white text-lg font-semibold">
          {editId ? "Edit Budget" : "Set Budget"}
        </h2>

        {/* Month Selector */}
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 text-white"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 text-white"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Amount */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 text-white"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded bg-emerald-600 hover:bg-emerald-700 transition"
          >
            {editId ? "Update Budget" : "Save Budget"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-3 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ================= BUDGET LIST ================= */}
      <div className="rounded-2xl border border-gray-800 overflow-hidden bg-[#0f172a]">
        <div className="grid grid-cols-4 px-6 py-4 bg-[#111827] text-gray-400 text-sm">
          <div>Category</div>
          <div>Amount</div>
          <div>Month</div>
          <div>Actions</div>
        </div>

        {filteredBudgets.length === 0 && (
          <div className="px-6 py-6 text-gray-500">
            No budgets set for this month
          </div>
        )}

        {filteredBudgets.map((cat,index) => (
          <div
            key={cat.id}
            className="grid grid-cols-4 px-6 py-4 border-t border-gray-800 items-center text-white hover:bg-[#111827] transition"
          >
            <div>{cat.category}</div>
            <div>₹{cat.amount}</div>
            <div>{cat.month}</div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
