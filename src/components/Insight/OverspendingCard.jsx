import { useMemo } from "react";

export default function OverspendingCard({ receipts = [] }) {
  const isAlert = useMemo(() => {
    return receipts.length > 20;
  }, [receipts]);

  return (
    <div
      className={`
        w-full
        p-4 sm:p-6
        rounded-2xl
        border
        transition-all duration-300
        ${
          isAlert
            ? "border-red-300 bg-red-50 dark:bg-red-900/20"
            : "border-gray-200 bg-gray-50 dark:bg-white/5"
        }
      `}
    >
      <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
        Overspending Alert
      </h3>

      {isAlert ? (
        <p className="text-sm sm:text-base text-red-600 dark:text-red-400 font-medium">
          High spending activity detected.
        </p>
      ) : (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Spending is under control.
        </p>
      )}
    </div>
  );
}
