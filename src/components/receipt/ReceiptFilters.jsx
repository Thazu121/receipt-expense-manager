import { Search } from "lucide-react";

export default function ReceiptFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      {/* Search */}
      <div className="relative col-span-2">
        <Search
          className="absolute left-3 top-3 
          text-emerald-500 
          dark:text-green-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search by merchant or item..."
          className="
            w-full pl-10 pr-4 py-3 rounded-xl transition
            
            bg-white/80 backdrop-blur-md
            border border-emerald-200
            text-gray-800 placeholder-gray-400
            
            focus:outline-none 
            focus:ring-2 focus:ring-emerald-400
            
            dark:bg-green-950/50 
            dark:border-green-800 
            dark:text-white 
            dark:placeholder-green-400
          "
        />
      </div>

      {/* Date Filter */}
      <select
        className="
          rounded-xl px-4 py-3 transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          focus:outline-none 
          focus:ring-2 focus:ring-emerald-400
          
          dark:bg-green-950/50 
          dark:border-green-800 
          dark:text-green-300
        "
      >
        <option>Last 30 Days</option>
        <option>Last 3 Months</option>
        <option>Last Year</option>
      </select>

      {/* Category Filter */}
      <select
        className="
          rounded-xl px-4 py-3 transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          focus:outline-none 
          focus:ring-2 focus:ring-emerald-400
          
          dark:bg-green-950/50 
          dark:border-green-800 
          dark:text-green-300
        "
      >
        <option>All Categories</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Technology</option>
      </select>
    </div>
  );
}
