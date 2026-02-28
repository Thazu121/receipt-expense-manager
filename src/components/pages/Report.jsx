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

  return (
    <div className={isLight ? "" : "dark"}>
      <div className="min-h-screen px-6 py-8 space-y-8">

        <InsightsHeader />

        {/* Each card connects to Redux itself */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard type="monthly" />
          <StatCard type="safe" />
          <StatCard type="savings" />
          <StatCard type="subscription" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OverspendingCard className="lg:col-span-2" />
          <GroceryTipCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SubscriptionCard />
          <GoalProgressCard />
        </div>

        <TrendBreakdown />

      </div>
    </div>
  );
}
