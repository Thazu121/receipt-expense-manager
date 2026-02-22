import TopNavbar from "../layout/TopNavbar";
import GalleryFilters from "../components/receipts/GalleryFilters";
import ReceiptCard from "../components/receipts/ReceiptCard";
import Pagination from "../components/receipts/Pagination";

export default function ReceiptGallery() {
  return (
    <div className="min-h-screen bg-[#0b1f14] text-white">
      <TopNavbar />

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Receipt Gallery</h1>
            <p className="text-sm text-slate-400">
              128 receipts found across all accounts
            </p>
          </div>

          <button className="bg-green-500 text-black font-semibold px-5 py-3 rounded-xl">
            Upload New Receipt
          </button>
        </div>

        {/* Filters */}
        <GalleryFilters />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReceiptCard
            title="Starbucks Coffee"
            amount="$14.50"
            date="Oct 24, 2023"
            category="Food & Drink"
          />
          <ReceiptCard
            title="Amazon.com"
            amount="$189.99"
            date="Oct 23, 2023"
            category="Technology"
          />
          <ReceiptCard
            title="Delta Airlines"
            amount="$452.00"
            date="Oct 21, 2023"
            category="Travel"
          />
          <ReceiptCard
            title="Whole Foods Market"
            amount="$78.25"
            date="Oct 20, 2023"
            category="Groceries"
          />
        </div>

        {/* Pagination */}
        <Pagination />
      </main>
    </div>
  );
}
