import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { resetScan } from "../../redux/features/scanSlice";

import ScanHeader from "../scan/ScanHeader";
import ScanTabs from "../scan/ScanTab";
import ScanCameraCard from "../scan/ScanCameraCard";
import FileUploadCard from "../scan/FileUploadCard";
import ExtractedDetailsCard from "../scan/ExtractedDetailsCard";

export default function ScanPage() {
  const dispatch = useDispatch();

  const { mode } = useSelector(
    (state) => state.scan
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

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
        transition-all
        duration-300

        px-3
        sm:px-5
        lg:px-8

        py-5
        sm:py-8

        ${
          isLight
            ? "bg-gray-100 text-black"
            : "bg-gradient-to-br from-[#071b11] via-[#0b2a1b] to-[#071b11] text-white"
        }
      `}
    >
      <div
        className="
          max-w-7xl
          mx-auto
        "
      >
        <div
          className="
            text-center
            mb-6
            sm:mb-8
          "
        >
          <ScanHeader />
        </div>

        <div
          className="
            flex
            justify-center
            mb-6
            sm:mb-8
          "
        >
          <ScanTabs />
        </div>

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
            lg:gap-8
            items-start
          "
        >
          <div
            className="
              w-full
              order-1
            "
          >
            {mode === "camera" ? (
              <ScanCameraCard />
            ) : (
              <FileUploadCard />
            )}
          </div>

          <div
            className="
              w-full
              order-2
            "
          >
            <ExtractedDetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
}