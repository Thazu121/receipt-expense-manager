export default function ReceiptPagination() {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">

      {/* Previous */}
      <button
        className="
          px-4 py-2 rounded-lg transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        "
      >
        {"<"}
      </button>

      {/* Active Page */}
      <button
        className="
          px-4 py-2 rounded-lg font-medium transition
          
          bg-emerald-500 text-white
          
          dark:bg-green-500
          dark:text-black
        "
      >
        1
      </button>

      {/* Other Pages */}
      <button
        className="
          px-4 py-2 rounded-lg transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        "
      >
        2
      </button>

      <button
        className="
          px-4 py-2 rounded-lg transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        "
      >
        3
      </button>

      {/* Next */}
      <button
        className="
          px-4 py-2 rounded-lg transition
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        "
      >
        {">"}
      </button>

    </div>
  );
}
