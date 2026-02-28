import { useSelector } from "react-redux";
import { useMemo } from "react";
import ReceiptCard from "../receipt/ReceiptCard";
import ReceiptFilters from "../receipt/ReceiptFilters";
import ReceiptPagination from "../receipt/ReceiptPagination";
import { Plus } from "lucide-react";

export default function ReceiptGallery() {
  const receipts = useSelector((state) => state.receipt.receipts);

  const {
    search,
    dateFilter,
    category,
    currentPage,
    receiptsPerPage,
  } = useSelector((state) => state.gallery);

  /* ===============================
     FILTER LOGIC
  ================================ */
  const filteredReceipts = useMemo(() => {
    let data = [...receipts];

    // 🔍 Search
    if (search.trim() !== "") {
      data = data.filter((r) =>
        r.store?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 Category
    if (category !== "all") {
      data = data.filter((r) => r.category === category);
    }

    // 📅 Date
    if (dateFilter !== "all") {
      const days = parseInt(dateFilter);
      const now = new Date();

      data = data.filter((r) => {
        if (!r.date) return false;

        const receiptDate = new Date(r.date);
        const diff =
          (now - receiptDate) / (1000 * 60 * 60 * 24);

        return diff <= days;
      });
    }

    return data;
  }, [receipts, search, category, dateFilter]);

  /* ===============================
     PAGINATION
  ================================ */
  const indexOfLast = currentPage * receiptsPerPage;
  const indexOfFirst = indexOfLast - receiptsPerPage;

  const currentReceipts = filteredReceipts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredReceipts.length / receiptsPerPage
  );

  return (
    <div className="p-6 md:p-10 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Receipt Gallery
          </h1>
          <p className="text-sm mt-2">
            {filteredReceipts.length} receipts found
          </p>
        </div>
      </div>

      {/* Filters */}
      <ReceiptFilters />

      {/* Grid */}
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentReceipts.length === 0 ? (
          <p>No receipts found.</p>
        ) : (
          currentReceipts.map((item) => (
            <ReceiptCard key={item.id} receipt={item} />
          ))
        )}

        {/* ✅ Add card only if page not full */}
        {currentReceipts.length < receiptsPerPage && (
          <div className="border-2 border-dashed rounded-2xl flex items-center justify-center h-[350px] cursor-pointer hover:bg-green-900/30 transition">
            <Plus />
          </div>
        )}
      </div>

      {/* Pagination */}
      <ReceiptPagination totalPages={totalPages} />
    </div>
  );
}
