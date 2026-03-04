import { useDispatch, useSelector } from "react-redux";
import { addReceipt } from "../../redux/features/receiptSlice";
import { resetScan } from "../../redux/features/scanSlice";

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();

  const {
    extracted,
    confidence,
    image,
    warnings,
    isValid,
  } = useSelector((state) => state.scan);

  const receiptError = useSelector((state) => state.receipt.error);
  const isLight = useSelector((state) => state.theme.isLight);

  if (!image) return null;

  const { merchant, date, amount, category } = extracted;

  const cleanAmount = (value) => {
    if (!value) return "";
    return String(value).replace(/[^\d.]/g, "").trim();
  };

  const handleSave = () => {
    const cleanedAmount = String(amount)
      .replace(/[^\d.]/g, "")
      .trim();

    const finalDate =
      date && !isNaN(Date.parse(date))
        ? date
        : new Date().toISOString().split("T")[0];

    dispatch(
      addReceipt({
        store: merchant || "Unknown Store",
        date: finalDate,
        amount: cleanedAmount,
        category: category || "Other",
        image,
        status: "Pending",
        source: "scan",
      })
    );

    dispatch(resetScan());
  };

  const confidencePercent =
    confidence <= 1
      ? Math.round(confidence * 100)
      : Math.round(confidence);

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl transition-all duration-300
        ${
          isLight
            ? "bg-white border border-gray-200 text-black"
            : "bg-zinc-900 border border-zinc-700 text-white"
        }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">
          Extracted Details
        </h2>

        <span
          className={`font-medium text-sm sm:text-base ${
            confidencePercent >= 80
              ? "text-green-500"
              : confidencePercent >= 60
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {confidencePercent}% Confidence
        </span>
      </div>

      {/* Image Preview */}
      <div
        className={`rounded-xl overflow-hidden border ${
          isLight ? "border-gray-200" : "border-zinc-700"
        }`}
      >
        <img
          src={image}
          alt="Receipt Preview"
          className="w-full h-48 sm:h-60 object-cover"
        />
      </div>

      {/* Warnings */}
      {warnings?.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/40 p-4 rounded-xl text-yellow-600 dark:text-yellow-300 text-sm space-y-1">
          {warnings.map((w, i) => (
            <p key={i}>⚠ {w}</p>
          ))}
        </div>
      )}

      {/* Error */}
      {receiptError && (
        <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-xl text-red-500 text-sm">
          ❌ {receiptError}
        </div>
      )}

      {/* Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Detail label="Merchant" value={merchant} isLight={isLight} />
        <Detail label="Date" value={date} isLight={isLight} />
        <Detail
          label="Amount"
          value={cleanAmount(amount)}
          isLight={isLight}
        />
        <Detail label="Category" value={category} isLight={isLight} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Save Expense
        </button>

        <button
          onClick={() => dispatch(resetScan())}
          className={`flex-1 py-3 rounded-xl border transition ${
            isLight
              ? "border-gray-300 hover:bg-gray-100"
              : "border-zinc-600 hover:bg-zinc-800"
          }`}
        >
          Retake
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value, isLight }) {
  return (
    <div>
      <p
        className={`text-sm ${
          isLight ? "text-gray-500" : "text-zinc-400"
        }`}
      >
        {label}
      </p>
      <p className="text-base sm:text-lg font-semibold">
        {value || "Not detected"}
      </p>
    </div>
  );
}
