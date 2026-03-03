export default function StatCard({
  title = "Untitled",
  value = 0,
  icon: Icon,
  isCurrency = false,
  isLoading = false,
}) {
  const safeValue =
    typeof value === "number"
      ? value
      : Number(value) || 0;

  const formattedValue = isCurrency
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(safeValue)
    : safeValue;

  const valueColor =
    safeValue < 0
      ? "text-red-500"
      : "text-gray-900 dark:text-white";

  return (
    <div
      className="
        w-full
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-lg
        rounded-2xl
        p-4 sm:p-6
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col justify-between
        min-h-[110px] sm:min-h-[130px]
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {title}
        </p>

        {Icon && (
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
            <Icon size={18} className="text-emerald-500" />
          </div>
        )}
      </div>

      <h2
        className={`
          text-lg sm:text-2xl lg:text-3xl
          font-semibold
          mt-3
          break-words
          transition-all duration-300
          ${valueColor}
        `}
      >
        {isLoading ? (
          <span className="animate-pulse text-gray-400">
            Loading...
          </span>
        ) : (
          formattedValue
        )}
      </h2>
    </div>
  );
}
