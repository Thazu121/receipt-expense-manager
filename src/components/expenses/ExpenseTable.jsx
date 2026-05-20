import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteReceipt,
  updateReceipt,
  toggleStatus,
} from "../../redux/features/receiptSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ExpenseTable({ search = "" }) {
  const { receipts, error } = useSelector(
    (state) => state.receipt
  );

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);

  const [openStatus, setOpenStatus] =
    useState(false);

  const statusRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setEditing(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, []);

  const filteredReceipts = receipts
    .filter((r) =>
      r.store
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this transaction?"
      )
    ) {
      dispatch(deleteReceipt(id));
    }
  };

  const handleSave = () => {
    dispatch(
      updateReceipt({
        id: editing.id,
        updates: {
          store: editing.store,
          amount: Number(editing.amount),
          date: editing.date,
          category: editing.category,
          status: editing.status,
        },
      })
    );

    setEditing(null);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Verified":
        return `
          bg-emerald-100 
          text-emerald-600
          dark:bg-emerald-500/20
          dark:text-emerald-400
        `;

      case "Rejected":
        return `
          bg-red-100 
          text-red-600
          dark:bg-red-500/20
          dark:text-red-400
        `;

      default:
        return `
          bg-yellow-100 
          text-yellow-600
          dark:bg-yellow-500/20
          dark:text-yellow-400
        `;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        statusRef.current &&
        !statusRef.current.contains(
          e.target
        )
      ) {
        setOpenStatus(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <>
      <div
        className={`
          rounded-2xl overflow-hidden
          transition-all duration-300
          ${
            isLight
              ? `
                bg-white
                border border-gray-200
                shadow-sm
              `
              : `
                bg-white/5
                backdrop-blur-xl
                border border-white/10
              `
          }
        `}
      >
        {error && (
          <div className="p-4 text-sm bg-red-100 text-red-600">
            {error}
          </div>
        )}

        <div
          className="
            hidden lg:grid
            grid-cols-6
            gap-6
            px-6 py-4
            text-sm font-semibold
            border-b
            border-gray-200
            dark:border-white/10
            text-gray-600
            dark:text-gray-400
          "
        >
          <span>Merchant</span>
          <span>Date</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">
            Amount
          </span>
          <span className="text-center">
            Actions
          </span>
        </div>

        {filteredReceipts.length === 0 && (
          <div
            className="
              p-10 text-center
              text-gray-500
              dark:text-gray-400
            "
          >
            No expenses found
          </div>
        )}

        {filteredReceipts.map((r) => (
          <div
            key={r.id}
            className={`
              px-4 sm:px-6 py-5
              border-b
              transition-all duration-200
              ${
                isLight
                  ? `
                    border-gray-200
                    hover:bg-gray-50
                  `
                  : `
                    border-white/5
                    hover:bg-white/5
                  `
              }
            `}
          >
            <div
              className="
                hidden lg:grid
                grid-cols-6
                gap-6
                items-center
              "
            >
              <span
                className="
                  font-medium
                  truncate
                  text-gray-800
                  dark:text-white
                "
              >
                {r.store}
              </span>

              <span
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {r.date
                  ? new Date(
                      r.date
                    ).toLocaleDateString()
                  : "-"}
              </span>

              <span
                className="
                  px-3 py-1
                  text-xs
                  rounded-full
                  bg-indigo-100
                  text-indigo-600
                  dark:bg-indigo-500/20
                  dark:text-indigo-400
                  w-fit
                "
              >
                {r.category}
              </span>

              <span
                onClick={() =>
                  dispatch(
                    toggleStatus(r.id)
                  )
                }
                className={`
                  cursor-pointer
                  px-3 py-1
                  text-xs
                  rounded-full
                  w-fit
                  transition
                  ${statusStyle(
                    r.status
                  )}
                `}
              >
                {r.status || "Pending"}
              </span>

              <span
                className="
                  text-right
                  font-semibold
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                {formatCurrency(r.amount)}
              </span>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    setEditing(r)
                  }
                  className="
                    text-blue-500
                    hover:scale-110
                    transition
                  "
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    handleDelete(r.id)
                  }
                  className="
                    text-red-500
                    hover:scale-110
                    transition
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="lg:hidden">
              <div
                className={`
                  rounded-2xl p-4
                  ${
                    isLight
                      ? "bg-gray-50"
                      : "bg-white/5"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="
                        font-semibold
                        truncate
                        text-base
                        text-gray-800
                        dark:text-white
                      "
                    >
                      {r.store}
                    </h3>

                    <p
                      className="
                        text-sm mt-1
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {r.date
                        ? new Date(
                            r.date
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div
                    className="
                      font-bold
                      text-sm sm:text-base
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    {formatCurrency(
                      r.amount
                    )}
                  </div>
                </div>

                <div
                  className="
                    flex flex-wrap
                    items-center
                    gap-2
                    mt-4
                  "
                >
                  <span
                    className="
                      px-3 py-1
                      text-xs rounded-full
                      bg-indigo-100
                      text-indigo-600
                      dark:bg-indigo-500/20
                      dark:text-indigo-400
                    "
                  >
                    {r.category}
                  </span>

                  <span
                    onClick={() =>
                      dispatch(
                        toggleStatus(r.id)
                      )
                    }
                    className={`
                      cursor-pointer
                      px-3 py-1
                      text-xs rounded-full
                      transition
                      ${statusStyle(
                        r.status
                      )}
                    `}
                  >
                    {r.status || "Pending"}
                  </span>
                </div>

                <div
                  className="
                    flex items-center
                    gap-3
                    mt-5
                  "
                >
                  <button
                    onClick={() =>
                      setEditing(r)
                    }
                    className="
                      flex-1
                      py-2 rounded-xl
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      text-sm font-medium
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(r.id)
                    }
                    className="
                      flex-1
                      py-2 rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      text-sm font-medium
                      transition
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div
          onClick={() => setEditing(null)}
          className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            flex items-center justify-center
            z-50
            p-4
          "
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`
              w-full
              max-w-lg
              rounded-2xl
              p-5 sm:p-6
              shadow-2xl
              border
              ${
                isLight
                  ? `
                    bg-white
                    border-gray-200
                  `
                  : `
                    bg-[#0f2e24]
                    border-green-900
                  `
              }
            `}
          >
            <h3
              className="
                text-xl sm:text-2xl
                font-semibold
                mb-6
                text-gray-800
                dark:text-white
              "
            >
              Edit Transaction
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={editing.store ?? ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    store:
                      e.target.value,
                  })
                }
                className="
                  w-full p-3
                  rounded-xl border
                  bg-gray-50
                  dark:bg-white/10
                  dark:text-white
                "
                placeholder="Merchant"
              />

              <input
                type="number"
                value={
                  editing.amount ?? ""
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    amount:
                      e.target.value,
                  })
                }
                className="
                  w-full p-3
                  rounded-xl border
                  bg-gray-50
                  dark:bg-white/10
                  dark:text-white
                "
                placeholder="Amount"
              />

              <input
                type="date"
                value={
                  editing.date
                    ? new Date(
                        editing.date
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    date:
                      e.target.value,
                  })
                }
                className="
                  w-full p-3
                  rounded-xl border
                  bg-gray-50
                  dark:bg-white/10
                  dark:text-white
                "
              />

              <input
                type="text"
                value={
                  editing.category ?? ""
                }
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    category:
                      e.target.value,
                  })
                }
                className="
                  w-full p-3
                  rounded-xl border
                  bg-gray-50
                  dark:bg-white/10
                  dark:text-white
                "
                placeholder="Category"
              />

              <div
                className="relative"
                ref={statusRef}
              >
                <div
                  onClick={() =>
                    setOpenStatus(
                      !openStatus
                    )
                  }
                  className="
                    w-full p-3
                    rounded-xl border
                    bg-white
                    dark:bg-gray-800
                    text-gray-800
                    dark:text-white
                    border-gray-300
                    dark:border-gray-600
                    cursor-pointer
                    flex justify-between items-center
                  "
                >
                  {editing.status ||
                    "Pending"}

                  <span>▼</span>
                </div>

                {openStatus && (
                  <div
                    className="
                      absolute left-0 mt-2
                      w-full rounded-xl
                      overflow-hidden
                      bg-white
                      dark:bg-gray-800
                      border border-gray-300
                      dark:border-gray-600
                      shadow-xl
                      z-50
                    "
                  >
                    {[
                      "Pending",
                      "Verified",
                      "Rejected",
                    ].map((status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setEditing({
                            ...editing,
                            status,
                          });

                          setOpenStatus(
                            false
                          );
                        }}
                        className="
                          px-4 py-3
                          cursor-pointer
                          hover:bg-emerald-500
                          hover:text-white
                          transition
                        "
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="
                flex flex-col sm:flex-row
                justify-end
                gap-3
                mt-6
              "
            >
              <button
                onClick={() =>
                  setEditing(null)
                }
                className="
                  w-full sm:w-auto
                  px-5 py-3
                  rounded-xl
                  bg-gray-300
                  dark:bg-gray-600
                  text-gray-800
                  dark:text-white
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="
                  w-full sm:w-auto
                  px-5 py-3
                  rounded-xl
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  transition
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}