import { useState } from "react";
import { Camera, ScanLine } from "lucide-react";
import ScanStatus from "./ScanStatus";

export default function LiveCapture() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  return (
    <div
      className="
        relative rounded-2xl p-6
        bg-white/70 backdrop-blur-md
        border border-emerald-100
        shadow-xl
        dark:bg-white/5
        dark:border-emerald-900
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Camera className="text-emerald-600 dark:text-green-400" size={20} />
        <h2 className="font-semibold text-lg">
          Live Receipt Scanner
        </h2>
      </div>

      {/* Camera Preview Box */}
      <div
        className="
          relative h-[350px] rounded-xl overflow-hidden
          bg-gradient-to-br from-slate-200 to-slate-300
          dark:from-[#0f2c22]
          dark:to-[#123c2f]
          flex items-center justify-center
        "
      >
        {/* Fake Camera Placeholder */}
        {!isScanning && !scanComplete && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Camera Preview
          </span>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <>
            <ScanLine
              size={40}
              className="absolute text-emerald-500 animate-pulse"
            />

            <div
              className="
                absolute top-0 left-0 w-full h-1
                bg-emerald-500
                animate-[scan_2.5s_linear_forwards]
              "
            />

            <style>
              {`
                @keyframes scan {
                  0% { top: 0% }
                  100% { top: 100% }
                }
              `}
            </style>
          </>
        )}

        {/* Scan Complete Overlay */}
        {scanComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-emerald-400 font-semibold">
              ✓ Scan Complete
            </span>
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleScan}
        disabled={isScanning}
        className="
          mt-6 w-full py-2.5 rounded-lg
          bg-emerald-600 hover:bg-emerald-700
          dark:bg-green-500 dark:hover:bg-green-600
          text-white font-medium
          transition-all duration-300
          disabled:opacity-50
        "
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </button>

      {/* Status */}
      <div className="mt-4">
        <ScanStatus
          isScanning={isScanning}
          scanComplete={scanComplete}
        />
      </div>
    </div>
  );
}
