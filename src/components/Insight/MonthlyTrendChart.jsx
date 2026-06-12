import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";

export default function MonthlyTrendChart({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const data = useMemo(() => {
    const map = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate || expense.date);
      if (isNaN(date)) return;

      const key = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      map[key] = (map[key] || 0) + Number(expense.amount || 0);
    });

    return Object.entries(map).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [expenses]);

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5 lg:p-6
        overflow-hidden
      "
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Monthly Trend
      </h3>

      {data.length === 0 ? (
        <div className="h-[260px] sm:h-[350px] flex items-center justify-center text-sm text-gray-400 text-center">
          No monthly trend data available
        </div>
      ) : (
        <div className="w-full h-[260px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />

              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => formatCurrency(value, currency)}
              />

              <Tooltip
                formatter={(value) => formatCurrency(value, currency)}
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}