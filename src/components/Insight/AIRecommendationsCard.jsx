import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Brain, Lightbulb, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AIRecommendationsCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const analysis = useMemo(() => {
    const total = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const average = expenses.length ? total / expenses.length : 0;
    const categoryMap = {};

    expenses.forEach((expense) => {
      const category =
        expense.categoryId?.name ||
        expense.category?.name ||
        expense.category ||
        "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) + Number(expense.amount || 0);
    });

    const topCategory = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const highest = [...expenses].sort(
      (a, b) => Number(b.amount || 0) - Number(a.amount || 0)
    )[0];

    const recommendations = [];

    if (topCategory && topCategory[1] > total * 0.4) {
      recommendations.push(
        `${topCategory[0]} takes a large share of your spending. Try reviewing this category.`
      );
    }

    if (average > 2000) {
      recommendations.push(
        "Your average transaction is high. Check large purchases carefully."
      );
    }

    if (highest) {
      recommendations.push(
        `Largest expense: ${highest.title || highest.store || "Untitled"} (${formatCurrency(
          highest.amount,
          currency
        )}).`
      );
    }

    if (!recommendations.length) {
      recommendations.push("Your spending pattern looks stable.");
    }

    return {
      total,
      average,
      topCategory,
      recommendations,
    };
  }, [expenses, currency]);

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-4 sm:p-5 lg:p-6
        overflow-hidden
      "
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold">
            AI Spending Insights
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Smart suggestions from your expenses
          </p>
        </div>

        <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <Brain size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <MiniStat
          title="Total Spending"
          value={formatCurrency(analysis.total, currency)}
        />

        <MiniStat
          title="Average Expense"
          value={formatCurrency(analysis.average, currency)}
        />

        <MiniStat
          title="Top Category"
          value={analysis.topCategory?.[0] || "N/A"}
        />
      </div>

      <div className="space-y-3">
        {analysis.recommendations.map((item, index) => (
          <div
            key={index}
            className="
              flex items-start gap-3
              p-3 sm:p-4
              rounded-xl
              bg-emerald-50 dark:bg-emerald-900/20
              border border-emerald-100 dark:border-emerald-800
              text-sm text-gray-700 dark:text-gray-200
            "
          >
            <Lightbulb
              size={18}
              className="shrink-0 text-emerald-600 mt-0.5"
            />
            <p className="leading-relaxed break-words">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="min-w-0 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {title}
        </p>
        <TrendingUp size={16} className="shrink-0 text-emerald-500" />
      </div>

      <p className="text-lg sm:text-xl font-bold mt-2 break-words">
        {value}
      </p>
    </div>
  );
}