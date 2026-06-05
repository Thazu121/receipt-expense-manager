import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setStatusFilter,
  setSortBy,
  setCategoryFilter,
  clearError,
} from "../../redux/features/receiptSlice";

export default function GalleryFilters() {
  const dispatch = useDispatch();

  const {
    search,
    statusFilter,
    sortBy,
    categoryFilter,
    error,
  } = useSelector((state) => state.receipt);

  const isLight = useSelector((state) => state.theme.isLight);

  const baseStyle =
    `w-full md:w-auto p-3 rounded-lg border transition outline-none ` +
    (isLight
      ? "bg-white border-gray-300 text-gray-800"
      : "bg-zinc-900 border-zinc-700 text-white");

  return (
    <div className="space-y-4 mb-6">

      {error && (
        <div className={`flex justify-between items-center p-3 rounded-lg text-sm ${
          isLight
            ? "bg-red-100 text-red-700"
            : "bg-red-500/20 text-red-400"
        }`}>
          <span>{error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        <input
          type="text"
          placeholder="Search merchant..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className={baseStyle}
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            dispatch(setCategoryFilter(e.target.value))
          }
          className={baseStyle}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Health"> Health</option>
                <option value="Education"> Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel"> Travel</option>
                <option value="Salary">Salary</option>
                <option value="General"> General</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value))
          }
          className={baseStyle}
        >
          <option value="All">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className={baseStyle}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Amount High-Low">Amount High-Low</option>
          <option value="Amount Low-High">Amount Low-High</option>
        </select>

      </div>
    </div>
  );
}