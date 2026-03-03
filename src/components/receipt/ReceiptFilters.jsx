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

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const baseStyle = `p-3 rounded-lg border transition ${
    isLight
      ? "bg-white border-gray-300 text-gray-800"
      : "bg-gray-900 border-gray-700 text-white"
  }`;

  return (
    <div className="space-y-4 mb-6">
      {error && (
        <div
          className={`p-3 rounded-lg flex justify-between text-sm ${
            isLight
              ? "bg-red-100 text-red-700"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          <span>{error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search merchant..."
          value={search}
          onChange={(e) =>
            dispatch(setSearch(e.target.value))
          }
          className={`flex-1 ${baseStyle}`}
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
          <option value="Grocery">Grocery</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">General</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value))
          }
          className={baseStyle}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value))
          }
          className={baseStyle}
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Amount High-Low</option>
          <option>Amount Low-High</option>
        </select>
      </div>
    </div>
  );
}
