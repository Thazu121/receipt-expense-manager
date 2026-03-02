import { useDispatch, useSelector } from "react-redux";
import { setMode, resetScan } from "../../redux/features/scanSlice";

export default function ScanTabs() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.scan.mode);

  const switchMode = (newMode) => {
    dispatch(resetScan());
    dispatch(setMode(newMode));
  };

  return (
    <div className="flex bg-black/40 rounded-xl p-1 w-fit border border-green-500/30">
      <button
        onClick={() => switchMode("camera")}
        className={`px-6 py-2 rounded-lg font-medium transition ${
          mode === "camera"
            ? "bg-green-500 text-black"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Live Camera
      </button>

      <button
        onClick={() => switchMode("upload")}
        className={`px-6 py-2 rounded-lg font-medium transition ${
          mode === "upload"
            ? "bg-green-500 text-black"
            : "text-gray-400 hover:text-white"
        }`}
      >
        File Upload
      </button>
    </div>
  );
}
