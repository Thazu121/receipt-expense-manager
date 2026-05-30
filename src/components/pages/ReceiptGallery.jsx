import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";

import {
  fetchReceipts,
} from "../../redux/features/receiptSlice";

import PageGrid from "../receipt/ReceiptGrid";
import GalleryFilters from "../receipt/ReceiptFilters";

export default function GalleryPage() {
  const dispatch =
    useDispatch();

  const isLight =
    useSelector(
      (state) =>
        state.theme.isLight
    );

  const {
    receipts,
    loading,
    error,
  } = useSelector(
    (state) =>
      state.receipt
  );

  const INITIAL_COUNT = 6;
  const LOAD_MORE_COUNT = 6;

  const [visibleCount, setVisibleCount] =
    useState(
      INITIAL_COUNT
    );

  const loaderRef =
    useRef(null);

  useEffect(() => {
    dispatch(
      fetchReceipts()
    );
  }, [dispatch]);

  useEffect(() => {
    setVisibleCount(
      INITIAL_COUNT
    );
  }, [receipts]);

  const merged =
    useMemo(() => {
      if (
        !Array.isArray(
          receipts
        )
      )
        return [];

      const scanned =
        receipts.filter(
          (r) =>
            r.source ===
            "scan"
        );

      const manual =
        receipts.filter(
          (r) =>
            r.source !==
            "scan"
        );

      return [
        ...scanned,
        ...manual,
      ];
    }, [receipts]);

  const visibleReceipts =
    merged.slice(
      0,
      visibleCount
    );

  const hasMore =
    visibleCount <
    merged.length;

  useEffect(() => {
    if (!hasMore)
      return;

    const observer =
      new IntersectionObserver(
        (
          entries
        ) => {
          if (
            entries[0]
              .isIntersecting
          ) {
            setVisibleCount(
              (
                prev
              ) =>
                prev +
                LOAD_MORE_COUNT
            );
          }
        },
        {
          threshold: 1,
        }
      );

    if (
      loaderRef.current
    ) {
      observer.observe(
        loaderRef.current
      );
    }

    return () =>
      observer.disconnect();
  }, [hasMore]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isLight
          ? "bg-gray-50 text-gray-900"
          : "bg-black text-white"
      }`}
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-6
        "
      >
        <div className="mb-8">
          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
            "
          >
            Receipt Gallery
          </h1>

          <p
            className={`mt-2 ${
              isLight
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            View all scanned
            and uploaded
            receipts
          </p>
        </div>

        <GalleryFilters />

        {loading && (
          <div
            className="
              flex
              justify-center
              items-center
              py-16
            "
          >
            <div
              className="
                h-10
                w-10
                border-4
                border-green-500
                border-t-transparent
                rounded-full
                animate-spin
              "
            />
          </div>
        )}

        {error && (
          <div
            className="
              mt-6
              p-4
              rounded-xl
              bg-red-500/10
              border
              border-red-500/30
              text-red-500
            "
          >
            {error}
          </div>
        )}

        {!loading &&
          merged.length ===
            0 && (
            <div
              className={`
                text-center
                py-20
                ${
                  isLight
                    ? "text-gray-500"
                    : "text-gray-400"
                }
              `}
            >
              <h2
                className="
                  text-xl
                  font-semibold
                "
              >
                No Receipts
                Found
              </h2>

              <p className="mt-2">
                Upload or
                scan a
                receipt to
                get started.
              </p>
            </div>
          )}

        {!loading &&
          merged.length >
            0 && (
            <>
              <PageGrid
                receipts={
                  visibleReceipts
                }
              />

              {hasMore && (
                <div
                  ref={
                    loaderRef
                  }
                  className="
                    h-20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className={`
                      animate-pulse
                      ${
                        isLight
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                    `}
                  >
                    Loading
                    more...
                  </div>
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
}