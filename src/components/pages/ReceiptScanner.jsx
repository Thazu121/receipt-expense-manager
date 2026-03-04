import { useDispatch, useSelector } from "react-redux";
import { resetScan } from "../../redux/features/scanSlice";
import ExtractedDetailsCard from "../scan/ExtractedDetailsCard";
import ScanTabs from "../scan/ScanTab";
import ScanCameraCard from "../scan/ScanCameraCard";
import ScanHeader from "../scan/ScanHeader";
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
      className={`
        min-h-screen
        w-full
        transition-all duration-300
        px-4 sm:px-6 lg:px-8
        py-6 sm:py-8
        ${
          isLight
            ? "bg-gray-100 text-black"
            : "bg-gradient-to-br from-[#071b11] via-[#0b2a1b] to-[#071b11] text-white"
        }
      `}
    >
      {/* Centered Content Wrapper */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <ScanHeader />
        </div>

        {/* Tabs */}
        <div className="flex justify-center md:justify-start mb-6">
          <ScanTabs />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Section */}
          <div className="w-full">
            {mode === "camera" ? (
              <ScanCameraCard />
            ) : (
              <FileUploadCard />
            )}
          </div>

          {/* Right Section */}
          <div className="w-full">
            <ExtractedDetailsCard />
          </div>

        </div>
      </div>
    </div>
  );
}
