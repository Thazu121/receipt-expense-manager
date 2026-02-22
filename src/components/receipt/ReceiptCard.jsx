export default function ReceiptCard({ title, amount, date, category }) {
  return (
    <div className="bg-[#0e2a1b] border border-green-900 rounded-2xl overflow-hidden">
      <div className="h-48 bg-slate-700" />

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-green-400 font-bold">{amount}</span>
        </div>

        <p className="text-xs text-slate-400">{date}</p>

        <span className="inline-block text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>
  );
}
