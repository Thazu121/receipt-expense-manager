import RecurringItem from "./RecurringItem";
import { Repeat } from "lucide-react";

export default function RecurringList({
  items = [],
  loading = false,
  onToggle,
  onDelete,
  onView,
}) {
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl p-10 text-center">
        <Repeat size={50} className="mx-auto mb-3 opacity-50" />
        <h2 className="font-semibold text-lg">No recurring expenses</h2>
        <p className="text-gray-500 mt-2">
          Add rent, EMI, subscriptions or monthly bills.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <RecurringItem
          key={item._id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}