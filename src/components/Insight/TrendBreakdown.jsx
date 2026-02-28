import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function TrendBreakdown() {
  const [active, setActive] = useState("Daily");
  const receipts = useSelector((state) => state.receipt.receipts);

  const chartData = useMemo(() => {
    const map = {};

    receipts.forEach((r) => {
      if (!r.date) return;

      const amount = Math.abs(Number(r.amount || 0));
      const date = new Date(r.date);
      if (isNaN(date)) return;

      let key;
      let sortKey;

      if (active === "Daily") {
        key = date.toLocaleDateString();
        sortKey = date.getTime();
      } 
      else if (active === "Weekly") {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString();
        sortKey = weekStart.getTime();
      } 
      else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        sortKey = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      }

      if (!map[key]) {
        map[key] = { total: 0, sortKey };
      }

      map[key].total += amount;
    });

    // Convert to sorted array
    const sorted = Object.entries(map)
      .map(([label, value]) => ({
        label,
        total: value.total,
        sortKey: value.sortKey,
      }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .slice(-7); // last 7 periods

    return sorted;
  }, [receipts, active]);

  const maxValue = Math.max(...chartData.map((d) => d.total), 1);

  return (
    <div className="p-5 sm:p-6 rounded-2xl shadow-sm bg-white/80 border border-emerald-100 dark:bg-[#0f2e24]/60 dark:border-green-800 transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <h3 className="font-semibold text-base sm:text-lg">
          Trend Breakdown
        </h3>

        <div className="flex bg-emerald-100 dark:bg-white/10 rounded-lg p-1 w-fit">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md transition ${
                active === item
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end h-40 sm:h-48 gap-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            
            {/* Bar */}
            <div
              className="w-full bg-emerald-400 rounded-t-lg transition-all duration-500"
              style={{
                height: `${(item.total / maxValue) * 100}%`,
              }}
            />

            {/* Label */}
            <span className="text-[10px] sm:text-xs mt-2 text-gray-500 dark:text-gray-400 truncate w-full text-center">
              {active === "Monthly"
                ? item.label.split("-")[1]
                : item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
