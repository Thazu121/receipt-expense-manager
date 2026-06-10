import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetScan } from "../../redux/features/scanSlice";
import { fetchExpenses } from "../../redux/features/expenseSlice";

import API from "../../api/api";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const parseDate = (dateStr) => {
  if (!dateStr) return null;

  const cleaned = String(dateStr).trim();

  const direct = new Date(cleaned);
  if (!isNaN(direct.getTime())) return direct;

  const match = cleaned.match(
    /^(\d{2})[\/.-](\d{2})[\/.-](\d{2,4})$/
  );

  if (match) {
    let [, d, m, y] = match;
    if (y.length === 2) y = "20" + y;

    const parsed = new Date(`${y}-${m}-${d}`);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
};

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { extracted, confidence, receiptId } = useSelector(
    (state) => state.scan
  );

  const isLight = useSelector((state) => state.theme.isLight);

  useEffect(() => {
    setMessage(null);
    setError(null);
    setSaved(false);
  }, [extracted]);

  if (!extracted?.merchant && !extracted?.amount) {
    return null;
  }

  const handleSaveExpense = async () => {
    if (saving || saved) return;

    try {
      setSaving(true);
      setError(null);

      const expenseRes = await API.post(
        "/expenses",
        {
          title: extracted.merchant || "Receipt Expense",
          amount: Number(extracted.amount) || 0,
          category: extracted.category || "General",
          expenseDate: parseDate(extracted.date) || new Date(),
          source: "ocr",
        },
        auth()
      );

      const expenseId = expenseRes?.data?.expense?._id;

      if (!expenseId) {
        throw new Error("Expense saved but expense ID missing");
      }

      if (receiptId) {
        try {
          await API.put(
            `/receipts/${receiptId}/link-expense`,
            { expenseId },
            auth()
          );
        } catch (linkErr) {
          if (linkErr?.response?.status !== 409) {
            throw linkErr;
          }
        }
      }

      setSaved(true);
      setMessage("Expense saved successfully ✅");

      dispatch(fetchExpenses());

      setTimeout(() => {
        dispatch(resetScan());
        setMessage(null);
        setError(null);
        setSaved(false);
      }, 1000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Save failed";

      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`w-full mt-6 rounded-2xl p-4 sm:p-6 shadow-lg border ${
        isLight
          ? "bg-white border-gray-200"
          : "bg-zinc-900 border-zinc-700 text-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">
        <h2 className="text-xl font-bold">Extracted Details</h2>

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

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {confidence < 60 && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-100 text-yellow-700">
          OCR confidence is low. Please verify before saving.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Detail label="Merchant" value={extracted.merchant} isLight={isLight} />

        <Detail
          label="Amount"
          value={extracted.amount ? `₹${extracted.amount}` : "Not detected"}
          isLight={isLight}
        />

        <Detail label="Date" value={extracted.date} isLight={isLight} />

        <Detail label="Category" value={extracted.category} isLight={isLight} />
      </div>

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

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSaveExpense}
          disabled={saving || saved}
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={() => dispatch(resetScan())}
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold"
        >
          Scan Another Receipt
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value, isLight }) {
  return (
    <div
      className={`p-4 rounded-xl ${
        isLight ? "bg-gray-50" : "bg-zinc-800"
      }`}
    >
      <p
        className={`text-sm mb-1 ${
          isLight ? "text-gray-500" : "text-zinc-400"
        }`}
      >
        {label}
      </p>

      <p className="font-semibold break-words">
        {value || "Not detected"}
      </p>
    </div>
  );
}