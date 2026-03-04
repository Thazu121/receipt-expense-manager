import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function StatCard({ receipts = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const avg = useMemo(() => {
    if (!receipts.length) return 0;

    const total = receipts.reduce(
      (sum, r) => sum + Math.abs(Number(r.amount || 0)),
      0
    );

    return total / receipts.length;
  }, [receipts]);

  return (
    <div
      className="
        w-full
        p-4 sm:p-6
        rounded-2xl
        bg-white/80 dark:bg-[#0f2e24]/60
        border border-emerald-100 dark:border-green-800
        shadow-sm
        transition-all duration-300
      "
    >
      <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
        Average Transaction
      </h3>

      <p className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
        {formatCurrency(avg, currency)}
      </p>
    </div>
  );
}
