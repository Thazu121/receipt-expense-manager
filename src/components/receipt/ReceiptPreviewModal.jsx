import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateReceipt } from "../../redux/features/receiptSlice";



export default function ReceiptPreviewModal({ receipt, onClose }) {
  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const dispatch = useDispatch();



  const [formData, setFormData] = useState({
    store: "",
    date: "",
    amount: "",
    category: "General",
  });

  useEffect(() => {
    if (receipt) {
      setFormData({
        store: receipt.store || "",
        date: receipt.date || "",
        amount: receipt.amount || "",
        category: receipt.category || "General",
      })
    }
  }, [receipt]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    dispatch(
      updateReceipt({
        id: receipt._id,
        updates: {
          merchantName: formData.store,
          extractedAmount: Number(formData.amount),
          extractedDate: formData.date,
          category: formData.category,
        },
      })
    );

    onClose();
  };

  const inputStyle = `w-full mt-1 p-3 rounded-lg border text-sm outline-none transition ${isLight
    ? "bg-white border-gray-300 text-black"
    : "bg-zinc-800 border-zinc-700 text-white"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${isLight ? "bg-white text-gray-800" : "bg-zinc-900 text-white"
          }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold">
            Edit Receipt
          </h2>
          <button
            onClick={onClose}
            className="text-lg font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 p-4 sm:p-6">

          <div className="flex justify-center items-start">
            <img
              src={receipt.image}
              alt="receipt"
              className="w-full max-h-[350px] md:max-h-[500px] object-contain rounded-xl border"
            />
          </div>

          <div className="space-y-4 sm:space-y-5">

            <div>
              <label className="text-sm text-gray-400">Store</label>
              <input
                name="store"
                value={formData.store}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter store name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Food">🍔 Food</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Bills">💡 Bills</option>
                <option value="Health">🏥 Health</option>
                <option value="Education">📚 Education</option>
                <option value="Entertainment">🎬 Entertainment</option>
                <option value="Travel">✈️ Travel</option>
                <option value="Salary">💰 Salary</option>
                <option value="General">📦 General</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-4 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}