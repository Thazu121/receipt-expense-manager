import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import InsightsHeader from "../Insight/InsightsHeader";
import DateFilter from "../Insight/DateFilter";

import SummaryCard from "../Insight/SummaryCard";
import FinancialOverviewCard from "../Insight/FinancialOverviewCard";
import CashFlowCard from "../Insight/CashFlowCard";
import AverageTransactionCard from "../Insight/AverageTransactionCard"
import MonthlyComparisonCard from "../Insight/MonthlyComparisonCard";
import TrendBreakdown from "../Insight/TrendBreakdown";
import CategoryPerformanceCard from "../Insight/CategoryPerformanceCard";
import TopCategoriesCard from "../Insight/TopCategoriescard"
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
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-8
            space-y-8
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >
            <InsightsHeader />

            <DateFilter
              onChange={setRange}
            />
          </div>

          <SummaryCard
            expenses={filteredExpenses}
          />

          <FinancialOverviewCard
            expenses={filteredExpenses}
          />

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
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

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-6
            "
          >
            <div className="xl:col-span-2">
              <TrendBreakdown
                expenses={filteredExpenses}
              />
            </div>

            <OverspendingCard
              expenses={expenses}
            />
          </div>

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >
            <CategoryPerformanceCard
              expenses={filteredExpenses}
            />

            <TopCategoriesCard
              expenses={filteredExpenses}
            />
          </div>

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >
            <LargeExpensesCard
              expenses={filteredExpenses}
            />

            <TopMerchantCard
              receipts={receipts}
            />
          </div>

          <AIRecommendationsCard
            expenses={filteredExpenses}
          />
        </div>
      </div>
    </div>
  );
}