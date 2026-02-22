import NavBar from "../layout/Navbar"
import UploadBox from "../receipt/UploadBox"
import OCRProgress from "../receipt/OCRProgress"
import RecentUploads from "../receipt/RecentUploads"
import ScanPreview from "../receipt/ScanPreview"
import ExpenseDetails from "../receipt/ExpenseDetail"

export default function ReceiptScanner() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        <div className="col-span-7 space-y-6">
          <UploadBox />
          <OCRProgress />
          <RecentUploads />
        </div>

        <div className="col-span-5 space-y-6">
          <ScanPreview />
          <ExpenseDetails />
        </div>
      </main>
    </div>
  )
}
