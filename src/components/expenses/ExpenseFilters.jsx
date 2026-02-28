import { Search } from "lucide-react"

export default function ExpenseFilters({ search, setSearch }) {
  return (
    <div className="bg-white dark:bg-white/5 dark:backdrop-blur-xl 
                    border border-gray-200 dark:border-white/10 
                    rounded-2xl p-4 mb-8 transition">

      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search merchants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 dark:bg-transparent
                     border border-gray-300 dark:border-white/10
                     rounded-xl pl-10 pr-4 py-2
                     text-gray-800 dark:text-white
                     placeholder-gray-400
                     focus:outline-none
                     focus:ring-2 focus:ring-emerald-500
                     transition"
        />
      </div>
    </div>
  )
}
