import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SpendingChart() {

  const receipts = useSelector(
    (state) => state.receipt.receipts
  );

  const data = useMemo(() => {

    if (!receipts || !receipts.length)
      return [];

    const monthly = {};

    receipts.forEach((r) => {

      if (!r.date) return;

      const date = new Date(r.date);

      if (isNaN(date)) return;

      const key = `${date.getFullYear()}-${date.getMonth()}`;

      monthly[key] =
        (monthly[key] || 0) +
        Math.abs(Number(r.amount) || 0);

    });

    return Object.entries(monthly)
      .map(([key, amount]) => {

        const [year, month] = key.split("-");

        const date = new Date(year, month);

        return {
          month: date.toLocaleString("default", {
            month: "short",
          }),
          amount,
        };
      })
      .sort((a, b) => a.amount - b.amount);

  }, [receipts]);



  if (!data.length) {

    return (

      <div
        className="
          w-full
          rounded-2xl
          bg-white
          dark:bg-[#0F1B22]
          p-4
          sm:p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-base
            sm:text-lg
            font-semibold
          "
        >
          Spending Trends
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-gray-500
          "
        >
          No chart data
        </p>

      </div>
    );
  }



  const maxAmount = Math.max(
    ...data.map((d) => d.amount)
  );



  return (

    <div
      className="
        w-full
        overflow-hidden

        rounded-2xl

        bg-white
        dark:bg-[#0F1B22]

        p-4
        sm:p-6

        shadow-sm
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <h2
          className="
            text-base
            sm:text-lg
            font-semibold
          "
        >
          Spending Trends
        </h2>

      </div>



      <div
        className="
          w-full
          overflow-x-auto
        "
      >

        <div
          className="
            flex
            items-end
            gap-3
            sm:gap-5

            min-w-max

            h-56
            sm:h-72

            pb-2
          "
        >

          {data.map((item, index) => {

            const height =
              maxAmount
                ? (item.amount / maxAmount) * 220
                : 0;

            const isHighest =
              item.amount === maxAmount;

            return (

              <div
                key={index}
                className="
                  flex
                  flex-col
                  items-center

                  min-w-[50px]
                  sm:min-w-[65px]
                "
              >

                <div
                  className="
                    flex
                    items-end

                    h-44
                    sm:h-60

                    w-7
                    sm:w-10

                    rounded-full

                    bg-gray-100
                    dark:bg-white/10

                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      height: `${height}px`,
                    }}
                    className={`
                      w-full
                      rounded-full
                      transition-all
                      duration-700

                      bg-gradient-to-t

                      ${
                        isHighest
                          ? `
                            from-red-600
                            via-red-500
                            to-red-400
                          `
                          : `
                            from-emerald-600
                            via-emerald-500
                            to-emerald-400
                          `
                      }
                    `}
                  />

                </div>



                <span
                  className="
                    mt-2
                    text-[11px]
                    sm:text-xs

                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {item.month}
                </span>



                <span
                  className={`
                    mt-1

                    text-[10px]
                    sm:text-xs

                    ${
                      isHighest
                        ? "text-red-500 font-semibold"
                        : "text-gray-400"
                    }
                  `}
                >
                  ₹{item.amount.toFixed(0)}
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}