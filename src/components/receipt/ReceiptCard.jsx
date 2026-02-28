import { useDispatch, useSelector } from "react-redux";
import { deleteReceipt } from "../../redux/features/receiptSlice";
import { setCurrentPage } from "../../redux/features/gallerySlice";
import { Trash2 } from "lucide-react";

export default function ReceiptCard({ receipt }) {
  const dispatch = useDispatch();

  const { currentPage, receiptsPerPage } = useSelector(
    (state) => state.gallery
  );

  const totalReceipts = useSelector(
    (state) => state.receipt.receipts.length
  );

  if (!receipt) return null;

  const {
    id,
    store = "Unknown Store",
    amount = 0,
    date = "No Date",
    category = "General",
    image,
  } = receipt;

  /* ---------------- Currency Detect ---------------- */
  const detectCurrency = (value) => {
    if (typeof value === "string") {
      if (value.includes("$")) return "$";
      if (value.includes("€")) return "€";
      if (value.includes("₹") || value.toLowerCase().includes("rs"))
        return "₹";
    }
    return "₹"; // default India
  };

  const currency = detectCurrency(amount);

  /* ---------------- Parse Amount ---------------- */
  const parseAmount = (value) => {
    if (typeof value === "number") return value;

    if (typeof value === "string") {
      return Number(
        value
          .replace(/[₹$€]/g, "")
          .replace(/rs/gi, "")
          .replace(/,/g, "")
          .trim()
      ) || 0;
    }

    return 0;
  };

  const numericAmount = parseAmount(amount);

  const formattedAmount = numericAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* ---------------- Handle Delete ---------------- */
  const handleDelete = () => {
    dispatch(deleteReceipt(id));

    // Prevent empty page after delete
    const newTotal = totalReceipts - 1;
    const newTotalPages = Math.ceil(newTotal / receiptsPerPage);

    if (currentPage > newTotalPages) {
      dispatch(setCurrentPage(newTotalPages || 1));
    }
  };

  return (
    <div
      className="
        bg-green-950/40 backdrop-blur-md
        border border-green-800
        rounded-2xl overflow-hidden
        hover:scale-[1.02] transition-all duration-300
        flex flex-col relative shadow-lg
      "
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="
          absolute top-3 right-3 z-10
          bg-black/40 hover:bg-red-600
          p-2 rounded-full transition
        "
      >
        <Trash2 size={16} />
      </button>

      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={store}
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
            {store}
          </h3>

          <span className="text-green-400 font-semibold text-sm sm:text-base whitespace-nowrap">
            {currency} {formattedAmount}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-green-300 mt-2">
          {date}
        </p>

        <span
          className="
            inline-block mt-3 text-xs
            bg-green-800 text-green-300
            px-3 py-1 rounded-full
            w-fit
          "
        >
          {category}
        </span>
      </div>
    </div>
  );
}
