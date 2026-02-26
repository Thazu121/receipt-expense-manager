import { Check } from "lucide-react";

export default function ScanStatus({ isScanning, scanComplete }) {
  const StatusItem = ({ label, processing }) => {
    return (
      <span className="flex items-center gap-2">
        {scanComplete ? (
          <Check
            size={14}
            className="text-emerald-500 dark:text-green-400"
          />
        ) : (
          <span
            className={`
              h-2.5 w-2.5 rounded-full
              bg-emerald-500 dark:bg-green-400
              ${isScanning ? "animate-pulse" : ""}
              dark:shadow-[0_0_6px_rgba(34,197,94,0.7)]
            `}
          />
        )}

        <span className="transition-all duration-300">
          {processing && isScanning
            ? "Processing..."
            : label}
        </span>
      </span>
    );
  };

  return (
    <div
      className="
        flex justify-between items-center
        text-xs font-medium
        text-gray-500
        dark:text-green-400
        pt-2
      "
    >
      <StatusItem label="Auto-focus" />
      <StatusItem label="OCR Ready" processing />
      <StatusItem label="Edge Detection" />
    </div>
  );
}
