// ScanPage.js
import { useDispatch, useSelector } from "react-redux";
import { resetScan } from "../../redux/features/scanSlice";
import ExtractedDetailsCard from "../scan/ExtractedDetailsCard";
import ScanTabs from "../scan/ScanTab";
import ScanCameraCard from "../scan/ScanCameraCard";
import FileUploadCard from "../scan/FileUploadCard";
import { useEffect } from "react";

export default function ScanPage() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.scan);
  const { receipts } = useSelector((state) => state.receipt);

  // Reset the scan when the page is loaded or a scan is completed
  useEffect(() => {
    return () => {
      dispatch(resetScan());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071b11] via-[#0b2a1b] to-[#071b11] text-white p-4 md:p-6">
      <ScanTabs />

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Left Side */}
        {mode === "camera" ? (
          <ScanCameraCard />
        ) : (
          <FileUploadCard />
        )}

        {/* Right Side */}
        <ExtractedDetailsCard />
      </div>
    </div>
  );
}
