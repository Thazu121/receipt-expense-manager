import { useDispatch } from "react-redux";
import {
  deleteReceipt,
  toggleStatus,
} from "../../redux/features/receiptSlice";

export default function ReceiptCard({ receipt }) {
  const dispatch = useDispatch();

  const { id, store, amount, date, image, status } =
    receipt;

  const statusColor =
    status === "Verified"
      ? "bg-green-500"
      : status === "Rejected"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      {image && (
        <img
          src={image}
          alt="Receipt"
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-lg">
          {store}
        </h2>

        <p className="text-sm text-gray-400">
          {date}
        </p>

        <p className="font-bold text-xl">
          ₹ {amount}
        </p>

        <div
          onClick={() => dispatch(toggleStatus(id))}
          className={`text-xs px-3 py-1 rounded-full inline-block cursor-pointer ${statusColor}`}
        >
          {status}
        </div>

        <button
          onClick={() => dispatch(deleteReceipt(id))}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
