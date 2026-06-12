import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { Wallet, TrendingUp } from "lucide-react";

export default function CashFlowCard({ expenses = [] }) {
  const currency = useSelector(
    (state) => state.settings.currency
  );

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div
      className="
        relative
        overflow-hidden

        w-full
        min-w-0

        rounded-2xl

        bg-gradient-to-br
        from-emerald-500
        via-green-500
        to-green-600

        text-white

        shadow-lg

        p-4
        sm:p-5
        lg:p-6
      "
    >
      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-white/80">
              Financial Summary
            </p>

            <h3 className="text-base sm:text-lg font-semibold mt-1">
              Total Spending
            </h3>
          </div>

          <div
            className="
              shrink-0

              w-10 h-10
              sm:w-12 sm:h-12

              rounded-xl

              bg-white/20

              flex
              items-center
              justify-center
            "
          >
            <Wallet size={22} />
          </div>
        </div>

        <h2
          className="
            mt-5

            text-2xl
            sm:text-3xl
            lg:text-4xl

            font-bold

            break-words
          "
        >
          {formatCurrency(total, currency)}
        </h2>

        <div className="mt-4 flex items-center gap-2 text-white/90">
          <TrendingUp size={16} />

          <p className="text-xs sm:text-sm">
            Based on selected report range
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/20">
          <p className="text-xs sm:text-sm text-white/75">
            Expense Analytics Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}