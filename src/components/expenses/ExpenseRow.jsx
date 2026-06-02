import { useSelector } from "react-redux";

export default function ExpenseRow({
  expense,
}) {
  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  return (
    <div
      className={`
        w-full
        px-3 sm:px-4 lg:px-6
        py-4
        transition-all
        duration-200
        overflow-hidden

        ${
          isLight
            ? `
              border-b
              border-gray-200
              hover:bg-gray-50
            `
            : `
              border-b
              border-white/5
              hover:bg-white/5
            `
        }
      `}
    >

      <div
        className="
          hidden
          md:grid
          md:grid-cols-5
          gap-4
          items-center
        "
      >
        <div className="font-semibold truncate">
          {expense.title || "Untitled"}
        </div>

        <div
          className={`text-sm ${
            isLight
              ? "text-gray-500"
              : "text-gray-400"
          }`}
        >
          {expense.date
            ? new Date(
                expense.date
              ).toLocaleDateString()
            : "-"}
        </div>

        <div>
          <span
            className={`
              inline-flex
              items-center
              px-3
              py-1
              rounded-full
              text-xs
              font-medium

              ${
                isLight
                  ? `
                    bg-emerald-100
                    text-emerald-700
                  `
                  : `
                    bg-emerald-500/20
                    text-emerald-400
                  `
              }
            `}
          >
            {expense.category ||
              "General"}
          </span>
        </div>

        <div
          className={`text-sm ${
            isLight
              ? "text-gray-500"
              : "text-gray-400"
          }`}
        >
          {expense.paymentMethod ||
            "Cash"}
        </div>

        <div
          className={`font-bold ${
            isLight
              ? "text-emerald-600"
              : "text-emerald-400"
          }`}
        >
          ₹
          {Number(
            expense.amount || 0
          ).toFixed(2)}
        </div>
      </div>

      {/* Mobile */}

      <div
        className="
          md:hidden
          flex
          flex-col
          gap-3
        "
      >
        <div
          className="
            flex
            justify-between
            items-start
            gap-3
          "
        >
          <div className="flex-1 min-w-0">
            <h3
              className="
                font-semibold
                truncate
              "
            >
              {expense.title ||
                "Untitled"}
            </h3>

            <p
              className={`text-xs mt-1 ${
                isLight
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              {expense.date
                ? new Date(
                    expense.date
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div
            className={`font-bold whitespace-nowrap ${
              isLight
                ? "text-emerald-600"
                : "text-emerald-400"
            }`}
          >
            ₹
            {Number(
              expense.amount || 0
            ).toFixed(2)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-medium

              ${
                isLight
                  ? `
                    bg-emerald-100
                    text-emerald-700
                  `
                  : `
                    bg-emerald-500/20
                    text-emerald-400
                  `
              }
            `}
          >
            {expense.category ||
              "General"}
          </span>

          <span
            className={`text-xs ${
              isLight
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            {expense.paymentMethod ||
              "Cash"}
          </span>
        </div>
      </div>
    </div>
  );
}