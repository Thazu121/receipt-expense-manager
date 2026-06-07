import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  resetScan,
} from "../../redux/features/scanSlice";

export default function ScanTabs() {
  const dispatch = useDispatch();

  const { mode } = useSelector(
    (state) => state.scan
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const switchMode = (newMode) => {
    if (newMode === mode) return;

    dispatch(resetScan());
    dispatch(setMode(newMode));
  };

  return (
    <div
      className={`
        w-full
        sm:w-fit

        flex

        rounded-xl
        p-1

        transition-all

        ${
          isLight
            ? "bg-gray-200 border border-gray-300"
            : "bg-zinc-900 border border-zinc-700"
        }
      `}
    >
      <button
        onClick={() =>
          switchMode("camera")
        }
        className={`
          flex-1

          py-3
          px-3
          sm:px-6

          rounded-lg

          text-sm
          sm:text-base

          font-medium

          transition-all

          ${
            mode === "camera"
              ? isLight
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-500 text-black shadow-md"
              : isLight
              ? "text-gray-600 hover:bg-white/60"
              : "text-gray-400 hover:bg-white/10 hover:text-white"
          }
        `}
      >
      </button>

      <button
        onClick={() =>
          switchMode("upload")
        }
        className={`
          flex-1

          py-3
          px-3
          sm:px-6

          rounded-lg

          text-sm
          sm:text-base

          font-medium

          transition-all

          ${
            mode === "upload"
              ? isLight
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-500 text-black shadow-md"
              : isLight
              ? "text-gray-600 hover:bg-white/60"
              : "text-gray-400 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        📁 File Upload
      </button>
    </div>
  );
}