import { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AIRecommendationsCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const analysis = useMemo(() => {
    const total = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const average =
      expenses.length > 0
        ? total / expenses.length
        : 0;

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
        `Largest expense: ${highest.title || "Untitled"} (${formatCurrency(
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
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-5">
        AI Spending Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold mt-1 break-words">{value}</p>
    </div>
  );
}