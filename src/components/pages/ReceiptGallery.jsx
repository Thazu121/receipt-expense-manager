import { useSelector } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { selectFilteredReceipts } from "../../redux/features/receiptSlice";
import PageGrid from "../receipt/ReceiptGrid";
import GalleryFilters from "../receipt/ReceiptFilters"

export default function GalleryPage() {
  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const allReceiptsRaw = useSelector(selectFilteredReceipts);

  const allReceipts = Array.isArray(allReceiptsRaw)
    ? allReceiptsRaw
    : [];

  const INITIAL_COUNT = 6;
  const LOAD_MORE_COUNT = 6;

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_COUNT);

  const [localError, setLocalError] =
    useState(null);

  const loaderRef = useRef(null);

 
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [allReceiptsRaw]);

  const merged = useMemo(() => {
    const scanned = allReceipts.filter(
      (r) => r?.source === "scan"
    );

    const manual = allReceipts.filter(
      (r) => r?.source !== "scan"
    );

    return [...scanned, ...manual];
  }, [allReceipts]);

  const visibleReceipts = merged.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < merged.length;


  useEffect(() => {
    if (!hasMore) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) =>
              prev + LOAD_MORE_COUNT
            );
          }
        },
        { threshold: 1 }
      );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

 
  const pageBg = isLight
    ? "bg-gray-50 text-gray-900"
    : "bg-black text-white";

  const emptyText = isLight
    ? "text-gray-500"
    : "text-gray-400";

  const errorStyle = isLight
    ? "bg-red-100 text-red-700"
    : "bg-red-500/20 text-red-400";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${pageBg}`}
    >
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
          Receipt Gallery
        </h1>

        <GalleryFilters />

        {localError && (
          <div
            className={`p-4 rounded-lg text-sm mb-6 ${errorStyle}`}
          >
            {localError}
          </div>
        )}

        {merged.length === 0 ? (
          <div
            className={`text-center mt-20 ${emptyText}`}
          >
            No receipts found.
          </div>
        ) : (
          <>
            <PageGrid receipts={visibleReceipts} />

            {hasMore && (
              <div
                ref={loaderRef}
                className="h-20 flex items-center justify-center"
              >
                <div className="animate-pulse opacity-60">
                  Loading more...
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
