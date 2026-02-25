export default function CategoriesCard() {
  const categories = [
    { name: "Food & Dining", percent: 42, color: "bg-emerald-500" },
    { name: "Transport", percent: 24, color: "bg-blue-500" },
    { name: "Shopping", percent: 18, color: "bg-purple-500" },
    { name: "Entertainment", percent: 16, color: "bg-orange-500" },
  ];

  return (
    <div className="bg-[#13242c] border border-[#1f2f36] rounded-xl p-6 h-full">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Top Categories
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Where your money goes
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        {categories.map((cat, i) => (
          <div key={i}>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">{cat.name}</span>
              <span className="text-gray-400">{cat.percent}%</span>
            </div>

            <div className="w-full h-2 bg-[#0f1c22] rounded-full">
              <div
                className={`h-2 rounded-full ${cat.color}`}
                style={{ width: `${cat.percent}%` }}
              ></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
