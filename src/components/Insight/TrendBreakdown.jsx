import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TrendBreakdown({ expenses = [] }) {
  const [active, setActive] = useState("Daily");
  const currency = useSelector((state) => state.settings.currency);

  const chartData = useMemo(() => {
    const map = {};
    const now = new Date();
    const slots = 7;

    for (let i = slots - 1; i >= 0; i--) {
      let date;
      let key;

      if (active === "Daily") {
        date = new Date();
        date.setDate(now.getDate() - i);
        key = date.toLocaleDateString("en-GB");
      } else if (active === "Weekly") {
        date = new Date();
        date.setDate(now.getDate() - now.getDay() - i * 7);
        key = `Week ${date.toLocaleDateString("en-GB")}`;
      } else {
        date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        key = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      }

      map[key] = {
        total: 0,
        sortKey: date.getTime(),
      };
    }

    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate || expense.date);
      if (isNaN(date)) return;

      const amount = Number(expense.amount || 0);
      let key;

      if (active === "Daily") {
        key = date.toLocaleDateString("en-GB");
      } else if (active === "Weekly") {
        const weekStart = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - date.getDay()
        );

        key = `Week ${weekStart.toLocaleDateString("en-GB")}`;
      } else {
        key = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      }

      if (map[key]) map[key].total += amount;
    });

    return Object.entries(map)
      .map(([label, value]) => ({
        label,
        total: value.total,
        sortKey: value.sortKey,
      }))
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [expenses, active]);

  const total = chartData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-[#0f172a]
        shadow-sm
        p-4 sm:p-5 lg:p-6
        overflow-hidden
      "
    >
      <div
        className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-5 sm:mb-6
        "
      >
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold">
            Expense Trend
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
            Total: {formatCurrency(total, currency)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                active === item
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {chartData.every((item) => item.total === 0) ? (
        <div className="h-[260px] sm:h-[320px] flex items-center justify-center text-gray-400 text-sm text-center">
          No expense trend data available
        </div>
      ) : (
        <div className="w-full min-w-0 h-[260px] sm:h-[320px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 8,
                left: -10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                minTickGap={8}
              />

              <YAxis
                width={55}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => formatCurrency(value, currency)}
              />

              <Tooltip
                formatter={(value) => formatCurrency(value, currency)}
              />

              <Area
                type="monotone"
                dataKey="total"
                fill="url(#trendFill)"
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}