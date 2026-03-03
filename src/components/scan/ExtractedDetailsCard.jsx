import { useDispatch, useSelector } from "react-redux";
import { addReceipt } from "../../redux/features/receiptSlice";
import { resetScan } from "../../redux/features/scanSlice";

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();

  const { extracted, confidence, image } =
    useSelector((state) => state.scan);

  if (!image) return null;

  const { merchant, date, amount, category } =
    extracted;

  const confidencePercent =
    confidence <= 1
      ? Math.round(confidence * 100)
      : Math.round(confidence);

  const handleSave = () => {
    dispatch(
      addReceipt({
        store: merchant,
        date,
        amount,
        category,
        image,
        status: "Pending",
        source: "scan",
      })
    );

    dispatch(resetScan())
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-2xl text-white space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">
          Extracted Details
        </h2>
        <span className="text-green-400">
          {confidencePercent}% Confidence
        </span>
      </div>

      <div className="space-y-4">
        <Detail label="Merchant" value={merchant} />
        <Detail label="Date" value={date} />
        <Detail label="Amount" value={amount} />
        <Detail label="Category" value={category} />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl"
        >
          Save Expense
        </button>

        <button
          onClick={() => dispatch(resetScan())}
          className="flex-1 border border-zinc-600 py-3 rounded-xl"
        >
          Retake
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-lg font-semibold">
        {value || "Not detected"}
      </p>
    </div>
  );
}
