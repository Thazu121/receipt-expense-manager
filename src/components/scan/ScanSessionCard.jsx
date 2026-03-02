export default function ScanSessionCard() {
  return (
    <div className="bg-black/40 border border-green-500/30 rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Scanning Session</h3>
        <p className="text-sm text-gray-400">
          12 receipts processed today
        </p>
      </div>
      <button className="text-green-400 font-medium hover:underline">
        View Batch
      </button>
    </div>
  );
}
