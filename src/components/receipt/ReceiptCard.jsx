import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteReceipt, updateReceipt } from "../../redux/features/receiptSlice";

export default function ReceiptCard({ receipt, onClick }) {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteReceipt(receipt._id));
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();

    dispatch(
      updateReceipt({
        id: receipt._id,
        updates: {
          isVerified: !receipt.verified,
        },
      })
    );
  };

  return (
    <div
      onClick={() => onClick?.(receipt)}
      className={`rounded-2xl p-4 transition hover:scale-[1.02] cursor-pointer ${
        isLight
          ? "bg-white border border-gray-200 shadow-md"
          : "bg-zinc-900 border border-zinc-700 shadow-lg"
      }`}
    >
      {/* IMAGE */}
      {receipt.image && (
        <img
          src={receipt.image}
          alt="receipt"
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}

      {/* STORE */}
      <h3
        className={`font-semibold truncate ${
          isLight ? "text-gray-800" : "text-white"
        }`}
      >
        {receipt.store || "Unknown Store"}
      </h3>

      {/* DATE */}
      <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>
        {receipt.date
          ? new Date(receipt.date).toLocaleDateString()
          : "No date"}
      </p>

      {/* AMOUNT */}
      <p className="text-green-500 font-bold mt-2">
        ₹{Number(receipt.amount || 0).toFixed(2)}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4">
        {/* STATUS */}
        <span
          onClick={handleToggleStatus}
          className={`text-xs px-3 py-1 rounded-full cursor-pointer capitalize ${
            receipt.verified
              ? "bg-green-500/20 text-green-500"
              : "bg-yellow-500/20 text-yellow-500"
          }`}
        >
          {receipt.verified ? "verified" : "pending"}
        </span>

        {/* DELETE */}
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}