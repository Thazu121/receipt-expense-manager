import { useSelector } from "react-redux";

export default function ExpenseRow({
  receipt,
}) {

  const isLight =
    useSelector(
      (state) => state.theme.isLight
    );

  return (

    <div
      className={`
        w-full

        px-3
        sm:px-4
        lg:px-6

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

      {/* ====================================== */}
      {/* DESKTOP TABLE */}
      {/* ====================================== */}

      <div
        className="
          hidden
          md:grid

          md:grid-cols-4

          gap-4
          items-center
        "
      >

        {/* MERCHANT */}

        <div
          className="
            font-semibold

            truncate
          "
        >
          {receipt.merchant || "Unknown"}
        </div>


        {/* DATE */}

        <div
          className={`
            text-sm

            ${
              isLight
                ? "text-gray-500"
                : "text-gray-400"
            }
          `}
        >

          {receipt.date
            ? new Date(
                receipt.date
              ).toLocaleDateString()
            : "-"}

        </div>


        {/* CATEGORY */}

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

              whitespace-nowrap

              ${
                isLight
                  ? `
                    bg-emerald-100
                    text-emerald-600
                  `
                  : `
                    bg-emerald-500/20
                    text-emerald-400
                  `
              }
            `}
          >

            {receipt.category || "General"}

          </span>

        </div>


        {/* AMOUNT */}

        <div
          className={`
            font-bold
            text-base

            ${
              isLight
                ? "text-emerald-600"
                : "text-emerald-400"
            }
          `}
        >

          ₹
          {Number(
            receipt.amount || 0
          ).toFixed(2)}

        </div>

      </div>


      {/* ====================================== */}
      {/* MOBILE CARD */}
      {/* ====================================== */}

      <div
        className="
          md:hidden

          flex
          flex-col

          gap-3
        "
      >

        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-3
          "
        >

          <div
            className="
              flex-1
              min-w-0
            "
          >

            <h3
              className="
                font-semibold
                text-sm
                sm:text-base

                truncate
              "
            >
              {receipt.merchant ||
                "Unknown"}
            </h3>

            <p
              className={`
                text-xs
                mt-1

                ${
                  isLight
                    ? "text-gray-500"
                    : "text-gray-400"
                }
              `}
            >

              {receipt.date
                ? new Date(
                    receipt.date
                  ).toLocaleDateString()
                : "-"}

            </p>

          </div>


          {/* AMOUNT */}

          <div
            className={`
              font-bold
              text-sm
              sm:text-base

              whitespace-nowrap

              ${
                isLight
                  ? "text-emerald-600"
                  : "text-emerald-400"
              }
            `}
          >

            ₹
            {Number(
              receipt.amount || 0
            ).toFixed(2)}

          </div>

        </div>


        {/* CATEGORY */}

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
                    text-emerald-600
                  `
                  : `
                    bg-emerald-500/20
                    text-emerald-400
                  `
              }
            `}
          >

            {receipt.category || "General"}

          </span>

        </div>

      </div>

    </div>
  );
}