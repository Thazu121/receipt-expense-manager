import { useDispatch, useSelector } from "react-redux";
import { startScanning, setExtractedData, setScanError } from "../../redux/features/scanSlice";
import Tesseract from "tesseract.js";
import { useState, useEffect } from "react";

export default function FileUploadCard() {
  const dispatch = useDispatch();
  const { scanning, error } = useSelector((state) => state.scan);

  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);  // To hold Base64 string

  /* ===============================
     CLEANUP OBJECT URL
  ================================ */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ===============================
     FILE UPLOAD HANDLER
  ================================ */
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    // 🚨 No file
    if (!file) return;

    // 🚨 Not image
    if (!file.type.startsWith("image/")) {
      dispatch(setScanError("Only image files are allowed."));
      return;
    }

    // 🚨 File too large (5MB)
    if (file.size > 5 * 1024 * 1024) {
      dispatch(setScanError("Image too large. Max 5MB allowed."));
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setBase64Image(reader.result);  // Save the base64 string
      };
      reader.readAsDataURL(file);  // Convert image to base64 string

      dispatch(startScanning());

      const result = await Tesseract.recognize(file, "eng");

      const text = result?.data?.text;

      // 🚨 Empty OCR
      if (!text || text.trim().length < 10) {
        dispatch(
          setScanError(
            "Receipt not readable. Please upload a clearer image."
          )
        );
        return;
      }

      /* ===============================
         SMART EXTRACTION
      ================================ */

      const merchant = text.split("\n")[0] || "";

      // Extract highest amount
      const amounts = text.match(/(\d+\.\d{2})/g);
      const amount =
        amounts && amounts.length > 0
          ? Math.max(...amounts.map(Number)).toFixed(2)
          : "";

      // Date detection (multiple formats)
      const dateMatch = text.match(
        /\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/
      );
      const date = dateMatch ? dateMatch[0] : "";

      const confidence = result.data.confidence || 0;

      // 🚨 Low confidence warning
      if (confidence < 40) {
        dispatch(
          setScanError(
            "Low scan confidence. Results may not be accurate."
          )
        );
      }

      dispatch(
        setExtractedData({
          merchant,
          date,
          amount,
          confidence,
        })
      );
    } catch (err) {
      console.error(err);
      dispatch(
        setScanError(
          "Scanning failed. Please try again."
        )
      );
    }
  };

  return (
    <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6 relative">

      {/* Loading Overlay */}
      {scanning && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl z-50">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Upload Area */}
      {!preview ? (
        <label className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-green-500/40 rounded-xl cursor-pointer hover:bg-green-500/10 transition">
          <span className="text-gray-400">
            Click to Upload Receipt
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      ) : (
        <img
          src={preview}
          alt="preview"
          className="rounded-xl w-full object-contain max-h-96"
        />
      )}

      {/* Error UI */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
