import { useDispatch, useSelector } from "react-redux";
import { addSavings } from "../../redux/features/goalSlice";
import { useState } from "react";

export default function GoalProgressCard({ id }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const goal = useSelector((state) =>
    state.goal.goals.find((g) => g.id === id)
  );

  if (!goal) return null;

  const { name, savedAmount = 0, targetAmount = 0 } = goal;

  const percentage =
    targetAmount > 0
      ? Math.min(
          Math.round((savedAmount / targetAmount) * 100),
          100
        )
      : 0;

  const remaining = Math.max(
    targetAmount - savedAmount,
    0
  );

  const handleAddSavings = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;

    dispatch(addSavings({ id, amount: numericAmount }));
    setAmount("");
  };

  return (
    <div
      className="
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        shadow-sm hover:shadow-lg
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base sm:text-lg">
          {name}
        </h3>

        <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-green-400">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-emerald-100 dark:bg-white/10 h-3 rounded-full overflow-hidden">
        <div
          className="
            h-3 rounded-full transition-all duration-700
            bg-gradient-to-r 
            from-emerald-400 
            to-emerald-600
            dark:from-green-400 
            dark:to-green-600
          "
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-1 sm:gap-0">
        <span>${savedAmount.toFixed(2)} saved</span>
        <span>Goal: ${targetAmount.toFixed(2)}</span>
        <span>${remaining.toFixed(2)} remaining</span>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Add amount"
          className="
            flex-1 px-3 py-2 rounded-lg text-sm
            border border-gray-300
            dark:bg-[#12352c] dark:border-green-800
            outline-none focus:ring-2 focus:ring-emerald-400
          "
        />

        <button
          onClick={handleAddSavings}
          disabled={percentage === 100}
          className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-emerald-500 text-white
            hover:bg-emerald-600 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}
