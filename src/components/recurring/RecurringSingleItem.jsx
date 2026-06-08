import { X, Calendar, Wallet, Repeat } from "lucide-react";

export default function RecurringSingleItem({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-xl">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            Recurring Details
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">Title</p>
            <h3 className="text-lg font-bold">{item.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <Wallet className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <h3 className="font-bold">₹{item.amount}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Repeat className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Frequency</p>
              <h3 className="font-bold capitalize">
                {item.frequency}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Next Due Date</p>
              <h3 className="font-bold">
                {item.nextDueDate
                  ? new Date(item.nextDueDate).toLocaleDateString()
                  : "N/A"}
              </h3>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Category</p>
            <h3 className="font-bold">
              {item.category || "General"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                item.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.isActive ? "Active" : "Paused"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}