import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  resetScan,
} from "../../redux/features/scanSlice";

export default function ExtractedDetailsCard() {
  const dispatch = useDispatch();

  const {
    extracted,
    confidence,
  } = useSelector(
    (state) => state.scan
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  if (
    !extracted?.merchant &&
    !extracted?.amount
  ) {
    return null;
  }

  return (
    <div
      className={`w-full mt-6 rounded-2xl p-4 sm:p-6 shadow-lg border
      ${
        isLight
          ? "bg-white border-gray-200"
          : "bg-zinc-900 border-zinc-700 text-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-5">
        <h2 className="text-lg sm:text-xl font-bold">
          Extracted Details
        </h2>

        <span
          className={`font-semibold
          ${
            confidence >= 80
              ? "text-green-500"
              : confidence >= 60
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {Math.round(
            confidence
          )}
          % Confidence
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Detail
          label="Merchant"
          value={
            extracted.merchant
          }
          isLight={isLight}
        />

        <Detail
          label="Amount"
          value={`₹${extracted.amount}`}
          isLight={isLight}
        />

        <Detail
          label="Date"
          value={extracted.date}
          isLight={isLight}
        />

        <Detail
          label="Category"
          value={
            extracted.category
          }
          isLight={isLight}
        />
      </div>

      {extracted.rawText && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            OCR Text
          </h3>

          <div
            className={`p-3 rounded-xl text-sm max-h-52 overflow-y-auto
            ${
              isLight
                ? "bg-gray-100"
                : "bg-zinc-800"
            }`}
          >
            <pre className="whitespace-pre-wrap break-words">
              {
                extracted.rawText
              }
            </pre>
          </div>
        </div>
      )}

      <button
        onClick={() =>
          dispatch(
            resetScan()
          )
        }
        className="w-full mt-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold transition"
      >
        Scan Another Receipt
      </button>
    </div>
  );
}

function Detail({
  label,
  value,
  isLight,
}) {
  return (
    <div
      className={`p-4 rounded-xl
      ${
        isLight
          ? "bg-gray-50"
          : "bg-zinc-800"
      }`}
    >
      <p
        className={`text-sm mb-1
        ${
          isLight
            ? "text-gray-500"
            : "text-zinc-400"
        }`}
      >
        {label}
      </p>

      <p className="font-semibold break-words">
        {value ||
          "Not detected"}
      </p>
    </div>
  );
}