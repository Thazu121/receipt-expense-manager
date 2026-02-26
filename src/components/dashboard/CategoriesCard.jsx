import { useEffect, useState } from "react";

export default function CategoriesCard() {
  const [animate, setAnimate] = useState(false);

  const categories = [
    { name: "Food & Dining", percent: 42, color: "bg-emerald-500" },
    { name: "Transport", percent: 24, color: "bg-blue-500" },
    { name: "Shopping", percent: 18, color: "bg-purple-500" },
    { name: "Entertainment", percent: 16, color: "bg-orange-500" },
  ];

  // Animate on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className="
        w-full
        bg-white dark:bg-[#0F1B22]
        border border-gray-200 dark:border-white/5
        shadow-sm hover:shadow-md
        rounded-2xl
        p-5 sm:p-6 lg:p-8
        transition-all duration-300
      "
    >
      {/* Title */}
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Top Categories
      </h2>

      {/* Categories */}
      <div className="space-y-5 sm:space-y-6 lg:space-y-7">
        {categories.map((cat, i) => (
          <div key={i} className="group">
            
            {/* Title + Percent */}
            <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base mb-2">
              <span className="text-gray-700 dark:text-gray-300">
                {cat.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {cat.percent}%
              </span>
            </div>

            {/* Progress Bar Background */}
            <div className="w-full h-2 sm:h-2.5 lg:h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              
              {/* Animated Progress */}
              <div
                className={`
                  rounded-full ${cat.color}
                  transition-all duration-700 ease-out
                  group-hover:opacity-90
                `}
                style={{
                  width: animate ? `${cat.percent}%` : "0%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
