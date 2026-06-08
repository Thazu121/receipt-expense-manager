import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RecurringGraph({ items = [] }) {
  const categoryMap = {};

  items.forEach((item) => {
    if (!item.isActive) return;

    const category = item.category || "General";
    categoryMap[category] =
      (categoryMap[category] || 0) + Number(item.amount || 0);
  });

  const data = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl p-5">
        <h2 className="font-bold mb-3">Recurring Graph</h2>
        <p className="text-gray-500 text-sm">
          No active recurring expenses to show.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold mb-4">
        Category Breakdown
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`₹${value}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}