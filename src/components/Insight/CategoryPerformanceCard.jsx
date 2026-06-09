import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CategoryPerformanceCard({
  expenses = [],
}) {
  const currency = useSelector(
    (state) => state.settings.currency
  );

  const data = useMemo(() => {
    const map = {};

    expenses.forEach((expense) => {
      const category =
        expense.categoryId?.name ||
        expense.category?.name ||
        expense.category ||
        "Other";

      const amount = Number(expense.amount || 0);

      if (!amount) return;

      map[category] =
        (map[category] || 0) + amount;
    });

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const colors = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#64748b",
  ];

  return (
    <div
      className="
        w-full
        min-w-0
        p-4
        sm:p-6
        rounded-2xl
        bg-white
        dark:bg-[#0f172a]
        border
        border-gray-200
        dark:border-gray-700
        shadow-sm
      "
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold">
          Spending by Category
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Total:{" "}
          {formatCurrency(total, currency)}
        </p>
      </div>

      {data.length === 0 ? (
        <div
          className="
            h-[320px]
            flex
            items-center
            justify-center
            text-gray-400
            text-sm
          "
        >
          No category data available
        </div>
      ) : (
        <div className="w-full min-w-0 h-[320px]">
          <ResponsiveContainer
            width="99%"
            height={320}
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius="45%"
                outerRadius="75%"
                paddingAngle={3}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      colors[
                        index % colors.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value, currency)
                }
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}