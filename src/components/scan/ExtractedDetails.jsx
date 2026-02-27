import { useDispatch, useSelector } from "react-redux";
import {
  addReceipt,
  clearScannedReceipt,
  setScannedReceipt,
} from "../../redux/features/receiptSlice";
import { useState } from "react";

export default function ExtractedDetails() {
  const dispatch = useDispatch();
  const scanned = useSelector(
    (state) => state.receipt.scannedReceipt
  );

  const [error, setError] = useState("");

  /* -----------------------------
     If No Scanned Data
  ------------------------------ */
  if (!scanned || Object.keys(scanned).length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No receipt scanned yet.
      </div>
    );
  }

  /* -----------------------------
     Handle Field Change
  ------------------------------ */
  const handleChange = (field, value) => {
    dispatch(
      setScannedReceipt({
        ...scanned,
        [field]: value,
      })
    );
  };

  /* -----------------------------
     Detect Currency
  ------------------------------ */
  const detectCurrency = (value) => {
    if (!value) return "";
    if (value.includes("₹") || value.includes("Rs")) return "₹";
    if (value.includes("$")) return "$";
    return "";
  };

  const currencySymbol = detectCurrency(scanned?.amount);

  /* -----------------------------
     Handle Save
  ------------------------------ */
  const handleSave = () => {
    setError("");

    if (!scanned.store || scanned.store.trim() === "") {
      setError("Merchant name is required.");
      return;
    }

    if (!scanned.amount || scanned.amount.trim() === "") {
      setError("Total amount is required.");
      return;
    }

    dispatch(
      addReceipt({
        id: Date.now(),
        ...scanned,
      })
    );

    dispatch(clearScannedReceipt());
  };

  return (
    <div
      className="
        w-full h-full flex flex-col
        rounded-2xl p-4 sm:p-6
        bg-white/70 backdrop-blur-md
        border border-emerald-100
        shadow-xl
        dark:bg-white/5
        dark:border-emerald-900
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Extracted Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-green-400">
            Review and edit the scanned information
          </p>
        </div>

        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-green-900 dark:text-green-400 px-3 py-1 rounded-full w-fit">
          98% CONFIDENCE
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Form Section */}
      <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-1">

        {/* Merchant */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">
            MERCHANT NAME
          </label>
          <input
            value={scanned?.store || ""}
            onChange={(e) =>
              handleChange("store", e.target.value)
            }
            className="w-full mt-1 p-3 rounded-xl bg-transparent border border-emerald-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Date + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">
              DATE
            </label>
            <input
              type="date"
              value={scanned?.date || ""}
              onChange={(e) =>
                handleChange("date", e.target.value)
              }
              className="w-full mt-1 p-3 rounded-xl bg-transparent border border-emerald-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">
              CATEGORY
            </label>
            <input
              value={scanned?.category || ""}
              onChange={(e) =>
                handleChange("category", e.target.value)
              }
              className="w-full mt-1 p-3 rounded-xl bg-transparent border border-emerald-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">
            TOTAL AMOUNT
          </label>

          <div className="relative">
            {currencySymbol && (
              <span className="absolute left-3 top-3 text-emerald-600 dark:text-green-400 font-semibold">
                {currencySymbol}
              </span>
            )}

            <input
              value={scanned?.amount || ""}
              onChange={(e) =>
                handleChange("amount", e.target.value)
              }
              className="w-full mt-1 p-3 pl-8 rounded-xl bg-transparent border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-green-400 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">
            NOTES (OPTIONAL)
          </label>
          <textarea
            value={scanned?.notes || ""}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
            rows={3}
            className="w-full mt-1 p-3 rounded-xl bg-transparent border border-emerald-200 dark:border-emerald-800 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition duration-300"
        >
          SAVE EXPENSE
        </button>

        <button
          onClick={() => dispatch(clearScannedReceipt())}
          className="w-full py-3 rounded-xl border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition duration-300"
        >
          RETAKE
        </button>
      </div>
    </div>
  );
}
