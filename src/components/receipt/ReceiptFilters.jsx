import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  setDateFilter,
  setCategory,
} from "../../redux/features/gallerySlice";

export default function ReceiptFilters() {
  const dispatch = useDispatch();

  const { search, dateFilter, category } = useSelector(
    (state) => state.gallery
  );

  const inputStyle = `
    w-full
    bg-slate-900
    border border-slate-700
    text-white
    placeholder-slate-400
    rounded-xl
    px-4 py-3
    focus:outline-none
    focus:ring-2
    focus:ring-emerald-500
    transition
  `;

  return (
    <div className="grid gap-4 md:grid-cols-4">

      {/* 🔍 Search */}
      <div className="relative md:col-span-2">
        <Search
          className="absolute left-3 top-3 text-emerald-500"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search by merchant..."
          className={`${inputStyle} pl-10`}
        />
      </div>

      {/* 📅 Date */}
      <select
        value={dateFilter}
        onChange={(e) => dispatch(setDateFilter(e.target.value))}
        className={inputStyle}
      >
        <option value="30">Last 30 Days</option>
        <option value="90">Last 3 Months</option>
        <option value="365">Last Year</option>
        <option value="all">All Time</option>
      </select>

      {/* 🏷 Category */}
      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className={inputStyle}
      >
        <option value="all">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Grocery">Grocery</option>
        <option value="General">General</option>
      </select>
    </div>
  );
}
