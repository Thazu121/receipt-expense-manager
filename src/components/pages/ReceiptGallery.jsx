import { useSelector } from "react-redux";
import { selectPaginatedReceipts } from "../../redux/features/receiptSlice";

import GalleryHeader from "../receipt/ReceiptHeader";
import GalleryFilters from "../receipt/ReceiptFilters";
import ReceiptGrid from "../receipt/ReceiptGrid";
import Pagination from "../receipt/ReceiptPagination";

export default function GalleryPage() {
  const { receipts, totalPages, currentPage } =
    useSelector(selectPaginatedReceipts);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <GalleryHeader />
      <GalleryFilters />
      <ReceiptGrid receipts={receipts} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
