import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scanReceipt,
  clearError,
} from "../../redux/features/scanSlice";

export default function CameraCard() {
  const dispatch = useDispatch();

  const { scanning, error, progress } =
    useSelector((state) => state.scan);

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /* ==============================
     CAMERA START
  ============================== */
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  /* ==============================
     AUTO CLEAR ERROR
  ============================== */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
          },
        });

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

      streamRef.current = stream;
    } catch (err) {
      let message =
        "Unable to access camera.";

      if (err.name === "NotAllowedError") {
        message =
          "Camera permission denied.";
      } else if (
        err.name === "NotFoundError"
      ) {
        message =
          "No camera device found.";
      } else if (
        err.name === "NotReadableError"
      ) {
        message =
          "Camera already in use.";
      }

      dispatch({
        type: "scan/scanReceipt/rejected",
        payload: message,
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) =>
          track.stop()
        );
      streamRef.current = null;
    }
  };

  /* ==============================
     CAPTURE + SCAN
  ============================== */
  const captureAndScan = async () => {
    if (!videoRef.current || scanning)
      return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx =
        canvas.getContext("2d");

      if (!ctx)
        throw new Error(
          "Canvas not ready"
        );

      canvas.width =
        video.videoWidth;
      canvas.height =
        video.videoHeight;

      ctx.drawImage(video, 0, 0);

      const imageData =
        canvas.toDataURL("image/png");

      stopCamera();

      const result =
        await dispatch(
          scanReceipt(imageData)
        );

      if (
        scanReceipt.rejected.match(
          result
        )
      ) {
        throw new Error(
          result.payload
        );
      }

      startCamera();
    } catch (err) {
      dispatch({
        type: "scan/setError",
        payload:
          err.message ||
          "Scan failed",
      });

      startCamera();
    }
  };

  /* ==============================
     UI
  ============================== */

  return (
    <div
      className={`w-full max-w-3xl mx-auto rounded-2xl p-6 transition-all duration-300
      ${
        isLight
          ? "bg-white border border-gray-300 shadow-md text-gray-800"
          : "bg-[#071b11] border border-green-500/20 text-white"
      }`}
    >
      {error && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm text-center
          ${
            isLight
              ? "bg-red-100 text-red-600"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {error}
        </div>
      )}

      <div className="relative rounded-xl overflow-hidden border border-green-500/40">
        <div className="relative w-full aspect-video sm:h-96">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          <canvas
            ref={canvasRef}
            className="hidden"
          />

          {scanning && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 font-semibold
              ${
                isLight
                  ? "bg-white/70 text-green-600"
                  : "bg-black/60 text-green-400"
              }`}
            >
              🔍 Scanning...
              <div className="w-2/3 bg-gray-300 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
              <span className="text-xs">
                {progress}%
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 sm:w-auto">
          <button
            onClick={
              captureAndScan
            }
            disabled={scanning}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50
            ${
              isLight
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            {scanning
              ? "Processing..."
              : "SCAN RECEIPT"}
          </button>
        </div>
      </div>

      <div
        className={`flex justify-center gap-6 mt-4 text-sm
        ${
          isLight
            ? "text-green-600"
            : "text-green-400"
        }`}
      >
        <span>✔ AUTO-FOCUS</span>
        <span>✔ OCR READY</span>
        <span>✔ AI EXTRACTION</span>
      </div>
    </div>
  );
}
