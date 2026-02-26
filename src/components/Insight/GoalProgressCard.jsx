export default function GoalProgressCard({
  goalName = "Vacation Fund",
  saved = 620,
  target = 1000,
}) {
  const percentage = Math.min(
    Math.round((saved / target) * 100),
    100
  );

  return (
    <div
      className="
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        shadow-sm hover:shadow-lg
        
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base sm:text-lg">
          {goalName} Progress
        </h3>

        <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-green-400">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-emerald-100 dark:bg-white/10 h-3 rounded-full overflow-hidden">
        <div
          className="
            h-3 rounded-full transition-all duration-700
            
            bg-gradient-to-r 
            from-emerald-400 
            to-emerald-600
            
            dark:from-green-400 
            dark:to-green-600
          "
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Amount Info */}
      <div className="mt-4 flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <span>${saved} saved</span>
        <span>Goal: ${target}</span>
      </div>
    </div>
  );
}
