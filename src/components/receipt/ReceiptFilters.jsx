import { Search } from "lucide-react";

export default function ReceiptFilters({
  search,
  setSearch,
  dateFilter,
  setDateFilter,
  category,
  setCategory,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      {/* Search */}
      <div className="relative md:col-span-2">
        <Search
          className="absolute left-3 top-3 text-emerald-500 dark:text-green-400"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by merchant..."
          className="
            w-full pl-10 pr-4 py-3 rounded-xl transition
            bg-white/80 backdrop-blur-md
            border border-emerald-200
            text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-400
            dark:bg-green-950/50 
            dark:border-green-800 
            dark:text-white 
            dark:placeholder-green-400
          "
        />
      </div>

      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="
          rounded-xl px-4 py-3 transition
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          focus:outline-none focus:ring-2 focus:ring-emerald-400
          dark:bg-green-950/50 
          dark:border-green-800 
          dark:text-green-300
        "
      >
        <option value="30">Last 30 Days</option>
        <option value="90">Last 3 Months</option>
        <option value="365">Last Year</option>
        <option value="all">All Time</option>
      </select>

   <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="
    rounded-xl px-4 py-3 transition
    bg-white/80 backdrop-blur-md
    border border-emerald-200
    text-gray-700
    focus:outline-none focus:ring-2 focus:ring-emerald-400
    dark:bg-green-950/50 
    dark:border-green-800 
    dark:text-green-300
  "
>
  <option value="all">All Categories</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Shopping">Shopping</option>
  <option value="Health">Health</option>
  <option value="Bills">Bills</option>
  <option value="Entertainment">Entertainment</option>
  <option value="General">General</option>
</select>

    </div>
  );
}
