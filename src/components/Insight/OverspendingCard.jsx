import { useMemo } from "react";

export default function OverspendingCard({ receipts }) {
  const isAlert = useMemo(() => {
    return receipts.length > 20; // simple logic
  }, [receipts]);

  return (
    <div className="p-6 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20">
      <h3 className="font-semibold mb-3">
        Overspending Alert
      </h3>

      {isAlert ? (
        <p className="text-red-600">
          High spending activity detected.
        </p>
      ) : (
        <p className="text-gray-500">
          Spending is under control.
        </p>
      )}
    </div>
  );
}
