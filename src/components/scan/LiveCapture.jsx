import { useState, useRef, useEffect } from "react";
import { Camera, ScanLine } from "lucide-react";
import ScanStatus from "./ScanStatus";
import { useDispatch, useSelector } from "react-redux";
import { setScannedReceipt } from "../../redux/features/receiptSlice";
import { ScanReceiptOCR } from "../scan/ScanReceiptOCR";

export default function LiveCapture() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const scanned = useSelector(
    (state) => state.receipt.scannedReceipt
  );

  /* -----------------------------
     Cleanup Object URL
  ------------------------------ */
  useEffect(() => {
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  /* -----------------------------
     Reset When Receipt Cleared
  ------------------------------ */
  useEffect(() => {
    if (!scanned) {
      setCapturedImage(null);
      setScanComplete(false);
      setIsScanning(false);
      setError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [scanned]);

  /* -----------------------------
     Handle Upload
  ------------------------------ */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    setError("");
    setScanComplete(false);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setCapturedImage(imageUrl);
    setIsScanning(true);

    try {
      const result = await ScanReceiptOCR(file);

      if (result?.success && result?.data) {
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

        const scannedReceipt = {
          ...result.data,
          amount: Number(result.data.amount),
          image: base64Image,
        };

        dispatch(setScannedReceipt(scannedReceipt));
        setScanComplete(true);
      } else {
        setError(result?.message || "Failed to extract receipt data.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong during scanning.");
    }

    setIsScanning(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-full flex flex-col rounded-2xl p-6 bg-white/70 backdrop-blur-md border border-emerald-100 shadow-xl dark:bg-white/5 dark:border-emerald-900 transition-all duration-500">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Camera className="text-emerald-600 dark:text-green-400" size={20} />
        <h2 className="font-semibold text-lg">Upload Receipt</h2>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col">
        <div className="relative h-[60vh] max-h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#0f2c22] dark:to-[#123c2f] flex items-center justify-center">

          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Uploaded Receipt"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No image selected
            </span>
          )}

          {/* 🔥 Scanning Animation */}
          {isScanning && (
            <>
              <ScanLine
                size={40}
                className="absolute text-emerald-500 animate-pulse z-20"
              />

              <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan z-20" />
            </>
          )}

          {scanComplete && !isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-emerald-400 font-semibold text-lg">
                ✓ Scan Complete
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="mt-6">
          <ScanStatus isScanning={isScanning} scanComplete={scanComplete} />
        </div>
      </div>

      {/* Upload Button */}
      <label
        className={`mt-6 block w-full text-center py-3 rounded-xl text-white font-medium cursor-pointer transition-all duration-300 ${
          isScanning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 dark:bg-green-500 dark:hover:bg-green-600"
        }`}
      >
        {isScanning ? "Scanning..." : "Select Receipt Image"}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isScanning}
          className="hidden"
        />
      </label>
    </div>
  );
}
