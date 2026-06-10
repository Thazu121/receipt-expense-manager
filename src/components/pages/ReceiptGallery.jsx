import { useDispatch, useSelector } from "react-redux";
import {
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

import {
  fetchReceipts,
  selectFilteredReceipts,
} from "../../redux/features/receiptSlice";

import PageGrid from "../receipt/ReceiptGrid";
import GalleryFilters from "../receipt/ReceiptFilters";
import ReceiptPreviewModal from "../receipt/ReceiptPreviewModal";

const removeDuplicateReceipts = (receipts = []) => {
  const map = new Map();

  receipts.forEach((receipt) => {
    if (!receipt?._id) return;
    map.set(receipt._id, receipt);
  });

  return Array.from(map.values());
};

export default function GalleryPage() {
  const dispatch = useDispatch();

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const receipts = useSelector(selectFilteredReceipts);

  const { loading, error } = useSelector(
    (state) => state.receipt
  );

  const [selectedReceipt, setSelectedReceipt] =
    useState(null);

  const INITIAL_COUNT = 6;
  const LOAD_MORE_COUNT = 6;

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_COUNT);

  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchReceipts());
  }, [dispatch]);

  const uniqueReceipts = useMemo(() => {
    return removeDuplicateReceipts(receipts);
  }, [receipts]);

 useEffect(() => {
  setVisibleCount(INITIAL_COUNT);
}, [uniqueReceipts.length])


  const visibleReceipts = useMemo(() => {
    return uniqueReceipts.slice(0, visibleCount);
  }, [uniqueReceipts, visibleCount]);

  const hasMore =
    visibleCount < uniqueReceipts.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer =
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(
              prev + LOAD_MORE_COUNT,
              uniqueReceipts.length
            )
          );
        }
      });

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }

      observer.disconnect();
    };
  }, [hasMore, uniqueReceipts.length]);

  return (
    <div
      className={`min-h-screen ${
        isLight
          ? "bg-gray-50 text-gray-900"
          : "bg-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Receipt Gallery
          </h1>

          <p className="opacity-60 mt-1 text-sm sm:text-base">
            Scanned Receipts
          </p>
        </div>

        <GalleryFilters />

        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {!loading && uniqueReceipts.length === 0 && (
          <div className="text-center py-20 opacity-60">
            No receipts found
          </div>
        )}

        {!loading && uniqueReceipts.length > 0 && (
          <>
            <PageGrid
              receipts={visibleReceipts}
              onSelectReceipt={setSelectedReceipt}
            />

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

      {selectedReceipt && (
        <ReceiptPreviewModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}