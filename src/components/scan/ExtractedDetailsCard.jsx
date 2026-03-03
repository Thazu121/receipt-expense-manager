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

  const receiptError = useSelector(
    (state) => state.receipt.error
  );

  if (!image) return null;

  const { merchant, date, amount, category } =
    extracted;

  /* ============================
     CLEAN AMOUNT (VERY IMPORTANT)
  ============================ */
  const cleanAmount = (value) => {
    if (!value) return "";

    return String(value)
      .replace(/[^\d.]/g, "") // remove ₹ , etc
      .trim();
  };

const handleSave = () => {
  const cleanedAmount = String(amount)
    .replace(/[^\d.]/g, "")
    .trim();

  // ✅ If date invalid → fallback to today
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
    <div className="bg-zinc-900 p-8 rounded-2xl text-white space-y-6 shadow-xl">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Extracted Details
        </h2>
        <span
          className={`font-medium ${
            confidencePercent >= 80
              ? "text-green-400"
              : confidencePercent >= 60
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {confidencePercent}% Confidence
        </span>
      </div>

      {/* IMAGE PREVIEW */}
      <div className="rounded-xl overflow-hidden border border-zinc-700">
        <img
          src={image}
          alt="Receipt Preview"
          className="w-full h-60 object-cover"
        />
      </div>

      {/* WARNINGS */}
      {warnings?.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/40 p-4 rounded-xl text-yellow-300 text-sm space-y-1">
          {warnings.map((w, i) => (
            <p key={i}>⚠ {w}</p>
          ))}
        </div>
      )}

      {/* RECEIPT VALIDATION ERROR */}
      {receiptError && (
        <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-xl text-red-400 text-sm">
          ❌ {receiptError}
        </div>
      )}

      {/* DETAILS */}
      <div className="space-y-4">
        <Detail label="Merchant" value={merchant} />
        <Detail label="Date" value={date} />
        <Detail
          label="Amount"
          value={cleanAmount(amount)}
        />
        <Detail label="Category" value={category} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Save Expense
        </button>

        <button
          onClick={() => dispatch(resetScan())}
          className="flex-1 border border-zinc-600 py-3 rounded-xl hover:bg-zinc-800 transition"
        >
          Retake
        </button>
      </div>
    </div>
  );
}

/* ============================
   REUSABLE DETAIL ROW
============================ */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-zinc-400">
        {label}
      </p>
      <p className="text-lg font-semibold">
        {value || "Not detected"}
      </p>
    </div>
  );
}
