export default function SpendingChart() {
  return (
    <div
      className="
        rounded-2xl
        p-4 sm:p-6
        h-full
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Spending Trends
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Daily average: $112.50
          </p>
        </div>

        <select
          className="
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

      {/* Chart Area */}
      <div
        className="
          h-60 sm:h-72 lg:h-80
          rounded-xl
          flex items-center justify-center
          relative overflow-hidden
          bg-gray-50
          dark:bg-gradient-to-b dark:from-[#0F1C22] dark:to-[#0B1418]
          border border-gray-200 dark:border-white/5
          transition-all duration-300
        "
      >
        {/* Grid Pattern */}
        <div
          className="
            absolute inset-0 opacity-10
            bg-[radial-gradient(circle_at_center,_#94a3b8_1px,_transparent_1px)]
            dark:bg-[radial-gradient(circle_at_center,_#1e2a32_1px,_transparent_1px)]
            [background-size:20px_20px]
          "
        />

        <p className="text-gray-500 text-xs sm:text-sm z-10">
          Chart visualization will render here
        </p>
      </div>
    </div>
  );
}
