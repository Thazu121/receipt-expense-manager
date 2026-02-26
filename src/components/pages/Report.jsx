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
          
          <InsightsHeader />

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard title="Monthly Spend" value="$4,281.40" />
            <StatCard title="Safe to Spend" value="$842.20" />
            <StatCard title="Potential Savings" value="$340.00" highlight />
            <StatCard title="Subscription Audit" value="12 Active" />
          </div>

          {/* ALERT + TIP */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OverspendingCard className="lg:col-span-2" />
            <GroceryTipCard />
          </div>

          {/* SUBSCRIPTION + GOAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SubscriptionCard />
            <GoalProgressCard />
          </div>

          {/* TREND */}
          <TrendBreakdown />

        </div>
      </div>
    </div>
  );
}
