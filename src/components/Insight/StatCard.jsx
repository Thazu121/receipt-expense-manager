import { useSelector } from "react-redux";

export default function StatCard({ type }) {
  const receipts = useSelector((state) => state.receipt.receipts);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthReceipts = receipts.filter((r) => {
    if (!r.date) return false;
    const d = new Date(r.date);
    return (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  const currentMonthTotal = currentMonthReceipts.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0
  );

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear =
    currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthTotal = receipts
    .filter((r) => {
      if (!r.date) return false;
      const d = new Date(r.date);
      return (
        d.getMonth() === lastMonth &&
        d.getFullYear() === lastMonthYear
      );
    })
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const trendPercent =
    lastMonthTotal > 0
      ? ((currentMonthTotal - lastMonthTotal) /
          lastMonthTotal) *
        100
      : 0;

  const recurringCount = receipts.filter(
    (r) => r.isRecurring
  ).length;

  const monthlyBudget = 2000;
  const safeToSpend =
    monthlyBudget - currentMonthTotal > 0
      ? monthlyBudget - currentMonthTotal
      : 0;

  const potentialSavings = currentMonthTotal * 0.1;

  let title = "";
  let value = "";

  switch (type) {
    case "monthly":
      title = "Monthly Spend";
      value = `$${currentMonthTotal.toFixed(2)}`;
      break;

    case "safe":
      title = "Safe to Spend";
      value = `$${safeToSpend.toFixed(2)}`;
      break;

    case "savings":
      title = "Potential Savings";
      value = `$${potentialSavings.toFixed(0)}`;
      break;

    case "subscription":
      title = "Subscription Audit";
      value = `${recurringCount} Active`;
      break;

    default:
      break;
  }

  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#0f2e24]/60 border border-emerald-100 dark:border-green-800">
      <h3 className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-4 text-2xl font-bold">
        {value}
      </p>
      {type === "monthly" && (
        <p className="text-xs mt-2 opacity-70">
          {trendPercent.toFixed(1)}% vs last month
        </p>
      )}
    </div>
  );
}
