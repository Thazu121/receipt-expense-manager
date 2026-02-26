export default function CategoriesCard() {
  const categories = [
    { name: "Food & Dining", percent: 42, color: "bg-emerald-500" },
    { name: "Transport", percent: 24, color: "bg-blue-500" },
    { name: "Shopping", percent: 18, color: "bg-purple-500" },
    { name: "Entertainment", percent: 16, color: "bg-orange-500" },
  ];

  return (
    <div
      className="
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        rounded-2xl
        p-4 sm:p-6
        transition-all duration-300
      "
    >
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Top Categories
      </h2>

      <div className="space-y-5 sm:space-y-6">
        {categories.map((cat, i) => (
          <div key={i} className="group">
            
            {/* Title + Percent */}
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300">
                {cat.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {cat.percent}%
              </span>
            </div>

            {/* Progress Bar Background */}
            <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              
              {/* Animated Progress */}
              <div
                className={`
                  h-2 rounded-full ${cat.color}
                  transition-all duration-700 ease-out
                  group-hover:opacity-90
                `}
                style={{ width: `${cat.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
