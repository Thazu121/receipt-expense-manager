import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10b981",
  "#22c55e",
  "#84cc16",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

export default function RecurringGraph({ items = [] }) {
  const categoryMap = {};

  items.forEach((item) => {
    if (!item.isActive) return;

    const category = item.category || "General";

    categoryMap[category] =
      (categoryMap[category] || 0) + Number(item.amount || 0);
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="w-full min-w-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold mb-3">
          Recurring Graph
        </h2>

        <p className="text-gray-500 text-sm">
          No active recurring expenses to show.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden">
      <h2 className="text-base sm:text-lg font-bold mb-4">
        Category Breakdown
      </h2>

      <div className="w-full h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="75%"
              label={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`₹${value}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />

              <span className="truncate text-gray-600 dark:text-gray-300">
                {item.name}
              </span>
            </div>

            <span className="font-semibold shrink-0">
              ₹{Number(item.value).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}