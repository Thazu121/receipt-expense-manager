export default function SpendingChart() {
  return (
    <div
      className="
        w-full
        rounded-2xl
        p-5 sm:p-6 lg:p-8
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        transition-all duration-300
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        {/* Title Section */}
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
            Spending Trends
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Daily average: $112.50
          </p>
        </div>

        {/* Filter Dropdown */}
        <select
          className="
            w-full md:w-auto
            text-xs sm:text-sm
            px-3 sm:px-4 py-2
            rounded-lg outline-none
            bg-gray-100 dark:bg-[#0B1418]
            text-gray-700 dark:text-gray-300
            border border-gray-200 dark:border-white/5
            focus:ring-2 focus:ring-emerald-500/40
            focus:border-emerald-500
            transition-all duration-300
          "
        >
          <option>Last 7 months</option>
          <option>Last 30 days</option>
          <option>Last year</option>
        </select>
      </div>

      {/* ================= CHART AREA ================= */}
      <div
        className="
          w-full
          h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96
          rounded-xl
          flex items-center justify-center
          relative overflow-hidden
          bg-gray-50
          dark:bg-gradient-to-b dark:from-[#0F1C22] dark:to-[#0B1418]
          border border-gray-200 dark:border-white/5
          transition-all duration-300
        "
      >
        {/* Subtle Grid Pattern */}
        <div
          className="
            absolute inset-0 opacity-10
            bg-[radial-gradient(circle_at_center,_#94a3b8_1px,_transparent_1px)]
            dark:bg-[radial-gradient(circle_at_center,_#1e2a32_1px,_transparent_1px)]
            [background-size:20px_20px]
          "
        />

        {/* Placeholder */}
        <p className="text-gray-500 text-xs sm:text-sm z-10 text-center px-4">
          Chart visualization will render here
        </p>
      </div>
    </div>
  );
}
