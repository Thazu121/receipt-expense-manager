import { useDispatch, useSelector } from "react-redux";
import { setMode, resetScan } from "../../redux/features/scanSlice";

export default function ScanTabs() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.scan);
  const isLight = useSelector((state) => state.theme.isLight);

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    dispatch(resetScan());
    dispatch(setMode(newMode));
  };

  return (
    <div
      className={`
        flex flex-wrap sm:flex-nowrap
        w-full sm:w-fit
        rounded-xl
        p-1
        transition-all duration-300
        ${
          isLight
            ? "bg-gray-200 border border-gray-300"
            : "bg-zinc-900 border border-zinc-700"
        }
      `}
    >
      <button
        onClick={() => switchMode("camera")}
        className={`
          flex-1 sm:flex-none
          px-4 sm:px-6
          py-2
          rounded-lg
          font-medium
          text-sm sm:text-base
          transition-all duration-300
          ${
            mode === "camera"
              ? isLight
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-500 text-black shadow-md"
              : isLight
              ? "text-gray-600 hover:text-black hover:bg-white/50"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }
        `}
      >
        Live Camera
      </button>

      <button
        onClick={() => switchMode("upload")}
        className={`
          flex-1 sm:flex-none
          px-4 sm:px-6
          py-2
          rounded-lg
          font-medium
          text-sm sm:text-base
          transition-all duration-300
          ${
            mode === "upload"
              ? isLight
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-500 text-black shadow-md"
              : isLight
              ? "text-gray-600 hover:text-black hover:bg-white/50"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          }
        `}
      >
        File Upload
      </button>
    </div>
  );
}
