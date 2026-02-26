import { AlertTriangle } from "lucide-react";

export default function OverspendingCard({
  category = "Dining Out",
  amount = 1240,
  percentage = 15,
  onAdjust,
  onView,
}) {
  const isSevere = percentage >= 20;

  return (
    <div
      className="
        lg:col-span-2
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        shadow-sm hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-red-200
        
        dark:bg-[#2a1111]/60
        dark:border-red-900
      "
    >
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3 mb-4">
        
        <div
          className={`
            relative w-10 h-10 flex items-center justify-center rounded-lg
            bg-red-100 text-red-600
            dark:bg-red-900/40 dark:text-red-400
            ${isSevere ? "animate-pulse" : ""}
          `}
        >
          <AlertTriangle size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            Overspending Alert: {category}
          </h3>

          {isSevere && (
            <p className="text-xs text-red-500 mt-1">
              High spending risk detected
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        You've spent{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          ${amount.toLocaleString()}
        </span>
        , which is{" "}
        <span className="text-red-600 dark:text-red-400 font-semibold">
          {percentage}% higher
        </span>{" "}
        than your average.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        
        {/* Primary */}
        <button
          onClick={onAdjust}
          className="
            w-full sm:w-auto
            px-4 py-2.5 rounded-lg transition-all duration-300
            text-sm font-medium
            
            bg-red-500 hover:bg-red-600
            active:scale-[0.98]
            text-white
          "
        >
          Adjust Budget
        </button>

        {/* Secondary */}
        <button
          onClick={onView}
          className="
            w-full sm:w-auto
            px-4 py-2.5 rounded-lg transition-all duration-300
            text-sm font-medium
            
            bg-white/70 backdrop-blur-md
            border border-gray-300
            text-gray-700
            hover:bg-gray-100
            
            dark:bg-white/5
            dark:border-white/20
            dark:text-white
            dark:hover:bg-white/10
          "
        >
          View Transactions
        </button>
      </div>
    </div>
  );
}
