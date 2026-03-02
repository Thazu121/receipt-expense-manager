import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addReceipt } from "../../redux/features/receiptSlice";
import { resetScan } from "../../redux/features/scanSlice";

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const { extracted = {}, confidence = 0, image } =
    useSelector((state) => state.scan);

  const { merchant, date, amount } = extracted;

  if (!merchant && !amount && !date && !success)
    return null;

  const confidencePercent =
    confidence <= 1
      ? Math.round(confidence * 100)
      : Math.round(confidence);

  const isLowConfidence = confidencePercent < 40;

  const handleSave = () => {
    dispatch(
      addReceipt({
        store: merchant,
        date: date,
        amount: amount,
        image: image,
        status: "Pending",
      })
    );

    setSuccess(true);

    setTimeout(() => {
      dispatch(resetScan());
      setSuccess(false);
    }, 2000);
  };

  const handleRetake = () => {
    dispatch(resetScan());
    setSuccess(false);
  };

  return (
    <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6 space-y-4">
      {success && (
        <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-sm">
          ✅ Expense Saved Successfully!
        </div>
      )}

      {merchant && !success && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Extracted Details
            </h2>

            <span
              className={
                isLowConfidence
                  ? "text-yellow-400"
                  : "text-green-400"
              }
            >
              {confidencePercent}% Confidence
            </span>
          </div>

          {isLowConfidence && (
            <div className="bg-yellow-500/20 text-yellow-400 p-2 rounded text-sm">
              Low scan accuracy. Please verify details.
            </div>
          )}

          <div className="bg-black/60 p-3 rounded-lg">
            {merchant || "Not detected"}
          </div>

          <div className="bg-black/60 p-3 rounded-lg">
            {date || "Date not detected"}
          </div>

          <div className="bg-black/60 p-3 rounded-lg">
            ₹ {amount || "Amount not detected"}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              disabled={!amount}
              onClick={handleSave}
              className={`flex-1 py-3 rounded-xl font-medium transition ${
                amount
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "bg-gray-500 text-black cursor-not-allowed"
              }`}
            >
              Save Expense
            </button>

            <button
              onClick={handleRetake}
              className="flex-1 border border-white py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Retake
            </button>
          </div>
        </>
      )}
    </div>
  );
}
