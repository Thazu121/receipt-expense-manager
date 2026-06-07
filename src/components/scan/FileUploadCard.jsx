import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import API from "../../api/api";

import {
  scanReceipt,
  resetScan,
  setReceiptId,
} from "../../redux/features/scanSlice";

export default function FileUploadCard() {
  const dispatch = useDispatch();

  const { scanning, error } = useSelector(
    (state) => state.scan
  );

  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

 const handleUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploadError(null);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();

    formData.append("receipt", file);

    const uploadRes = await API.post(
      "/receipts/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    const receiptId =
      uploadRes.data.receipt._id;

    dispatch(setReceiptId(receiptId));

    dispatch(
      scanReceipt({
        file,
        receiptId,
      })
    );
  } catch (err) {
    console.log(err);

    setUploadError(
      err?.response?.data?.message ||
        "Upload failed"
    );
  }
};

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setUploadError(null);

    dispatch(resetScan());
  };

  return (
    <div className="w-full bg-white rounded-2xl border shadow-sm p-4 sm:p-6">

      {/* Upload Box */}
      {!preview && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl min-h-[240px] p-6 text-center cursor-pointer hover:border-emerald-500 transition">

          <div>
            <div className="text-5xl mb-3">📄</div>

            <h3 className="text-lg sm:text-xl font-semibold">
              Upload Receipt
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              JPG, PNG, WEBP
            </p>

            <p className="text-gray-400 text-xs mt-1">
              Maximum file size: 5MB
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}

      {preview && (
        <div className="space-y-4">

          <div className="w-full bg-gray-100 border rounded-2xl overflow-hidden">
            <img
              src={preview}
              alt="Receipt Preview"
              className="w-full max-h-[500px] object-contain block mx-auto"
            />
          </div>

          <button
            onClick={handleRemove}
            type="button"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Remove Receipt
          </button>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 border border-red-200">
          {uploadError}
        </div>
      )}

      {scanning && (
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-emerald-50">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />

          <span className="font-medium text-black">
            Scanning Receipt...
          </span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}