import { useSelector } from "react-redux";

export default function SpendingChart() {
const receipts = useSelector(
  (state) => state.receipt.receipts
);


  if (receipts.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-[#0F1B22] rounded-2xl">
        <h2 className="text-lg font-semibold">Spending Trends</h2>
        <p className="text-gray-500 mt-3">No chart data</p>
      </div>
    );
  }

  const monthly = {};
  receipts.forEach((r) => {
    const amount = parseFloat(r.amount) || 0;
    const month = new Date(r.date).toLocaleString("default", {
      month: "short",
    });

    monthly[month] = (monthly[month] || 0) + amount;
  });

  const data = Object.keys(monthly).map((key) => ({
    month: key,
    amount: monthly[key],
  }));

  const max = Math.max(...data.map((d) => d.amount));

  return (
    <div className="p-6 bg-white dark:bg-[#0F1B22] rounded-2xl">
      <h2 className="text-lg font-semibold mb-6">Spending Trends</h2>

      <div className="flex items-end gap-4 h-48">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-8 bg-emerald-500 rounded-t-md transition-all duration-700"
              style={{ height: `${(item.amount / max) * 100}%` }}
            />
            <span className="text-xs mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
