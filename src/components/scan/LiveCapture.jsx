import { useState } from "react";
import { Camera, ScanLine } from "lucide-react";
import ScanStatus from "./ScanStatus";
import { useDispatch } from "react-redux";
import { setScannedReceipt } from "../../redux/features/receiptSlice";
import { scanReceiptLoader } from "../../loaders/ScanLoader";

export default function LiveCapture() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const dispatch = useDispatch();
const handleFileUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

  console.log("REAL FILE:", file); // Must log File object

  const imageUrl = URL.createObjectURL(file);
  setCapturedImage(imageUrl);

  setIsScanning(true);
  setScanComplete(false);

  try {
    // ✅ PASS THE REAL FILE
    const data = await scanReceiptLoader(file);

    console.log("OCR RESULT:", data);

    if (data.success) {
      dispatch(
        setScannedReceipt({
          id: Date.now(),
          store: data.store || "",
          amount: data.amount || "",
          date: "",
          category: "",
          notes: "",
        })
      );
    }

  } catch (error) {
    console.error("SCAN ERROR:", error);
  }

  setIsScanning(false);
  setScanComplete(true);
};


  return (
    <div
      className="
        h-full flex flex-col
        rounded-2xl p-6
        bg-white/70 backdrop-blur-md
        border border-emerald-100
        shadow-xl
        dark:bg-white/5
        dark:border-emerald-900
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Camera className="text-emerald-600 dark:text-green-400" size={20} />
        <h2 className="font-semibold text-lg">Upload Receipt</h2>
      </div>

      {/* Preview Section */}
      <div className="flex-1 flex flex-col">
        <div
          className="
            relative h-[480px] rounded-xl overflow-hidden
            bg-gradient-to-br from-slate-200 to-slate-300
            dark:from-[#0f2c22]
            dark:to-[#123c2f]
            flex items-center justify-center
          "
        >
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Uploaded"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No image selected
            </span>
          )}

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
                  animate-[scan_2s_linear_forwards]
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

          {scanComplete && !isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-emerald-400 font-semibold">
                ✓ Scan Complete
              </span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-6">
          <ScanStatus
            isScanning={isScanning}
            scanComplete={scanComplete}
          />
        </div>
      </div>

      {/* Upload Button */}
      <label
        className="
          mt-6 block w-full text-center py-2.5 rounded-lg
          bg-emerald-600 hover:bg-emerald-700
          dark:bg-green-500 dark:hover:bg-green-600
          text-white font-medium cursor-pointer
          transition-all duration-300
        "
      >
        Select Receipt Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
