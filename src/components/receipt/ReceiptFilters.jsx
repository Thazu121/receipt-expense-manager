import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setStatusFilter,
  setSortBy,
} from "../../redux/features/receiptSlice";

export default function GalleryFilters() {
  const dispatch = useDispatch();

  const { search, statusFilter, sortBy } =
    useSelector((state) => state.receipt);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by merchant..."
        value={search}
        onChange={(e) =>
          dispatch(setSearch(e.target.value))
        }
        className="flex-1 p-3 rounded-lg border bg-gray-900 border-gray-700"
      />

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) =>
          dispatch(setStatusFilter(e.target.value))
        }
        className="p-3 rounded-lg border bg-gray-900 border-gray-700"
      >
        <option>All</option>
        <option>Pending</option>
        <option>Verified</option>
        <option>Rejected</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) =>
          dispatch(setSortBy(e.target.value))
        }
        className="p-3 rounded-lg border bg-gray-900 border-gray-700"
      >
        <option>Newest</option>
        <option>Oldest</option>
        <option>Amount High-Low</option>
        <option>Amount Low-High</option>
      </select>
    </div>
  );
}
