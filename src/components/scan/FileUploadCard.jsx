import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { scanReceipt, resetScan } from "../../redux/features/scanSlice";

export default function FileUploadCard() {
  const dispatch = useDispatch();

  const { scanning, progress, error } =
    useSelector((state) => state.scan);

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const [preview, setPreview] = useState(null);


  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader()

    reader.onloadend = () => {
      const base64Image = reader.result
      setPreview(base64Image)

      dispatch(scanReceipt(base64Image))
    };

    reader.readAsDataURL(file)
  };



  return (
    <div
      className={`w-full max-w-3xl mx-auto rounded-2xl p-4 sm:p-6 relative transition-all
      ${
        isLight
          ? "bg-white border border-gray-200 shadow-md"
          : "bg-black/40 border border-green-500/20 shadow-lg"
      }`}
    >
      {scanning && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl text-white z-50">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-sm">
            Scanning... {progress}%
          </p>
        </div>
      )}

      {!preview && (
        <label
          className={`flex flex-col items-center justify-center 
          h-48 sm:h-56 md:h-64 
          border-2 border-dashed rounded-xl cursor-pointer 
          transition hover:opacity-80
          ${
            isLight
              ? "border-gray-300 text-gray-500"
              : "border-green-500/30 text-green-400"
          }`}
        >
          <span className="text-sm sm:text-base text-center px-4">
            Click to Upload Receipt
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}

      {preview && (
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="preview"
            className="w-full max-h-64 sm:max-h-72 md:max-h-80 object-contain rounded-xl"
          />

          <button
            onClick={() => {
              setPreview(null);
              dispatch(resetScan());
            }}
            className={`mt-4 px-4 py-2 rounded-lg text-sm transition
            ${
              isLight
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-green-500/20 hover:bg-green-500/30 text-green-400"
            }`}
          >
            Upload Another
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
