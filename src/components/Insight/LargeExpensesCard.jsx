import { useMemo } from "react";
import { useSelector } from "react-redux";
import { WalletCards } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function LargeExpensesCard({
  expenses = [],
}) {
  const currency = useSelector(
    (state) => state.settings.currency
  );

  const topExpenses = useMemo(() => {
    return [...expenses]
      .sort(
        (a, b) =>
          Number(b.amount || 0) -
          Number(a.amount || 0)
      )
      .slice(0, 5);
  }, [expenses]);

  return (
    <div
      className="
        w-full
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
        overflow-hidden
      "
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-semibold">
          Largest Expenses
        </h3>

        <div
          className="
            w-10 h-10
            rounded-xl

            flex
            items-center
            justify-center

            bg-red-100
            dark:bg-red-500/10
          "
        >
          <WalletCards
            size={20}
            className="text-red-500"
          />
        </div>
      </div>

      {topExpenses.length === 0 ? (
        <div
          className="
            h-40

            flex
            items-center
            justify-center

            text-sm
            text-gray-400
          "
        >
          No expense data available
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {topExpenses.map(
            (expense, index) => (
              <div
                key={
                  expense._id ||
                  `${expense.title}-${index}`
                }
                className="
                  flex
                  items-center
                  justify-between
                  gap-3

                  p-3
                  sm:p-4

                  rounded-xl

                  bg-gray-50
                  dark:bg-white/5
                "
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="
                        text-xs
                        font-bold

                        text-red-500

                        shrink-0
                      "
                    >
                      #{index + 1}
                    </span>

                    <p
                      className="
                        font-semibold
                        text-sm
                        sm:text-base

                        truncate
                      "
                    >
                      {expense.title ||
                        expense.store ||
                        "Untitled"}
                    </p>
                  </div>

                  <p
                    className="
                      text-xs
                      sm:text-sm

                      text-gray-500
                      dark:text-gray-400

                      mt-1
                      truncate
                    "
                  >
                    {expense.category ||
                      "General"}
                  </p>
                </div>

                <p
                  className="
                    shrink-0

                    text-sm
                    sm:text-base

                    font-bold

                    text-red-500
                  "
                >
                  {formatCurrency(
                    expense.amount,
                    currency
                  )}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}