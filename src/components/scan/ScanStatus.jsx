import { Check } from "lucide-react";

export default function ScanStatus({
  isScanning,
  scanComplete
}) {
  const StatusItem = ({ label, active, done }) => {
    return (
      <span className="flex items-center gap-2">
        {done ? (
          <Check
            size={14}
            className="text-emerald-500 dark:text-green-400"
          />
        ) : (
          <span
            className={`
              h-2.5 w-2.5 rounded-full
              ${active
                ? "bg-emerald-500 dark:bg-green-400 animate-pulse"
                : "bg-gray-300 dark:bg-emerald-900"
              }
              dark:shadow-[0_0_6px_rgba(34,197,94,0.7)]
            `}
          />
        )}

        <span className="transition-all duration-300">
          {active ? "Processing..." : label}
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
      {/* Step 1 */}
      <StatusItem
        label="Auto-focus"
        active={isScanning && !scanComplete}
        done={scanComplete}
      />

      {/* Step 2 */}
      <StatusItem
        label="OCR Reading"
        active={isScanning}
        done={scanComplete}
      />

      {/* Step 3 */}
      <StatusItem
        label="Edge Detection"
        active={false}
        done={scanComplete}
      />
    </div>
  );
}
