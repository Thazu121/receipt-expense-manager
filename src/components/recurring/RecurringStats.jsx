import { Repeat, PauseCircle, Wallet } from "lucide-react";

export default function RecurringStats({ items = [] }) {
  const active = items.filter((i) => i.isActive).length;
  const paused = items.filter((i) => !i.isActive).length;

  const totalMonthly = items.reduce((sum, item) => {
    if (!item.isActive) return sum;

    const amount = Number(item.amount || 0);

    if (item.frequency === "daily") return sum + amount * 30;
    if (item.frequency === "weekly") return sum + amount * 4;
    if (item.frequency === "yearly") return sum + amount / 12;

    return sum + amount;
  }, 0);

  const cards = [
    {
      title: "Monthly Estimate",
      value: `₹${totalMonthly.toFixed(0)}`,
      icon: Wallet,
      color: "bg-green-600 text-white",
    },
    {
      title: "Active",
      value: active,
      icon: Repeat,
      color: "bg-white dark:bg-zinc-900",
    },
    {
      title: "Paused",
      value: paused,
      icon: PauseCircle,
      color: "bg-white dark:bg-zinc-900",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.color} border dark:border-zinc-700 rounded-2xl p-5 shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">{card.title}</p>
                <h2 className="text-2xl font-bold mt-1">
                  {card.value}
                </h2>
              </div>

              <Icon size={28} />
            </div>
          </div>
        );
      })}
    </div>
  );
}