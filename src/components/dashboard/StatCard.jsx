export default function StatCard({ title, value, icon, accent = "emerald" }) {
  const accentStyles = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    blue: "bg-blue-500/10 text-blue-400",
    purple: "bg-purple-500/10 text-purple-400",
    orange: "bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="bg-[#13242c] border border-[#1f2f36] rounded-xl p-6 hover:border-[#2a3d45] transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{title}</p>

        {icon && (
          <div className={`p-2 rounded-lg ${accentStyles[accent]}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <h2 className="text-2xl font-semibold text-white mt-4">
        {value}
      </h2>
    </div>
  );
}
