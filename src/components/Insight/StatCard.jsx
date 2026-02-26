import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  badge,
  highlight,
  trend,      // number (ex: 12 or -8)
}) {
  const isPositive = trend > 0;

  return (
    <div
      className={`
        relative p-5 sm:p-6 rounded-2xl transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        
        dark:bg-[#0f2e24]/60
        dark:border-green-800
        
        ${highlight ? "ring-2 ring-emerald-400/40 dark:ring-green-400/30" : ""}
      `}
    >
      {/* Badge */}
      {badge && (
        <span
          className="
            absolute top-4 right-4
            text-xs font-medium
            bg-emerald-100 text-emerald-600
            px-2 py-1 rounded-lg
            
            dark:bg-green-900
            dark:text-green-400
          "
        >
          {badge}
        </span>
      )}

      {/* Title */}
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`
          text-xl sm:text-2xl md:text-3xl font-bold mt-2 transition-colors
          ${
            highlight
              ? "text-emerald-600 dark:text-green-400"
              : "text-gray-900 dark:text-white"
          }
        `}
      >
        {value}
      </h2>

      {/* Trend */}
      {typeof trend === "number" && (
        <div
          className={`
            mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium
            ${
              isPositive
                ? "text-emerald-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          `}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(trend)}% vs last month
        </div>
      )}
    </div>
  );
}
