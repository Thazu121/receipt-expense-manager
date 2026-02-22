export default function Pagination() {
  return (
    <div className="flex justify-center gap-2 pt-6">
      <button className="px-3 py-2 rounded-lg bg-[#122b1e]">‹</button>
      <button className="px-4 py-2 rounded-lg bg-green-500 text-black">1</button>
      <button className="px-4 py-2 rounded-lg bg-[#122b1e]">2</button>
      <button className="px-4 py-2 rounded-lg bg-[#122b1e]">3</button>
      <button className="px-3 py-2 rounded-lg bg-[#122b1e]">›</button>
    </div>
  );
}
