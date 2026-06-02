import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ExpenseHeader() {
  const { count, loading } =
    useSelector(
      (state) => state.expense
    );

  return (
    <div
      className="
        flex
        flex-col

        sm:flex-row
        sm:items-center
        sm:justify-between

        gap-5
        sm:gap-6

        mb-6
        sm:mb-10
      "
    >
      <div className="w-full">
        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl

            font-bold

            break-words
          "
        >
          Expenses
        </h1>

        <p
          className="
            text-sm
            sm:text-base

            text-gray-500
            dark:text-gray-400

            mt-2

            leading-relaxed
          "
        >
          Manage and track your
          personal spending with ease.
        </p>

        {!loading && (
          <p
            className="
              mt-2
              text-xs
              sm:text-sm

              text-emerald-600
              dark:text-emerald-400
            "
          >
            Total Expenses: {count}
          </p>
        )}
      </div>

      <Link
        to="/dashboard/add-expense"
        className="
          w-full
          sm:w-auto

          flex
          items-center
          justify-center

          gap-2

          bg-emerald-500
          hover:bg-emerald-600

          px-5
          sm:px-6

          py-3

          rounded-xl

          font-semibold

          text-sm
          sm:text-base

          text-white

          transition
          duration-300

          shadow-md
          hover:shadow-lg
        "
      >
        <Plus size={18} />
        Add Expense
      </Link>
    </div>
  );
}