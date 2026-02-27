import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function CategoriesCard() {
  const receipts = useSelector(
    (state) => state.receipt?.receipts || []
  );

  const categories = useMemo(() => {
    if (!receipts.length) return [];

    const totals = {};
    let grandTotal = 0;

    receipts.forEach((item) => {
      const amount = Number(item.amount) || 0;
      grandTotal += amount;

      const category = item.category || "Other";
      totals[category] =
        (totals[category] || 0) + amount;
    });

    return Object.keys(totals).map((key) => ({
      name: key,
      percent: grandTotal
        ? Math.round((totals[key] / grandTotal) * 100)
        : 0,
    }));
  }, [receipts]);

  return (
    <div className="
      p-4 sm:p-6
      bg-white dark:bg-[#0F1B22]
      rounded-2xl
      shadow-sm
      w-full
    ">
      <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
        Top Categories
      </h2>

      {!categories.length ? (
        <p className="text-gray-500 text-sm">
          No data yet
        </p>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {categories.map((cat, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1 sm:mb-2 text-xs sm:text-sm">
                <span className="truncate max-w-[70%]">
                  {cat.name}
                </span>
                <span>{cat.percent}%</span>
              </div>

              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
      )}
    </div>
  );
}
