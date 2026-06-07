import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function ExpenseStats() {
const expenses = useSelector(
(state) => state.expense.expenses
);

const isLight = useSelector(
(state) => state.theme.isLight
);

const stats = useMemo(() => {
const categoryTotals = {};
let totalAmount = 0;


expenses.forEach((expense) => {
  const amount = Number(expense.amount || 0);

  totalAmount += amount;

  const category =
    expense.category?.name ||
    expense.categoryId?.name ||
    expense.category ||
    "General";

  categoryTotals[category] =
    (categoryTotals[category] || 0) +
    amount;
});

const topCategory =
  Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ||
  "N/A";

return {
  totalAmount,
  totalExpenses: expenses.length,
  topCategory,
};


}, [expenses]);

return ( <div
   className="
     grid
     grid-cols-1
     sm:grid-cols-2
     xl:grid-cols-3
     gap-4
     mb-6
   "
 >
<StatCard
title="Total Spending"
value={`₹${stats.totalAmount.toFixed(2)}`}
isLight={isLight}
/>


  <StatCard
    title="Total Expenses"
    value={stats.totalExpenses}
    isLight={isLight}
  />

  <StatCard
    title="Top Category"
    value={stats.topCategory}
    isLight={isLight}
  />
</div>

);
}

function StatCard({
title,
value,
isLight,
}) {
return (
<div
className={`rounded-2xl p-5 shadow-lg ${
        isLight
          ? "bg-white border border-gray-200"
          : "bg-white/5 border border-white/10 backdrop-blur-xl"
      }`}
>
<p
className={`text-sm ${
          isLight
            ? "text-gray-500"
            : "text-gray-400"
        }`}
>
{title} </p>


  <h2 className="text-3xl font-bold mt-2">
    {value}
  </h2>
</div>


);
}
