import TopNavbar from "../layout/Navbar";
import LiveCapture from "../scan/LiveCapture";
import ExtractedDetails from "../scan/ExtractedDetails";
import SideNavbar from "../layout/SideNavbar";

export default function ScanReceipt() {
  return (
    <div className="bg-[#0b1f14] text-white">
      <TopNavbar />
            <SideNavbar />


      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <LiveCapture />
          <ExtractedDetails />
        </div>
      </main>
    </div>
  );
}
