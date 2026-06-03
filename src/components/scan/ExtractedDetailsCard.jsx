import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetScan } from "../../redux/features/scanSlice";
import API from "../../api/api";

/**
 * SAFE OCR DATE PARSER
 */
const parseDate = (dateStr) => {
  if (!dateStr) return null;

  dateStr = dateStr.trim();

  // ISO / normal JS date
  const direct = new Date(dateStr);
  if (!isNaN(direct.getTime())) {
    return direct;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const match = dateStr.match(/^(\d{2})[\/.-](\d{2})[\/.-](\d{2,4})$/);

  if (match) {
    let [, d, m, y] = match;

    if (y.length === 2) {
      y = "20" + y;
    }

    return new Date(`${y}-${m}-${d}`);
  }

  return null;
};

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { extracted, confidence } = useSelector((state) => state.scan);
  const isLight = useSelector((state) => state.theme.isLight);

  // ✅ RESET UI WHEN NEW OCR ARRIVES
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [extracted]);

  if (!extracted?.merchant && !extracted?.amount) {
    return null;
  }
const handleSaveExpense = async () => {
  if (saving) return;

  setError(null);

  try {
    setSaving(true);

    await API.post("/expenses", {
      title: extracted.merchant || "Receipt Expense",
      amount: Number(extracted.amount) || 0,
      category: extracted.category || "General",
      expenseDate: parseDate(extracted.date) || new Date(),
      notes: "Added from OCR receipt scan",
      source: "ocr",
    });

    // STEP 1: show message
    setMessage("Expense saved successfully ✅");

    // STEP 2: WAIT FOR RENDER FIRST
    requestAnimationFrame(() => {
      setTimeout(() => {
        dispatch(resetScan());
      }, 1200);
    });

  } catch (err) {
    setError(err?.response?.data?.message || "Failed to save expense ❌");
  } finally {
    setSaving(false);
  }
};
  return (
    <div
      className={`w-full mt-6 rounded-2xl p-4 sm:p-6 shadow-lg border transition-all ${
        isLight
          ? "bg-white border-gray-200"
          : "bg-zinc-900 border-zinc-700 text-white"
      }`}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-5">
        <h2 className="text-lg sm:text-xl font-bold">
          Extracted Details
        </h2>

        <span
          className={`font-semibold ${
            confidence >= 80
              ? "text-green-500"
              : confidence >= 60
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {Math.round(confidence || 0)}% Confidence
        </span>
      </div>

      {/* SUCCESS / ERROR */}
      {message && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* LOW CONFIDENCE WARNING */}
      {confidence < 60 && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-100 text-yellow-700 text-sm">
          Low OCR confidence. Please upload a clearer receipt.
        </div>
      )}

      {/* DETAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Detail label="Merchant" value={extracted.merchant} isLight={isLight} />

        <Detail
          label="Amount"
          value={
            extracted.amount ? `₹${extracted.amount}` : "Not detected"
          }
          isLight={isLight}
        />

        <Detail label="Date" value={extracted.date} isLight={isLight} />

        <Detail label="Category" value={extracted.category} isLight={isLight} />
      </div>

      {/* OCR TEXT */}
      {extracted.rawText && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">OCR Text</h3>

          <div
            className={`p-3 rounded-xl text-sm max-h-52 overflow-y-auto ${
              isLight ? "bg-gray-100" : "bg-zinc-800"
            }`}
          >
            <pre className="whitespace-pre-wrap break-words">
              {extracted.rawText}
            </pre>
          </div>
        </div>
      )}

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSaveExpense}
          disabled={saving}
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save as Expense"}
        </button>

        <button
          onClick={() => {
            setMessage(null);
            setError(null);
            dispatch(resetScan());
          }}
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold transition"
        >
          Scan Another Receipt
        </button>
      </div>
    </div>
  );
}

/**
 * DETAIL COMPONENT
 */
function Detail({ label, value, isLight }) {
  return (
    <div
      className={`p-4 rounded-xl transition ${
        isLight ? "bg-gray-50" : "bg-zinc-800"
      }`}
    >
      <p
        className={`text-xs sm:text-sm mb-1 ${
          isLight ? "text-gray-500" : "text-zinc-400"
        }`}
      >
        {label}
      </p>

      <p className="font-semibold break-words text-sm sm:text-base">
        {value || "Not detected"}
      </p>
    </div>
  );
}