export default function SpendingChart() {
  return (
    <div className="bg-[#13242c] border border-[#1e2a32] rounded-2xl p-6 h-full">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Spending Trends
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Daily average: $112.50
          </p>
        </div>

        <select className="bg-[#0f1c22] border border-[#1e2a32] text-sm text-gray-300 px-4 py-2 rounded-lg outline-none hover:border-emerald-500/40 transition">
          <option>Last 7 months</option>
          <option>Last 30 days</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Chart Area */}
      <div className="h-80 bg-gradient-to-b from-[#0f1c22] to-[#0b1418] border border-[#1e2a32] rounded-xl flex items-center justify-center relative overflow-hidden">
        
        {/* Fake chart grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#1e2a32_1px,_transparent_1px)] [background-size:20px_20px]" />

        <p className="text-gray-500 text-sm z-10">
          Chart visualization will render here
        </p>
      </div>

    </div>
  );
}
