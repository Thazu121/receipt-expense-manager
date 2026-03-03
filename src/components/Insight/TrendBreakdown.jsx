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

    // Create 7 time slots
    for (let i = slots - 1; i >= 0; i--) {
      let date;
      let key;
      let sortKey;

      if (active === "Daily") {
        date = new Date();
        date.setDate(now.getDate() - i);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        key = `${day}/${month}/${year}`;
        sortKey = date.getTime();
      }

      else if (active === "Weekly") {
        date = new Date();
        date.setDate(now.getDate() - now.getDay() - i * 7);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        key = `Week of ${day}/${month}/${year}`;
        sortKey = date.getTime();
      }

      else {
        date = new Date(now.getFullYear(), now.getMonth() - i, 1);

        const monthName = date.toLocaleString("default", {
          month: "short",
        });

        key = `${monthName} ${date.getFullYear()}`;
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
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        key = `${day}/${month}/${year}`;
      }

      else if (active === "Weekly") {
        const weekStart = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - date.getDay()
        );

        const day = String(weekStart.getDate()).padStart(2, "0");
        const month = String(weekStart.getMonth() + 1).padStart(2, "0");
        const year = weekStart.getFullYear();

        key = `Week of ${day}/${month}/${year}`;
      }

      else {
        const monthName = date.toLocaleString("default", {
          month: "short",
        });

        key = `${monthName} ${date.getFullYear()}`;
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
    <div className="p-5 sm:p-6 rounded-2xl shadow-sm bg-white/80 border border-emerald-100 dark:bg-[#0f2e24]/60 dark:border-green-800 transition-all duration-300">

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

      {chartData.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <>
          <div className="w-full min-h-[260px] sm:min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
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
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />

                <YAxis
                  tickFormatter={(value) =>
                    formatCurrency(value, currency)
                  }
                  width={80}
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
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
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
      "Your spending is increasing significantly compared to the previous period. Review recent large expenses to prevent overspending.";
  } else if (!isIncrease && Math.abs(change) > 10) {
    insightText =
      "Excellent progress! Your spending has decreased noticeably. Keep maintaining disciplined financial habits.";
  } else {
    insightText =
      "Your spending trend remains stable. Continue monitoring recurring transactions for optimization opportunities.";
  }

  return (
    <div className="mt-6 space-y-3">

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Change vs Previous</span>
        <span
          className={`font-semibold ${
            isIncrease ? "text-red-500" : "text-green-500"
          }`}
        >
          {isIncrease ? "+" : ""}
          {change.toFixed(1)}%
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
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
