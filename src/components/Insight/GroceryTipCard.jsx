import { ShoppingCart } from "lucide-react";

export default function GroceryTipCard({
  weeklySavings = 50,
  onCreatePlan,
}) {
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
      {/* Icon */}
      <div
        className="
          w-10 h-10 sm:w-11 sm:h-11 
          flex items-center justify-center 
          rounded-lg mb-4
          
          bg-emerald-100 text-emerald-600
          dark:bg-green-900 dark:text-green-400
        "
      >
        <ShoppingCart size={20} />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base sm:text-lg mb-2">
        Smart Grocery Tip
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        Switching to weekly planning could save
        <span className="text-emerald-600 dark:text-green-400 font-semibold">
          {" "} ${weeklySavings}/week
        </span>.
      </p>

      {/* Button */}
      <button
        onClick={onCreatePlan}
        className="
          mt-5 sm:mt-6 w-full py-2.5 rounded-lg
          transition-all duration-300
          
          bg-emerald-500 hover:bg-emerald-600
          active:scale-[0.98]
          text-white font-medium
          
          dark:bg-green-500 
          dark:hover:bg-green-600
          dark:text-black
        "
      >
        Create Grocery Plan
      </button>
    </div>
  );
}
