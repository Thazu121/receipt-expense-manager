import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

export default function TrendBreakdown() {
  const [active, setActive] = useState("Daily");

  const receipts = useSelector((state) => state.receipt.receipts);
  const currency = useSelector((state) => state.settings.currency);

  const chartData = useMemo(() => {
    if (!receipts.length) return [];

    const map = {};
    const now = new Date();
    const slots = 7;

    for (let i = slots - 1; i >= 0; i--) {
      let date;
      let key;
      let sortKey;

      if (active === "Daily") {
        date = new Date();
        date.setDate(now.getDate() - i);
        key = date.toLocaleDateString("en-GB");
        sortKey = date.getTime();
      } 
      else if (active === "Weekly") {
        date = new Date();
        date.setDate(now.getDate() - now.getDay() - i * 7);
        key = `Week of ${date.toLocaleDateString("en-GB")}`;
        sortKey = date.getTime();
      } 
      else {
        date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
        sortKey = date.getTime();
      }

      map[key] = { total: 0, sortKey };
    }

    receipts.forEach((r) => {
      if (!r.date) return;
      const amount = Math.abs(Number(r.amount || 0));
      const date = new Date(r.date);
      if (isNaN(date)) return;

      let key;

      if (active === "Daily") {
        key = date.toLocaleDateString("en-GB");
      } 
      else if (active === "Weekly") {
        const weekStart = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - date.getDay()
        );
        key = `Week of ${weekStart.toLocaleDateString("en-GB")}`;
      } 
      else {
        key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
      }

      if (map[key]) {
        map[key].total += amount;
      }
    });

    return Object.entries(map)
      .map(([label, value]) => ({
        label,
        total: value.total,
        sortKey: value.sortKey,
      }))
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [receipts, active]);

  return (
    <div className="w-full p-4 sm:p-6 rounded-2xl shadow-sm bg-white/80 border border-emerald-100 dark:bg-[#0f2e24]/60 dark:border-green-800 transition-all duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="font-semibold text-base sm:text-lg">
          Trend Breakdown
        </h3>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-emerald-100 dark:bg-white/10 rounded-lg p-1 w-full sm:w-auto">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 ${
                active === item
                  ? "bg-emerald-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-white/20"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {chartData.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="w-full h-[260px] sm:h-[320px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                  minTickGap={20}
                />

                <YAxis
                  tickFormatter={(value) =>
                    formatCurrency(value, currency)
                  }
                  width={70}
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value, currency)
                  }
                />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="none"
                  fill="url(#colorSpend)"
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <TrendInsights chartData={chartData} currency={currency} />
        </>
      )}
    </div>
  );
}


function TrendInsights({ chartData, currency }) {
  if (chartData.length < 2) return null;

  const last = chartData[chartData.length - 1].total;
  const previous = chartData[chartData.length - 2].total;

  const change = ((last - previous) / (previous || 1)) * 100;
  const isIncrease = change > 0;
  const totalLast7 = chartData.reduce((sum, d) => sum + d.total, 0);

  let insightText = "";

  if (isIncrease && change > 15) {
    insightText =
      "Your spending is increasing significantly compared to the previous period.";
  } else if (!isIncrease && Math.abs(change) > 10) {
    insightText =
      "Excellent progress! Your spending has decreased noticeably.";
  } else {
    insightText =
      "Your spending trend remains stable.";
  }

  return (
    <div className="mt-6 space-y-4">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
        <span className="text-gray-500">Change vs Previous</span>
        <span className={`font-semibold ${isIncrease ? "text-red-500" : "text-green-500"}`}>
          {isIncrease ? "+" : ""}
          {change.toFixed(1)}%
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
        <span className="text-gray-500">Total (Last 7)</span>
        <span className="font-semibold">
          {formatCurrency(totalLast7, currency)}
        </span>
      </div>

      <div className="bg-emerald-50 dark:bg-green-900/30 border border-emerald-100 dark:border-green-800 p-4 rounded-xl text-sm text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          AI Insight:
        </span>{" "}
        {insightText}
      </div>
    </div>
  );
}
