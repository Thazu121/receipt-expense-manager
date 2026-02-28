import { useSelector } from "react-redux";
import InsightsHeader from "../Insight/InsightsHeader";
import GoalProgressCard from "../Insight/GoalProgressCard";
import GroceryTipCard from "../Insight/GroceryTipCard";
import OverspendingCard from "../Insight/OverspendingCard";
import StatCard from "../Insight/StatCard";
import SubscriptionCard from "../Insight/SubscriptionCard";
import TrendBreakdown from "../Insight/TrendBreakdown";

export default function InsightsPage() {
  const isLight = useSelector((state) => state.theme.isLight);
  const receipts = useSelector((state) => state.receipt.receipts);
  const goals = useSelector((state) => state.goal.goals);

  /* ===============================
     📅 DATE CALCULATIONS
  =============================== */
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  /* ===============================
     💰 CURRENT MONTH TOTAL
  =============================== */
  const currentMonthReceipts = receipts.filter((r) => {
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

  /* ===============================
     💰 LAST MONTH TOTAL
  =============================== */
  const lastMonthReceipts = receipts.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getMonth() === lastMonth &&
      d.getFullYear() === lastMonthYear
    );
  });

  const lastMonthTotal = lastMonthReceipts.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0
  );

  /* ===============================
     📈 TREND %
  =============================== */
  let trendPercent = 0;

  if (lastMonthTotal > 0) {
    trendPercent =
      ((currentMonthTotal - lastMonthTotal) /
        lastMonthTotal) *
      100;
  }

  /* ===============================
     UI
  =============================== */

  return (
    <div className={isLight ? "" : "dark"}>
      <div
        className="
          min-h-screen
          transition-all duration-500
          px-4 sm:px-6 md:px-10
          py-6 md:py-10
          space-y-8 md:space-y-10

          bg-gradient-to-br 
          from-emerald-50 
          via-slate-50 
          to-green-100

          text-gray-800

          dark:bg-gradient-to-br 
          dark:from-[#071a14] 
          dark:via-[#0b1f14]
          dark:to-[#0d2f23]

          dark:text-white
        "
      >
        <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-10">

          {/* HEADER */}
          <InsightsHeader />

          {/* ===============================
              📊 STAT CARDS
          =============================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Monthly Spend"
              value={`$${currentMonthTotal.toFixed(2)}`}
              trend={Number(trendPercent.toFixed(1))}
              isExpense
            />

            <StatCard title="Safe to Spend" value="$842.20" />
            <StatCard title="Potential Savings" value="$340.00" highlight />
            <StatCard title="Subscription Audit" value="12 Active" />
          </div>

          {/* ===============================
              🚨 ALERT + TIP
          =============================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Example static overspending card */}
            {/* You can replace this with real overspending logic */}
            <OverspendingCard className="lg:col-span-2" />

            <GroceryTipCard />
          </div>

          {/* ===============================
              🎯 GOALS + SUBSCRIPTIONS
          =============================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <SubscriptionCard />

            {goals.length > 0 ? (
              goals.map((goal) => (
                <GoalProgressCard
                  key={goal.id}
                  goalName={goal.name}
                  saved={goal.savedAmount}
                  target={goal.targetAmount}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-sm opacity-70">
                No goals added yet.
              </div>
            )}

          </div>

          <TrendBreakdown />

        </div>
      </div>
    </div>
  );
}
