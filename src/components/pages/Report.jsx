import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import InsightsHeader from "../Insight/InsightsHeader";
import DateFilter from "../Insight/DateFilter";

import SummaryCard from "../Insight/SummaryCard";
import FinancialOverviewCard from "../Insight/FinancialOverviewCard";
import CashFlowCard from "../Insight/CashFlowCard";
import AverageTransactionCard from "../Insight/AverageTransactionCard";
import MonthlyComparisonCard from "../Insight/MonthlyComparisonCard";
import TrendBreakdown from "../Insight/TrendBreakdown";
import CategoryPerformanceCard from "../Insight/CategoryPerformanceCard";
import TopCategoriesCard from "../Insight/TopCategoriesCard.jsx";
import LargeExpensesCard from "../Insight/LargeExpensesCard";
import TopMerchantCard from "../Insight/TopMerchantCard";
import AIRecommendationsCard from "../Insight/AIRecommendationsCard";
import OverspendingCard from "../Insight/OverspendingCard";

export default function InsightsPage() {
  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const expenses = useSelector(
    (state) => state.expense.expenses || []
  );

  const receipts = useSelector(
    (state) => state.receipt.receipts || []
  );

  const [range, setRange] = useState(30);

  const filteredExpenses = useMemo(() => {
    if (Number(range) === 0) {
      return expenses;
    }

    const cutoff = new Date();
    cutoff.setDate(
      cutoff.getDate() - Number(range)
    );

    return expenses.filter((expense) => {
      const date = new Date(
        expense.expenseDate || expense.date
      );

      return !isNaN(date) && date >= cutoff;
    });
  }, [expenses, range]);

  return (
    <div className={isLight ? "" : "dark"}>
      <div
        className="
          min-h-screen
          bg-gray-50
          dark:bg-[#071a14]
          transition-colors
          duration-300
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto

            px-3
            py-4

            sm:px-5
            sm:py-6

            lg:px-8
            lg:py-8

            space-y-5
            sm:space-y-6
            lg:space-y-8
          "
        >
          {/* Header */}
          <div
            className="
              flex
              flex-col

              lg:flex-row
              lg:items-center
              lg:justify-between

              gap-4
            "
          >
            <InsightsHeader />

            <div className="w-full lg:w-auto">
              <DateFilter
                onChange={setRange}
              />
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCard
            expenses={filteredExpenses}
          />

          {/* Financial Overview */}
          <FinancialOverviewCard
            expenses={filteredExpenses}
          />

          {/* Top KPI Cards */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-4
              lg:gap-6
            "
          >
            <CashFlowCard
              expenses={filteredExpenses}
            />

            <AverageTransactionCard
              expenses={filteredExpenses}
            />

            <MonthlyComparisonCard
              expenses={expenses}
            />
          </div>

          {/* Trend + Overspending */}
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-4
              lg:gap-6
            "
          >
            <div className="xl:col-span-2 min-w-0">
              <TrendBreakdown
                expenses={filteredExpenses}
              />
            </div>

            <div className="min-w-0">
              <OverspendingCard
                expenses={expenses}
              />
            </div>
          </div>

          {/* Categories */}
          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-2
              gap-4
              lg:gap-6
            "
          >
            <CategoryPerformanceCard
              expenses={filteredExpenses}
            />

            <TopCategoriesCard
              expenses={filteredExpenses}
            />
          </div>

          {/* Merchants + Large Expenses */}
          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-2
              gap-4
              lg:gap-6
            "
          >
            <LargeExpensesCard
              expenses={filteredExpenses}
            />

            <TopMerchantCard
              receipts={receipts}
            />
          </div>

          {/* AI Insights */}
          <AIRecommendationsCard
            expenses={filteredExpenses}
          />
        </div>
      </div>
    </div>
  );
}