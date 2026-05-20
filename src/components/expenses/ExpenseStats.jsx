import {
  useSelector,
} from "react-redux";

import {
  useMemo,
} from "react";

export default function ExpenseStats() {

  const receipts =
    useSelector(
      (state) =>
        state.receipt.receipts
    );

  const isLight =
    useSelector(
      (state) =>
        state.theme.isLight
    );



  const total = useMemo(() => {

    return receipts.reduce(

      (sum, r) =>

        sum +
        Math.abs(
          Number(
            r.amount || 0
          )
        ),

      0
    );

  }, [receipts]);



  const {
    topCategory,
    activeBudgets,
  } = useMemo(() => {

    if (!receipts.length) {

      return {
        topCategory: "N/A",
        activeBudgets: 0,
      };
    }

    const categoryMap = {};

    receipts.forEach((r) => {

      const category =
        r.category || "Other";

      const amount =
        Math.abs(
          Number(
            r.amount || 0
          )
        );

      if (!categoryMap[category]) {

        categoryMap[category] = 0;
      }

      categoryMap[category] += amount;
    });

    const sortedCategories =
      Object.entries(
        categoryMap
      ).sort(
        (a, b) => b[1] - a[1]
      );

    return {

      topCategory:
        sortedCategories[0][0],

      activeBudgets:
        Object.keys(
          categoryMap
        ).length,
    };

  }, [receipts]);


  return (

    <div
      className="
        grid

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3

        gap-4
        sm:gap-5
        lg:gap-6

        mb-6
        sm:mb-8
      "
    >

      <StatCard

        title="Total Spending"

        value={`₹${total.toFixed(2)}`}

        isLight={isLight}

      />

      <StatCard

        title="Active Categories"

        value={activeBudgets}

        isLight={isLight}

      />

      <StatCard

        title="Top Category"

        value={topCategory}

        isLight={isLight}

      />

    </div>
  );
}




function StatCard({
  title,
  value,
  isLight,
}) {

  return (

    <div
      className={`
        rounded-2xl

        p-4
        sm:p-5
        lg:p-6

        shadow-lg

        transition-all
        duration-300

        min-w-0

        ${
          isLight
            ? `
              bg-white
              border
              border-gray-200
            `
            : `
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
            `
        }
      `}
    >

      {/* TITLE */}

      <p
        className={`
          text-sm
          sm:text-base

          truncate

          ${
            isLight
              ? "text-gray-500"
              : "text-gray-400"
          }
        `}
      >

        {title}

      </p>


      {/* VALUE */}

      <h2
        className="
          text-xl
          sm:text-2xl
          lg:text-3xl

          font-bold

          mt-2

          break-words
        "
      >

        {value}

      </h2>

    </div>
  );
}