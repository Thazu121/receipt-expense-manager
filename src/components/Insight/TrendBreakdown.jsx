import { useState, useMemo } from "react";

export default function TrendBreakdown() {
  const [active, setActive] = useState("Daily");

  const datasets = {
    Daily: [120, 180, 150, 220, 260, 190, 210],
    Weekly: [820, 950, 780, 1100, 1240, 980, 1050],
    Monthly: [4200, 5100, 4800, 6200, 7000, 5400, 5900],
  };

  const data = datasets[active];

  const maxValue = Math.max(...data);

  const total = data.reduce((acc, val) => acc + val, 0);

  const average = Math.round(total / data.length);

  return (
    <div
      className="
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        shadow-sm hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            Trend Breakdown
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Avg: ${average}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-lg p-1 bg-emerald-100 dark:bg-white/10">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`
                px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm
                transition-all duration-300
                ${
                  active === item
                    ? "bg-emerald-500 text-white shadow"
                    : "text-gray-600 dark:text-gray-300"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-between h-48 gap-2 sm:gap-4">
        {data.map((value, index) => {
          const heightPercent = (value / maxValue) * 100;

          return (
            <div
              key={index}
              className="flex flex-col items-center w-full"
            >
              <div
                className={`
                  w-full rounded-t-xl transition-all duration-500
                  ${
                    value === maxValue
                      ? "bg-gradient-to-t from-emerald-400 to-emerald-600 dark:from-green-400 dark:to-green-600"
                      : "bg-emerald-200 dark:bg-white/20"
                  }
                `}
                style={{ height: `${heightPercent}%` }}
              />

              <span className="text-[10px] sm:text-xs mt-2 text-gray-500 dark:text-gray-400">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Insight */}
      <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-white/10 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
        Highest {active}: <span className="font-semibold">${maxValue}</span>
      </div>
    </div>
  );
}
