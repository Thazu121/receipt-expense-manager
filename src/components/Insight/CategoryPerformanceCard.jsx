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
    if (!receipts?.length) return [];

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
    <div className="w-full p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#0f2e24]/60 border border-emerald-100 dark:border-green-800 shadow-sm transition-all duration-300">

      <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
        Spending by Category
      </h3>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <div className="w-full h-[260px] sm:h-[320px] md:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius="80%"
                innerRadius="45%"
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

              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
