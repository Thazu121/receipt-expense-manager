import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import {
  deleteReceipt,
  toggleStatus,
} from "../../redux/features/receiptSlice"
import { Trash2, X, Download } from "lucide-react"

export default function ReceiptCard({ receipt }) {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight)

  const [previewOpen, setPreviewOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setPreviewOpen(false)
        setZoom(1)
      }
    };
    window.addEventListener("keydown", handleEsc)
    return () =>
      window.removeEventListener("keydown", handleEsc)
  }, [])

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Delete this receipt?")) {
      dispatch(deleteReceipt(receipt.id));
    }
  }

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    dispatch(toggleStatus(receipt.id))
  };

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = receipt.image
    link.download = "receipt.jpg"
    link.click()
  }

  const handleZoom = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) =>
      Math.min(Math.max(prev + delta, 0.5), 3)
    )
  }

  const getStatusStyle = () => {
    switch (receipt.status) {
      case "Verified":
        return "bg-green-500/20 text-green-500"
      case "Rejected":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  const getCategoryStyle = () => {
    switch (receipt.category) {
      case "Grocery":
        return "bg-emerald-500/20 text-emerald-500";
      case "Food":
        return "bg-orange-500/20 text-orange-500";
      case "Shopping":
        return "bg-pink-500/20 text-pink-500";
      case "Travel":
        return "bg-blue-500/20 text-blue-500";
      case "Medical":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  }

  return (
    <>
      <div
        className={`rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]
        ${
          isLight
            ? "bg-white border border-gray-200 shadow-md"
            : "bg-zinc-900 border border-zinc-700 shadow-lg"
        }`}
      >
        {receipt.image && (
          <img
            src={receipt.image}
            alt="receipt"
            onClick={() => setPreviewOpen(true)}
            className="w-full h-36 sm:h-40 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-80 transition"
          />
        )}

        <h3
          className={`font-semibold text-base sm:text-lg truncate ${
            isLight ? "text-gray-800" : "text-white"
          }`}
        >
          {receipt.store || "Unknown Store"}
        </h3>

        <p
          className={`text-xs sm:text-sm ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {receipt.date || "No date"}
        </p>

        <p className="text-green-500 font-bold text-lg sm:text-xl mt-2">
          ₹{Number(receipt.amount || 0).toFixed(2)}
        </p>

        <div className="mt-3">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryStyle()}`}
          >
            {receipt.category || "Other"}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span
            onClick={handleToggleStatus}
            className={`text-xs px-3 py-1 rounded-full font-medium cursor-pointer transition hover:opacity-80 ${getStatusStyle()}`}
          >
            {receipt.status}
          </span>

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {previewOpen && (
        <div
          onClick={() => {
            setPreviewOpen(false)
            setZoom(1)
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={handleZoom}
            className="relative max-w-5xl w-full transform transition duration-300 scale-100"
          >
            <button
              onClick={() => {
                setPreviewOpen(false);
                setZoom(1);
              }}
              className="absolute -top-12 right-0 text-white hover:scale-110 transition"
            >
              <X size={28} />
            </button>

            <button
              onClick={handleDownload}
              className="absolute -top-12 right-12 text-white hover:scale-110 transition"
            >
              <Download size={24} />
            </button>

            <img
              src={receipt.image}
              alt="preview"
              style={{ transform: `scale(${zoom})` }}
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl transition"
            />
          </div>
        </div>
      )}
    </>
  )
}
