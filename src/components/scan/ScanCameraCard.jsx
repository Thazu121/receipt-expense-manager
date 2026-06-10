import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  scanReceipt,
  clearError,
  setError,
} from "../../redux/features/scanSlice";

export default function CameraCard() {
  const dispatch = useDispatch();

  const { scanning, progress, error } = useSelector(
    (state) => state.scan
  );

  const isLight = useSelector((state) => state.theme.isLight);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();

    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 6000);

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  const getCameraErrorMessage = (err) => {
    if (err?.name === "NotAllowedError") {
      return "Camera permission denied. Please allow camera access in browser settings.";
    }

    if (err?.name === "NotFoundError") {
      return "No camera device found on this device.";
    }

    if (err?.name === "NotReadableError") {
      return "Camera is already being used by another app.";
    }

    if (err?.name === "OverconstrainedError") {
      return "Requested camera is not available.";
    }

    if (err?.name === "SecurityError") {
      return "Camera access blocked. Please use HTTPS or localhost.";
    }

    if (err?.name === "AbortError") {
      return "Camera access was interrupted.";
    }

    return "Unable to access camera. Please check permission.";
  };

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        dispatch(setError("Camera is not supported in this browser."));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      dispatch(setError(getCameraErrorMessage(err)));
    }
  };

  const stopCamera = () => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;
  };

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current || scanning) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!video.videoWidth || !video.videoHeight) {
        dispatch(setError("Camera is not ready yet."));
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        async (blob) => {
          try {
            if (!blob) {
              dispatch(setError("Failed to capture image."));
              return;
            }

            const file = new File(
              [blob],
              `receipt-${Date.now()}.png`,
              {
                type: "image/png",
              }
            );

            const result = await dispatch(
              scanReceipt({
                file,
                receiptId: null,
              })
            );

            if (scanReceipt.rejected.match(result)) {
              throw new Error(result.payload || "Scan failed");
            }
          } catch (err) {
            dispatch(setError(err?.message || "Scan failed"));
          }
        },
        "image/png",
        0.95
      );
    } catch (err) {
      dispatch(setError(err?.message || "Scan failed"));
    }
  };

  const isPermissionError =
    error?.toLowerCase().includes("permission denied") ||
    error?.toLowerCase().includes("allow camera");

  return (
    <div
      className={`
        w-full
        max-w-4xl
        mx-auto
        rounded-2xl
        overflow-hidden
        p-4
        sm:p-6
        transition-all
        ${
          isLight
            ? "bg-white border border-gray-200 shadow-md"
            : "bg-[#071b11] border border-green-500/20"
        }
      `}
    >
      {error && (
        <div
          className="
            mb-4
            p-4
            rounded-xl
            bg-red-500/10
            text-red-500
            text-center
            text-sm
          "
        >
          <p className="font-semibold">{error}</p>

          {isPermissionError && (
            <p className="mt-2 text-xs text-yellow-500">
              Click the lock icon near the address bar → Site settings →
              Camera → Allow, then refresh the page.
            </p>
          )}
        </div>
      )}

      <div
        className="
          relative
          rounded-2xl
          overflow-hidden
          border
          border-green-500/30
        "
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="
            w-full
            h-[250px]
            sm:h-[400px]
            md:h-[500px]
            object-cover
          "
        />

        <canvas ref={canvasRef} className="hidden" />

        {scanning && (
          <div
            className="
              absolute
              inset-0
              bg-black/70
              flex
              flex-col
              items-center
              justify-center
              gap-4
              text-white
              px-6
            "
          >
            <div
              className="
                w-12
                h-12
                border-4
                border-green-500
                border-t-transparent
                rounded-full
                animate-spin
              "
            />

            <p className="font-medium">Scanning Receipt...</p>

            <div
              className="
                w-full
                max-w-xs
                bg-gray-700
                h-2
                rounded-full
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  bg-green-500
                  transition-all
                  duration-300
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <span className="text-sm">{progress}%</span>
          </div>
        )}

        <div
          className="
            absolute
            bottom-4
            left-0
            right-0
            flex
            justify-center
            px-4
          "
        >
          <button
            onClick={captureAndScan}
            disabled={scanning || Boolean(error)}
            className="
              w-full
              sm:w-auto
              px-8
              py-3
              rounded-xl
              bg-green-500
              hover:bg-green-400
              text-black
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {scanning ? "Scanning..." : "📷 Scan Receipt"}
          </button>
        </div>
      </div>

      {isPermissionError && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              dispatch(clearError());
              startCamera();
            }}
            className="
              px-5
              py-2
              rounded-lg
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-semibold
            "
          >
            Try Camera Again
          </button>
        </div>
      )}

      <div
        className="
          mt-5
          flex
          flex-wrap
          justify-center
          gap-3
          sm:gap-6
          text-xs
          sm:text-sm
          text-green-500
        "
      >
        <span>✔ OCR READY</span>
        <span>✔ AUTO FOCUS</span>
        <span>✔ AI EXTRACTION</span>
      </div>
    </div>
  );
}