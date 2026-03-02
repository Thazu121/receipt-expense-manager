import { useDispatch } from "react-redux";
import {
  setCurrentPage,
} from "../../redux/features/receiptSlice";

export default function Pagination({
  totalPages,
  currentPage,
}) {
  const dispatch = useDispatch();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() =>
            dispatch(setCurrentPage(index + 1))
          }
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? "bg-green-500 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
