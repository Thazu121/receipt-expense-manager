import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  fetchReceipts,
  selectFilteredReceipts,
} from "../../redux/features/receiptSlice";

import PageGrid from "../receipt/ReceiptGrid";
import GalleryFilters from "../receipt/ReceiptFilters";
import ReceiptPreviewModal from "../receipt/ReceiptPreviewModal";

export default function GalleryPage() {
  const dispatch = useDispatch();

  const isLight = useSelector((state) => state.theme.isLight);

  // ✅ FILTERED DATA
  const receipts = useSelector(selectFilteredReceipts);

  const loading = useSelector((state) => state.receipt.loading);
  const error = useSelector((state) => state.receipt.error);

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const INITIAL_COUNT = 6;
  const LOAD_MORE_COUNT = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const loaderRef = useRef(null);

  /* =========================
     FETCH RECEIPTS
  ========================= */
  useEffect(() => {
    dispatch(fetchReceipts());
  }, [dispatch]);

  /* =========================
     RESET PAGINATION ON DATA CHANGE
  ========================= */
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [receipts]);

  /* =========================
     PAGINATION DATA
  ========================= */
  const visibleReceipts = receipts.slice(0, visibleCount);
  const hasMore = visibleCount < receipts.length;

  /* =========================
     INFINITE SCROLL
  ========================= */
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div
      className={`min-h-screen ${
        isLight ? "bg-gray-50 text-gray-900" : "bg-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold">Receipt Gallery</h1>
        <p className="opacity-60 mt-1">
          Scanned & Manual Receipts
        </p>

        {/* FILTERS */}
        <GalleryFilters />

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && receipts.length === 0 && (
          <div className="text-center py-20 opacity-60">
            No receipts found
          </div>
        )}

        {/* GRID */}
        {!loading && receipts.length > 0 && (
          <>
            <PageGrid
              receipts={visibleReceipts}
              onSelectReceipt={setSelectedReceipt}   // ✅ FIXED FLOW
            />

            {/* LOAD MORE TRIGGER */}
            {hasMore && (
              <div
                ref={loaderRef}
                className="py-10 text-center opacity-60"
              >
                Loading more...
              </div>
            )}
          </>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {selectedReceipt && (
        <ReceiptPreviewModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}