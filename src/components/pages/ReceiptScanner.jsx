import { useDispatch, useSelector } from "react-redux";
import { resetScan } from "../../redux/features/scanSlice";
import ExtractedDetailsCard from "../scan/ExtractedDetailsCard";
import ScanTabs from "../scan/ScanTab";
import ScanCameraCard from "../scan/ScanCameraCard";
import ScanHeader from "../scan/ScanHeader"
import FileUploadCard from "../scan/FileUploadCard";
import { useEffect } from "react";

export default function ScanPage() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.scan);
  const isLight = useSelector((state) => state.theme.isLight);

  useEffect(() => {
    return () => {
      dispatch(resetScan());
    };
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-all duration-300
        ${isLight
          ? "bg-gray-100 text-black"
          : "bg-gradient-to-br from-[#071b11] via-[#0b2a1b] to-[#071b11] text-white"
        }`}
    >
      <div className="text-center m-5">
        <ScanHeader />

      </div>
      <div className="flex justify-center md:justify-start">
        <ScanTabs />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div>
          {mode === "camera" ? (
            <ScanCameraCard />
          ) : (
            <FileUploadCard />
          )}
        </div>

        <div>
          <ExtractedDetailsCard />
        </div>
      </div>
    </div>
  );
}
