import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyTrendChart({
  expenses,
}) {
  const map = {};

  expenses.forEach((expense) => {
    const month =
      new Date(
        expense.expenseDate
      ).toLocaleString(
        "default",
        {
          month: "short",
        }
      );

    map[month] =
      (map[month] || 0) +
      Number(expense.amount || 0);
  });

  const data = Object.entries(map).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border">

      <h3 className="mb-4 font-semibold">
        Monthly Trend
      </h3>

      <div className="h-[350px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              dataKey="amount"
              stroke="#10b981"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}