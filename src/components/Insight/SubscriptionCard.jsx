export default function SubscriptionCard({
  subscriptions = [
    { name: "Netflix", price: 19.99 },
    { name: "Hulu", price: 74.99 },
  ],
  onManage,
}) {
  const total = subscriptions.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div
      className="
        p-5 sm:p-6 rounded-2xl transition-all duration-300
        shadow-sm hover:shadow-lg
        
        bg-white/80 backdrop-blur-md
        border border-emerald-100
        
        dark:bg-[#0f2e24]/60
        dark:border-green-800
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-base sm:text-lg">
          Subscription Audit
        </h3>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {subscriptions.length} Active
        </span>
      </div>

      {/* List */}
      <div className="space-y-3 sm:space-y-4 max-h-48 overflow-y-auto pr-1">
        {subscriptions.map((item, index) => (
          <div
            key={index}
            className="
              flex justify-between items-center
              p-3 rounded-lg transition-all duration-200
              
              bg-emerald-50 hover:bg-emerald-100
              dark:bg-white/5 dark:hover:bg-white/10
            "
          >
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {item.name}
            </span>

            <span className="font-semibold text-gray-900 dark:text-white">
              ${item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-white/10 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Monthly
        </span>

        <span className="text-lg font-bold text-emerald-600 dark:text-green-400">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Manage Button */}
      <button
        onClick={onManage}
        className="
          mt-5 w-full py-2.5 rounded-lg transition-all duration-300
          text-sm font-medium
          
          bg-emerald-500 hover:bg-emerald-600
          text-white
          
          dark:bg-green-500
          dark:hover:bg-green-600
          dark:text-black
        "
      >
        Manage Subscriptions
      </button>
    </div>
  );
}
