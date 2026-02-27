import { useDispatch } from "react-redux";
import { deleteReceipt } from "../../redux/features/receiptSlice";
import { Trash2 } from "lucide-react";

export default function ReceiptCard({ receipt }) {
  const dispatch = useDispatch();

  const {
    id,
    store,
    amount = 0,
    date,
    category,
    image,
  } = receipt || {};

  /* ----------------------------------
     Detect Currency Symbol
  ---------------------------------- */
  const getCurrency = (value) => {
    if (typeof value !== "string") return "₹"; // default
    if (value.includes("₹") || value.toLowerCase().includes("rs"))
      return "₹";
    if (value.includes("$")) return "$";
    return "₹";
  };

  const currency = getCurrency(amount);

  /* ----------------------------------
     Clean & Convert Amount Safely
  ---------------------------------- */
  const cleanAmount = (() => {
    if (typeof amount === "number") {
      return amount;
    }

    if (typeof amount === "string") {
      const cleaned = amount
        .replace("₹", "")
        .replace("$", "")
        .replace(/rs/gi, "")
        .replace(/,/g, "")
        .trim();

      return Number(cleaned) || 0;
    }

    return 0;
  })();

  const formattedAmount = cleanAmount.toLocaleString();

  return (
    <div
      className="
        bg-green-950/40 backdrop-blur-md
        border border-green-800
        rounded-2xl overflow-hidden
        hover:scale-[1.02] transition
        flex flex-col relative
      "
    >
      {/* 🔥 Delete Button */}
      <button
        onClick={() => dispatch(deleteReceipt(id))}
        className="
          absolute top-3 right-3
          bg-black/40 hover:bg-red-600
          p-2 rounded-full transition
        "
      >
        <Trash2 size={16} />
      </button>

      {/* Image Section */}
      {image ? (
        <img
          src={image}
          alt={store || "Receipt"}
          className="h-48 sm:h-56 w-full object-cover"
        />
      ) : (
        <div className="h-48 sm:h-56 w-full bg-green-900 flex items-center justify-center text-green-400 text-sm">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            {store || "Unknown Store"}
          </h3>

          <span className="text-green-400 font-semibold text-sm sm:text-base whitespace-nowrap">
            {currency} {formattedAmount}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-green-300 mt-2">
          {date || "No Date"}
        </p>

        <span
          className="
            inline-block mt-3 text-xs
            bg-green-800 text-green-300
            px-3 py-1 rounded-full
            w-fit
          "
        >
          {category || "General"}
        </span>
      </div>
    </div>
  );
}
