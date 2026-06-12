import {
  Repeat,
  PauseCircle,
  Wallet,
} from "lucide-react";

export default function RecurringStats({ items = [] }) {
  const active = items.filter(
    (i) => i.isActive
  ).length;

  const paused = items.filter(
    (i) => !i.isActive
  ).length;

  const totalMonthly = items.reduce(
    (sum, item) => {
      if (!item.isActive) return sum;

      const amount = Number(
        item.amount || 0
      );

      if (item.frequency === "daily")
        return sum + amount * 30;

      if (item.frequency === "weekly")
        return sum + amount * 4;

      if (item.frequency === "yearly")
        return sum + amount / 12;

      return sum + amount;
    },
    0
  );

  const cards = [
    {
      title: "Monthly Estimate",
      value: `₹${totalMonthly.toLocaleString(
        "en-IN"
      )}`,
      icon: Wallet,
      color:
        "bg-green-600 text-white border-green-600",
    },
    {
      title: "Active",
      value: active,
      icon: Repeat,
      color:
        "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white",
    },
    {
      title: "Paused",
      value: paused,
      icon: PauseCircle,
      color:
        "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              ${card.color}
              border
              dark:border-zinc-700
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
              min-w-0
              overflow-hidden
            `}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm opacity-70">
                  {card.title}
                </p>

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    lg:text-3xl
                    font-bold
                    mt-2
                    break-words
                  "
                >
                  {card.value}
                </h2>
              </div>

              <Icon
                size={26}
                className="shrink-0"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}