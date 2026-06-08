import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecurring } from "../../redux/features/recurringSlice";
import { X } from "lucide-react";

export default function RecurringModal({ onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Bills",
    frequency: "monthly",
    nextDueDate: new Date().toISOString().split("T")[0],
    note: "",
  });

  const categories = [
    "Rent",
    "EMI",
    "Bills",
    "Subscription",
    "Internet",
    "Insurance",
    "Medical",
    "Education",
    "Transport",
    "General",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      addRecurring({
        ...form,
        amount: Number(form.amount),
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div
        className="
          w-full
          sm:max-w-md
          max-h-[92vh]
          overflow-y-auto
          rounded-t-3xl
          sm:rounded-2xl
          bg-white
          dark:bg-zinc-900
          p-4
          sm:p-6
          shadow-xl
          border
          dark:border-zinc-700
        "
      >
        <div className="flex items-center justify-between mb-5 sticky top-0 bg-white dark:bg-zinc-900 pb-3 z-10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">
              Add Recurring Expense
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Create rent, EMI, bills or subscription rules.
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Netflix, Rent, EMI"
              required
              className="input-style"
            />
          </Field>

          <Field label="Amount">
            <input
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="input-style"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-style"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Frequency">
              <select
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                className="input-style"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </Field>
          </div>

          <Field label="Next Due Date">
            <input
              name="nextDueDate"
              type="date"
              value={form.nextDueDate}
              onChange={handleChange}
              required
              className="input-style"
            />
          </Field>

          <Field label="Note">
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Optional note"
              rows="3"
              className="input-style resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 sticky bottom-0 bg-white dark:bg-zinc-900 py-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border py-3 dark:border-zinc-700 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}