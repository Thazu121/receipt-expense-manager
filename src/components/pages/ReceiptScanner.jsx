import { useSelector } from "react-redux";
import LiveCapture from "../scan/LiveCapture";
import ExtractedDetails from "../scan/ExtractedDetails";

export default function ScanReceipt() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div className={isLight ? "" : "dark"}>
      <div
        className="
          min-h-screen transition-all duration-500
          
          bg-gradient-to-br 
          from-emerald-50 
          via-slate-50 
          to-green-100
          
          text-gray-800
          
          dark:bg-gradient-to-br 
          dark:from-[#071a14] 
          dark:via-[#0b1f14] 
          dark:to-[#0d2f23]
          
          dark:text-white
        "
      >
        <main className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <LiveCapture />
            <ExtractedDetails />
          </div>
        </main>
      </div>
    </div>
  );
}
