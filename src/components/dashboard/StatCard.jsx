export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div
      className="
        w-full
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        rounded-2xl
        p-5 sm:p-6 lg:p-7
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col justify-between
        min-h-[120px]
      "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400">
          {title}
        </p>

        {Icon && (
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
            <Icon size={18} className="text-emerald-500" />
          </div>
        )}
      </div>

      {/* Value */}
      <h2
        className="
          text-xl sm:text-2xl lg:text-3xl
          font-semibold
          mt-3
          text-gray-900 dark:text-white
          break-words
        "
      >
        {value}
      </h2>
    </div>
  );
}
