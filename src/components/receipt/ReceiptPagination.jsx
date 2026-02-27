export default function ReceiptPagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 🔥 Show only 5 page numbers around current page
  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-10">

      {/* Previous */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg transition
          ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""}
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        `}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`
            px-4 py-2 rounded-lg font-medium transition
            
            ${
              currentPage === page
                ? "bg-emerald-500 text-white dark:bg-green-500 dark:text-black"
                : `
                  bg-white/80 backdrop-blur-md
                  border border-emerald-200
                  text-gray-700
                  hover:bg-emerald-100
                  
                  dark:bg-green-900 
                  dark:border-green-800
                  dark:text-green-300
                  dark:hover:bg-green-800
                `
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-lg transition
          ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""}
          
          bg-white/80 backdrop-blur-md
          border border-emerald-200
          text-gray-700
          hover:bg-emerald-100
          
          dark:bg-green-900 
          dark:border-green-800
          dark:text-green-300
          dark:hover:bg-green-800
        `}
      >
        {">"}
      </button>

    </div>
  );
}
