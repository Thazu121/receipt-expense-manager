import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CashFlowCard({ receipts = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const total = useMemo(() => {
    return receipts.reduce(
      (sum, r) => sum + Number(r.amount || 0),
      0
    );
  }, [receipts]);

  return (
    <div
      className="
        w-full
        p-4 sm:p-6
        rounded-2xl
        bg-gradient-to-br from-emerald-500 to-green-600
        text-white
        shadow-lg
        transition-all duration-300
      "
    >
      <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
        Cash Flow
      </h3>

      <div className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
        {formatCurrency(total, currency)}
      </div>

      <p className="text-xs sm:text-sm mt-2 opacity-80">
        Net movement
      </p>
    </div>
  );
}
