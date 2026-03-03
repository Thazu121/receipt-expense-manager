import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateReceipt } from "../../redux/features/receiptSlice";

export default function ReceiptPreviewModal({ receipt, onClose }) {
  const isLight = useSelector((state) => state.theme.isLight);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    store: receipt.store || "",
    date: receipt.date || "",
    amount: receipt.amount || "",
    category: receipt.category || "",
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(
      updateReceipt({
        id: receipt.id,
        updates: formData,
      })
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl
          ${isLight ? "bg-white text-gray-800" : "bg-zinc-900 text-white"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-zinc-700">
          <h2 className="text-lg font-semibold">
            Edit Receipt
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[85vh] overflow-y-auto">
          <img
            src={receipt.image}
            alt="receipt"
            className="w-full max-h-[450px] object-contain rounded-xl"
          />

          <div className="space-y-4">
            <Input
              label="Store"
              name="store"
              value={formData.store}
              onChange={handleChange}
            />

            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />

            <Input
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />

            <div>
              <label className="text-sm text-gray-400">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full mt-1 p-2 rounded-lg border
                  ${
                    isLight
                      ? "bg-white border-gray-300"
                      : "bg-zinc-800 border-zinc-700"
                  }`}
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Medical">Medical</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="font-semibold">{receipt.status}</p>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div>
      <label className="text-sm text-gray-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full mt-1 p-2 rounded-lg border
          ${
            isLight
              ? "bg-white border-gray-300"
              : "bg-zinc-800 border-zinc-700"
          }`}
      />
    </div>
  );
}
