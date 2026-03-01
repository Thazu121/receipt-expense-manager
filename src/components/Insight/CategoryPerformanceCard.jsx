import { useSelector } from "react-redux";
import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CategoryPerformanceCard() {
  const receipts = useSelector((state) => state.receipt.receipts);
  const currency = useSelector((state) => state.settings.currency);

  const data = useMemo(() => {
    if (!receipts.length) return [];

    const map = {};

    receipts.forEach((r) => {
      const category = r.category || "Other";
      const amount = Math.abs(Number(r.amount || 0));
      map[category] = (map[category] || 0) + amount;
    });

    const sorted = Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const topCategories = sorted.slice(0, 6);
    const others = sorted.slice(6);

    if (others.length > 0) {
      const otherTotal = others.reduce((sum, item) => sum + item.value, 0);
      topCategories.push({ name: "Other", value: otherTotal });
    }

    return topCategories;
  }, [receipts]);

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#64748b",
  ];

  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#0f2e24]/60 border border-emerald-100 dark:border-green-800 shadow-sm transition-all duration-300">

      <h3 className="font-semibold mb-6 text-lg">
        Spending by Category
      </h3>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <div className="w-full h-[320px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={3}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value, currency)
                }
              />

              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
