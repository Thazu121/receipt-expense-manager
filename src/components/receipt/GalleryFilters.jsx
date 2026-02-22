export default function GalleryFilters() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <input
        placeholder="Search by merchant or item..."
        className="flex-1 bg-[#122b1e] border border-green-900 rounded-lg px-4 py-2"
      />

      <select className="bg-[#122b1e] border border-green-900 rounded-lg px-4 py-2">
        <option>Last 30 Days</option>
      </select>

      <select className="bg-[#122b1e] border border-green-900 rounded-lg px-4 py-2">
        <option>All Categories</option>
      </select>

      <div className="flex gap-2">
        <button className="w-10 h-10 bg-green-600/20 rounded-lg">▦</button>
        <button className="w-10 h-10 bg-[#122b1e] rounded-lg">☰</button>
      </div>
    </div>
  );
}
