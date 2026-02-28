import { useSelector } from "react-redux";

export default function GoalProgressCard() {
  const goals = useSelector((state) => state.goal.goals);

  /* ================= EMPTY STATE ================= */
  if (!goals || goals.length === 0) {
    return (
      <div
        className="
          col-span-full
          p-6
          rounded-2xl
          bg-white/80
          backdrop-blur-md
          border border-emerald-100
          dark:bg-[#0f2e24]/60
          dark:border-green-800
          text-center
          text-sm
          opacity-70
        "
      >
        No goals added yet.
      </div>
    );
  }

  /* ================= GOAL CARDS ================= */
  return (
    <>
      {goals.map((goal) => {
        const saved = Number(goal.savedAmount || 0);
        const target = Number(goal.targetAmount || 0);

        const percentage =
          target > 0
            ? Math.min((saved / target) * 100, 100)
            : 0;

        const remaining =
          target > saved ? target - saved : 0;

        const isCompleted = saved >= target && target > 0;

        return (
          <div
            key={goal.id}
            className="
              p-6
              rounded-2xl
              bg-white/80
              backdrop-blur-md
              border border-emerald-100
              dark:bg-[#0f2e24]/60
              dark:border-green-800
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            {/* ================= TITLE ================= */}
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {goal.name}
            </h3>

            {/* ================= AMOUNTS ================= */}
            <div className="flex justify-between text-sm mt-3">
              <span className="font-semibold text-gray-800 dark:text-white">
                ${saved.toFixed(2)}
              </span>
              <span className="opacity-70">
                ${target.toFixed(2)}
              </span>
            </div>

            {/* ================= PROGRESS BAR ================= */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
              <div
                className={`
                  h-full
                  transition-all duration-700 ease-out
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : "bg-emerald-500"
                  }
                `}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex justify-between items-center mt-3 text-xs">
              <span className="opacity-70">
                {percentage.toFixed(1)}% completed
              </span>

              {isCompleted ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Goal Achieved 🎉
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-green-400">
                  ${remaining.toFixed(2)} left
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
