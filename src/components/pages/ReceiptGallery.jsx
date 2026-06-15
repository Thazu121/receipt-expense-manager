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

const getReceiptKey = (receipt = {}) => {
  return (
    receipt.fileHash ||
    receipt.cloudinaryId ||
    receipt.image ||
    receipt.imageUrl ||
    receipt._id ||
    `${receipt.store}-${receipt.amount}-${receipt.date}`
  );
};

const removeDuplicateReceipts = (receipts = []) => {
  const map = new Map();

  receipts.forEach((receipt) => {
    if (!receipt) return;

    const key = getReceiptKey(receipt);

    if (!map.has(key)) {
      map.set(key, receipt);
    }
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

  const [visibleCount, setVisibleCount] =
    useState(8);

  const loaderRef = useRef(null);

  const INITIAL_COUNT = 8;
  const LOAD_MORE_COUNT = 8;

  useEffect(() => {
    dispatch(fetchReceipts());
  }, [dispatch]);

  const uniqueReceipts = useMemo(() => {
    return removeDuplicateReceipts(receipts);
  }, [receipts]);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [uniqueReceipts.length]);

  const visibleReceipts = useMemo(() => {
    return uniqueReceipts.slice(0, visibleCount);
  }, [uniqueReceipts, visibleCount]);

  const hasMore =
    visibleCount < uniqueReceipts.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) =>
              Math.min(
                prev + LOAD_MORE_COUNT,
                uniqueReceipts.length
              )
            );
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0.1,
        }
      );

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
      className={`
        min-h-screen
        w-full
        overflow-x-hidden
        transition-colors
        duration-300
        ${
          isLight
            ? "bg-gray-50 text-gray-900"
            : "bg-black text-white"
        }
      `}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-3
          sm:px-5
          lg:px-8
          py-4
          sm:py-6
          lg:py-8
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-3
            mb-5
            sm:mb-6
          "
        >
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Receipt Gallery
            </h1>

            <p className="opacity-60 mt-1 text-sm sm:text-base">
              Scanned Receipts
            </p>
          </div>

          <div
            className={`
              w-fit
              rounded-full
              px-3
              py-1.5
              text-xs
              sm:text-sm
              font-medium
              ${
                isLight
                  ? "bg-white border border-gray-200 text-gray-600"
                  : "bg-white/5 border border-white/10 text-gray-300"
              }
            `}
          >
            {uniqueReceipts.length} receipts
          </div>
        </div>

        <div className="mb-5 sm:mb-6">
          <GalleryFilters />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`
                    h-72
                    rounded-2xl
                    animate-pulse
                    ${
                      isLight
                        ? "bg-white border border-gray-200"
                        : "bg-zinc-900 border border-zinc-800"
                    }
                  `}
                />
              )
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {!loading &&
          uniqueReceipts.length === 0 && (
            <div
              className={`
                min-h-[280px]
                rounded-2xl
                flex
                items-center
                justify-center
                text-center
                p-6
                ${
                  isLight
                    ? "bg-white border border-gray-200 text-gray-500"
                    : "bg-zinc-900 border border-zinc-800 text-gray-400"
                }
              `}
            >
              No receipts found
            </div>
          )}

        {!loading &&
          uniqueReceipts.length > 0 && (
            <>
              <PageGrid
                receipts={visibleReceipts}
                onSelectReceipt={
                  setSelectedReceipt
                }
              />

              {hasMore && (
                <div
                  ref={loaderRef}
                  className="py-8 sm:py-10 text-center text-sm opacity-60"
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
          onClose={() =>
            setSelectedReceipt(null)
          }
        />
      )}
    </div>
  );
}