import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import ReceiptCard from "../receipt/ReceiptCard";
import ReceiptFilters from "../receipt/ReceiptFilters";
import ReceiptPagination from "../receipt/ReceiptPagination";
import { Plus } from "lucide-react";

export default function ReceiptGallery() {
  const receipts = useSelector((state) => state.receipt.receipts);

  // 🔹 Filter States
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [category, setCategory] = useState("all");

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const receiptsPerPage = 6;

  // ✅ Apply All Filters
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

    // 📅 Date filter
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

  // 🔥 Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, dateFilter]);

  // ✅ Pagination logic
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
      <ReceiptFilters
        search={search}
        setSearch={setSearch}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        category={category}
        setCategory={setCategory}
      />

      {/* Grid */}
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentReceipts.length === 0 ? (
          <p>No receipts found.</p>
        ) : (
          currentReceipts.map((item) => (
            <ReceiptCard
              key={item.id}
              receipt={item}
            />
          ))
        )}

        {/* Add Card */}
        <div className="border-2 border-dashed rounded-2xl flex items-center justify-center h-[350px]">
          <Plus />
        </div>
      </div>

      {/* Pagination */}
      <ReceiptPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
