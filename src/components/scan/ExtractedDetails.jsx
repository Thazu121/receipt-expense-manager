import { RotateCcw } from "lucide-react";

export default function ExtractedDetails() {
  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Extracted Details
        </h2>

        <span
          className="
            text-xs font-semibold tracking-wide
            px-3 py-1 rounded-full
            bg-emerald-100 text-emerald-700
            border border-emerald-200
            
            dark:bg-emerald-500/10
            dark:text-emerald-400
            dark:border-emerald-500/30
          "
        >
          98% CONFIDENCE
        </span>
      </div>

      {/* Card */}
      <div
        className="
          rounded-2xl p-6 space-y-6 transition-all duration-500
          
          bg-white/90 backdrop-blur-xl
          border border-emerald-100
          shadow-md
          
          dark:bg-[#0c1f19]/70
          dark:border-emerald-900/60
          dark:shadow-none
        "
      >

        {/* Merchant */}
        <div>
          <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">
            Merchant
          </label>
          <input
            defaultValue="Blue Bottle Coffee"
            className="
              w-full rounded-xl px-4 py-2.5 transition
              bg-white border border-gray-200 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              
              dark:bg-[#122b1e]
              dark:border-emerald-900
              dark:text-white
              dark:focus:ring-emerald-500
            "
          />
        </div>

        {/* Date & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">
              Date
            </label>
            <input
              type="date"
              className="
                w-full rounded-xl px-4 py-2.5 transition
                bg-white border border-gray-200 text-gray-700
                focus:outline-none focus:ring-2 focus:ring-emerald-400

                dark:bg-[#122b1e]
                dark:border-emerald-900
                dark:text-white
                dark:focus:ring-emerald-500
              "
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">
              Category
            </label>
            <select
              className="
                w-full rounded-xl px-4 py-2.5 transition
                bg-white border border-gray-200 text-gray-700
                focus:outline-none focus:ring-2 focus:ring-emerald-400

                dark:bg-[#122b1e]
                dark:border-emerald-900
                dark:text-white
                dark:focus:ring-emerald-500
              "
            >
              <option>Food & Drinks</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Subscriptions</option>
            </select>
          </div>
        </div>

        {/* Amount Section */}
        <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900/60">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Total Amount
          </p>

          <div
            className="
              text-4xl font-bold mt-1
              text-emerald-600
              drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]
              
              dark:text-emerald-400
              dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]
            "
          >
            $12.45
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">
            Notes
          </label>
          <textarea
            placeholder="Add additional details..."
            className="
              w-full rounded-xl px-4 py-2.5 transition
              bg-white border border-gray-200 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-emerald-400

              dark:bg-[#122b1e]
              dark:border-emerald-900
              dark:text-white
              dark:focus:ring-emerald-500
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">

          <button
            className="
              flex-1 py-3 rounded-xl font-semibold transition-all duration-300
              
              bg-emerald-600 text-white
              hover:bg-emerald-500
              hover:shadow-lg hover:shadow-emerald-500/30
              active:scale-[0.98]

              dark:bg-emerald-500
              dark:text-black
              dark:hover:bg-emerald-400
            "
          >
            Save Expense
          </button>

          <button
            className="
              flex items-center gap-2 px-5 rounded-xl transition
              border border-gray-300 text-gray-700
              hover:bg-gray-100
              
              dark:border-emerald-800
              dark:text-emerald-400
              dark:hover:bg-emerald-900/30
            "
          >
            <RotateCcw size={16} />
            Retake
          </button>

        </div>

      </div>
    </section>
  );
}
