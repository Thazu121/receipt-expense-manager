import { RotateCcw } from "lucide-react";

export default function ExtractedDetails() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Extracted Details</h2>
        <span className="text-xs text-green-400 bg-green-600/20 px-3 py-1 rounded-full">
          98% CONFIDENCE
        </span>
      </div>

      <div className="bg-[#0e2a1b] border border-green-900 rounded-2xl p-5 space-y-4">
        <input
          value="Blue Bottle Coffee"
          className="w-full bg-[#122b1e] border border-green-900 rounded-lg px-3 py-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            value="11/24/2023"
            className="bg-[#122b1e] border border-green-900 rounded-lg px-3 py-2"
          />
          <select className="bg-[#122b1e] border border-green-900 rounded-lg px-3 py-2">
            <option>Food & Drinks</option>
          </select>
        </div>

        <div className="text-2xl font-bold text-green-400">$12.45</div>

        <textarea
          placeholder="Add additional details..."
          className="w-full bg-[#122b1e] border border-green-900 rounded-lg px-3 py-2"
        />

        <div className="flex gap-3">
          <button className="flex-1 bg-green-500 text-black font-semibold py-3 rounded-xl">
            Save Expense
          </button>
          <button className="flex items-center gap-2 px-4 border border-green-700 rounded-xl">
            <RotateCcw size={16} /> Retake
          </button>
        </div>
      </div>
    </section>
  )
}
