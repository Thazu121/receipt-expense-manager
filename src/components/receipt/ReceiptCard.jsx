import { useDispatch, useSelector } from "react-redux";
import { Trash2, CheckCircle, Clock } from "lucide-react";

import {
  deleteReceipt,
  updateReceipt,
} from "../../redux/features/receiptSlice";

export default function ReceiptCard({ receipt, onClick }) {
  const dispatch = useDispatch();

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const verified =
    receipt?.isVerified === true ||
    receipt?.status === "Verified";

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
          isVerified: !verified,
          status: verified ? "Pending" : "Verified",
        },
      })
    );
  };

  return (
    <div
      onClick={() => onClick?.(receipt)}
      className={`
        w-full min-w-0
        rounded-2xl
        p-3 sm:p-4
        transition
        hover:scale-[1.01]
        cursor-pointer
        overflow-hidden
        ${
          isLight
            ? "bg-white border border-gray-200 shadow-md"
            : "bg-zinc-900 border border-zinc-700 shadow-lg"
        }
      `}
    >
      {receipt?.image && (
        <img
          src={receipt.image}
          alt="receipt"
          className="
            w-full
            h-36 sm:h-40 md:h-44
            object-cover
            rounded-xl
            mb-3
          "
        />
      )}

      <div className="min-w-0">
        <h3
          className={`text-sm sm:text-base font-semibold truncate ${
            isLight ? "text-gray-800" : "text-white"
          }`}
        >
          {receipt?.store ||
            receipt?.merchantName ||
            "Unknown Store"}
        </h3>

        <p
          className={`text-xs mt-1 ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {receipt?.date || receipt?.extractedDate
            ? new Date(
                receipt.date || receipt.extractedDate
              ).toLocaleDateString("en-IN")
            : "No date"}
        </p>

        <p className="text-green-500 font-bold mt-2 text-base sm:text-lg break-words">
          ₹
          {Number(
            receipt?.amount ||
              receipt?.extractedAmount ||
              0
          ).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 mt-4">
        <button
          type="button"
          onClick={handleToggleStatus}
          className={`
            min-w-0
            inline-flex
            items-center
            gap-1.5
            text-xs
            px-3
            py-1.5
            rounded-full
            capitalize
            transition
            ${
              verified
                ? "bg-green-500/20 text-green-500"
                : "bg-yellow-500/20 text-yellow-500"
            }
          `}
        >
          {verified ? (
            <CheckCircle size={14} />
          ) : (
            <Clock size={14} />
          )}

          <span className="truncate">
            {verified ? "verified" : "pending"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="
            shrink-0
            p-2
            rounded-lg
            bg-red-500/20
            text-red-500
            hover:bg-red-500/30
            transition
          "
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}