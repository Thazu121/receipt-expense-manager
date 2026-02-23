import { Scan } from "lucide-react";
import ScanStatus from "./ScanStatus";

export default function LiveCapture() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold">Live Capture</h2>
        <p className="text-sm text-slate-400">
          Align the receipt inside the frame for automatic extraction
        </p>
      </div>

      <div className="bg-[#0e2a1b] border border-green-900 rounded-2xl p-5 space-y-4">
        <div className="relative h-[380px] rounded-xl bg-slate-800 flex items-center justify-center">
          <div className="absolute inset-5 border-2 border-green-500 rounded-lg" />
          <span className="absolute bottom-4 text-xs bg-green-600/20 text-green-400 px-4 py-1 rounded-full">
            AI SCANNING ACTIVE
          </span>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-400 transition text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
          <Scan size={18} />
          Scan Receipt
        </button>

        <ScanStatus />
      </div>
    </section>
  )
}
