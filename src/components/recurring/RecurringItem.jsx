import {
  Calendar,
  PauseCircle,
  PlayCircle,
  Trash2,
  Eye,
} from "lucide-react";

export default function RecurringItem({
  item,
  onToggle,
  onDelete,
  onView,
}) {
  if (!item) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-lg">
            {item.title || "Untitled"}
          </h2>

          <p className="text-2xl font-bold text-green-600 mt-1">
            ₹{item.amount || 0}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span>{item.category || "General"}</span>

            <span className="flex items-center gap-1 capitalize">
              <Calendar size={15} />
              {item.frequency || "monthly"}
            </span>

            <span>
              Next:{" "}
              {item.nextDueDate
                ? new Date(item.nextDueDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-2 rounded-full text-xs font-semibold ${
              item.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.isActive ? "Active" : "Paused"}
          </span>

          <button
            onClick={() => onView?.(item)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500 text-white"
          >
            <Eye size={16} />
            View
          </button>

          <button
            onClick={() => onToggle?.(item._id)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-500 text-white"
          >
            {item.isActive ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
            {item.isActive ? "Pause" : "Resume"}
          </button>

          <button
            onClick={() => onDelete?.(item._id)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}