import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tesseract from "tesseract.js";
import {
  startScanning,
  setExtractedData,
  setScanError,
} from "../../redux/features/scanSlice";

export default function CameraCard() {
  const dispatch = useDispatch();
  const { scanning, error } = useSelector((state) => state.scan);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      dispatch(setScanError("Camera permission denied or unavailable."));
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const captureAndScan = async () => {
    if (!videoRef.current) {
      dispatch(setScanError("Camera not ready."));
      return;
    }

    try {
      dispatch(startScanning());

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/png");

      const result = await Tesseract.recognize(imageData, "eng");

      const text = result.data.text;

      // Basic parsing logic
      const lines = text.split("\n").filter(Boolean);

      const merchant = lines[0] || "Unknown Merchant";

      const amountMatch = text.match(/(\d+\.\d{2})/);
      const amount = amountMatch ? amountMatch[0] : "";

      const dateMatch = text.match(
        /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/
      );
      const date = dateMatch ? dateMatch[0] : "";

      dispatch(
        setExtractedData({
          merchant,
          date,
          amount,
          confidence: result.data.confidence / 100,
        })
      );
    } catch (err) {
      dispatch(setScanError("Scanning failed. Please try again."));
    }
  };

  return (
    <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6 relative">

      {error && (
        <div className="mb-4 bg-red-500/20 text-red-400 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative rounded-xl overflow-hidden border border-green-500/40 h-96">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <canvas ref={canvasRef} className="hidden" />

        {scanning && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-green-400">
            Scanning...
          </div>
        )}

        <button
          onClick={captureAndScan}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-black px-8 py-3 rounded-xl font-semibold"
        >
          SCAN RECEIPT
        </button>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-green-400 text-sm">
        <span>✔ AUTO-FOCUS</span>
        <span>✔ OCR READY</span>
        <span>✔ EDGE DETECTION</span>
      </div>
    </div>
  );
}
