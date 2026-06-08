import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  setExpenseSearch,
  setExpenseSort,
  setExpenseFilters,
  clearExpenseFilters,
} from "../../redux/features/expenseSlice";

export default function ExpenseFilters() {
  const dispatch = useDispatch();

  const { search, sort, filters } = useSelector(
    (state) => state.expense
  );

  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-gray-200
        dark:border-white/10
        bg-white
        dark:bg-white/5
        backdrop-blur-xl
        p-4
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) =>
              dispatch(setExpenseSearch(e.target.value))
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              dark:border-white/10
              bg-gray-50
              dark:bg-transparent
              pl-10
              pr-4
              py-3
              text-sm
              text-gray-800
              dark:text-white
              outline-none
            "
          />
        </div>

        <select
          value={sort}
          onChange={(e) =>
            dispatch(setExpenseSort(e.target.value))
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            px-4
            py-3
            bg-white
            dark:bg-[#0f3b2f]
          "
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>

        <select
          value={filters.category || ""}
          onChange={(e) =>
            dispatch(
              setExpenseFilters({
                category: e.target.value,
              })
            )
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            px-4
            py-3
            bg-white
            dark:bg-[#0f3b2f]
          "
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Medical">Medical</option>
          <option value="General">General</option>
        </select>

        <select
          value={filters.source || ""}
          onChange={(e) =>
            dispatch(
              setExpenseFilters({
                source: e.target.value,
              })
            )
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            px-4
            py-3
            bg-white
            dark:bg-[#0f3b2f]
          "
        >
          <option value="">All Sources</option>
          <option value="manual">Manual</option>
          <option value="recurring">Recurring</option>
          <option value="receipt-scan">Receipt Scan</option>
          <option value="ocr">OCR</option>
        </select>

        <select
          value={filters.favorite ? "favorite" : ""}
          onChange={(e) =>
            dispatch(
              setExpenseFilters({
                favorite: e.target.value === "favorite",
              })
            )
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            px-4
            py-3
            bg-white
            dark:bg-[#0f3b2f]
          "
        >
          <option value="">All Expenses</option>
          <option value="favorite">Favorites Only</option>
        </select>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => dispatch(clearExpenseFilters())}
          className="
            px-4
            py-2
            rounded-xl
            text-sm
            border
            border-gray-300
            dark:border-white/10
            hover:bg-gray-100
            dark:hover:bg-white/10
          "
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}