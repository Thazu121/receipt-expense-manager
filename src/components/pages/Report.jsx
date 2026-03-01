import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import InsightsHeader from "../Insight/InsightsHeader";
import FinancialOverviewCard from "../Insight/FinancialOverviewCard";
import CashFlowCard from "../Insight/CashFlowCard";
import OverspendingCard from "../Insight/OverspendingCard";
import CategoryPerformanceCard from "../Insight/CategoryPerformanceCard";
import TrendBreakdown from "../Insight/TrendBreakdown";
import StatCard from "../Insight/StatCard";
import DateFilter from "../Insight/DateFilter";

export default function InsightsPage() {
  const isLight = useSelector((state) => state.theme.isLight);
  const receipts = useSelector((state) => state.receipt.receipts);

  const [range, setRange] = useState("30");

  // 🔥 Filter receipts based on selected range
  const filteredReceipts = useMemo(() => {
    const days = Number(range);
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(now.getDate() - days);

    return receipts.filter((r) => {
      const date = new Date(r.date);
      return date >= cutoff;
    });
  }, [receipts, range]);

  return (
    <div className={isLight ? "" : "dark"}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#071a14] dark:to-[#04110c] transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <InsightsHeader />
            <DateFilter onChange={setRange} />
          </div>

          {/* Financial Overview */}
          <div className="mb-10">
            <FinancialOverviewCard receipts={filteredReceipts} />
          </div>

          {/* Cash Flow + Average */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <CashFlowCard receipts={filteredReceipts} />
            <StatCard type="monthly" receipts={filteredReceipts} />
          </div>

          {/* Trend + Alert */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <TrendBreakdown receipts={filteredReceipts} />
            </div>
            <OverspendingCard receipts={filteredReceipts} />
          </div>

          {/* Category Breakdown */}
          <CategoryPerformanceCard receipts={filteredReceipts} />

        </div>
      </div>
    </div>
  );
}
