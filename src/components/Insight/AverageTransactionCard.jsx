import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Activity } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AverageTransactionCard({
  expenses = [],
}) {
  const currency = useSelector(
    (state) => state.settings.currency
  );

  const avg = useMemo(() => {
    if (!expenses.length) return 0;

    const total = expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

    return total / expenses.length;
  }, [expenses]);

  return (
    <div
      className="
        w-full
        h-full
        min-w-0

        p-4
        sm:p-5
        lg:p-6

        rounded-2xl

        bg-white
        dark:bg-[#0f172a]

        border
        border-gray-200
        dark:border-gray-700

        shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="
              text-base
              sm:text-lg

              font-semibold
              truncate
            "
          >
            Average Transaction
          </h3>

          <p
            className="
              mt-1

              text-xs
              sm:text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            Per expense record
          </p>
        </div>

        <div
          className="
            shrink-0

            w-10
            h-10

            sm:w-12
            sm:h-12

            rounded-xl

            flex
            items-center
            justify-center

            bg-emerald-100
            dark:bg-emerald-500/10
          "
        >
          <Activity
            size={22}
            className="text-emerald-500"
          />
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
        {formatCurrency(avg, currency)}
      </h2>

      <div
        className="
          mt-4

          pt-4

          border-t
          border-gray-100
          dark:border-gray-800
        "
      >
        <p
          className="
            text-xs
            sm:text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          Based on{" "}
          <span className="font-semibold">
            {expenses.length}
          </span>{" "}
          transaction
          {expenses.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}