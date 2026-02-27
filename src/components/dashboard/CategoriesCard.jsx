import { useSelector } from "react-redux";

export default function CategoriesCard() {
  const receipts = useSelector(
    (state) => state.receipt.receipts
  );

  if (!receipts.length) {
    return (
      <div className="p-6 bg-white dark:bg-[#0F1B22] rounded-2xl">
        <h2 className="text-lg font-semibold">
          Top Categories
        </h2>
        <p className="text-gray-500 mt-3">
          No data yet
        </p>
      </div>
    );
  }

  const totals = {};
  let grandTotal = 0;

  receipts.forEach((item) => {
    const amount = Number(item.amount) || 0;
    grandTotal += amount;

    const category = item.category || "Other";
    totals[category] =
      (totals[category] || 0) + amount;
  });

  const categories = Object.keys(totals).map(
    (key) => ({
      name: key,
      percent: grandTotal
        ? Math.round(
            (totals[key] / grandTotal) * 100
          )
        : 0,
    })
  );

  return (
    <div className="p-6 bg-white dark:bg-[#0F1B22] rounded-2xl">
      <h2 className="text-lg font-semibold mb-6">
        Top Categories
      </h2>

      <div className="space-y-5">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2 text-sm">
              <span>{cat.name}</span>
              <span>{cat.percent}%</span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-emerald-500 rounded-full transition-all duration-700"
                style={{
                  width: `${cat.percent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
