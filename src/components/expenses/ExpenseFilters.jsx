import { Search } from "lucide-react";

export default function ExpenseFilters({
  search,
  setSearch,
  sort,
  setSort,
}) {

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
        sm:p-5

        overflow-visible
      "
    >

      <div
        className="
          flex
          flex-col

          md:flex-row

          gap-4

          items-stretch
        "
      >

        {/* ================= SEARCH ================= */}

        <div
          className="
            relative

            flex-1

            min-w-0
          "
        >

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
              setSearch(e.target.value)
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
              sm:text-base

              text-gray-800
              dark:text-white

              placeholder-gray-400

              outline-none

              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-500/20

              transition
            "
          />

        </div>



        {/* ================= SORT ================= */}

        <div
          className="
            w-full
            md:w-[220px]

            flex-shrink-0
          "
        >

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
              w-full
              h-full

              rounded-xl

              border
              border-gray-300
              dark:border-emerald-500

              bg-white
              dark:bg-[#0f3b2f]

              px-4
              py-3

              text-sm
              sm:text-base

              text-gray-800
              dark:text-white

              outline-none

              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-500/20

              transition
            "
          >

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="highest">
              Highest Amount
            </option>

            <option value="lowest">
              Lowest Amount
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}