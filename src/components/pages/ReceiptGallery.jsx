import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { selectFilteredReceipts } from "../../redux/features/receiptSlice";
import PageGrid from "../receipt/ReceiptGrid"

export default function GalleryPage() {
  const allReceipts = useSelector(selectFilteredReceipts)

  const INITIAL_COUNT = 6
  const LOAD_MORE_COUNT = 6

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_COUNT)

  const loaderRef = useRef(null)

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [allReceipts]);

  const scanned = allReceipts.filter(
    (r) => r.source === "scan"
  );

  const manual = allReceipts.filter(
    (r) => r.source !== "scan"
  );

  const merged = [...scanned, ...manual];

  const visibleReceipts = merged.slice(
    0,
    visibleCount
  );

  const hasMore = visibleCount < merged.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Receipt Gallery
      </h1>

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
    </div>
  );
}
