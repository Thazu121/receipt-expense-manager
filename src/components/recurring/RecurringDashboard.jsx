import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRecurring,
  deleteRecurring,
  toggleRecurring,
} from "../../redux/features/recurringSlice";

import RecurringModal from "./RecurringModal";
import RecurringCalendar from "./RecurringCalender";
import RecurringStats from "./RecurringStats";
import RecurringGraph from "./RecurringGraph";
import RecurringList from "./RecurringList";
import RecurringSingleItem from "./RecurringSingleItem";

import { Plus, Repeat } from "lucide-react";

export default function RecurringDashboard() {
  const dispatch = useDispatch();

  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.recurring || {});

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchRecurring());
  }, [dispatch]);

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-x-hidden

        p-3
        sm:p-5
        lg:p-6

        space-y-5
        sm:space-y-6
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <h1
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl
              font-bold
              flex
              items-center
              gap-2
              break-words
            "
          >
            <Repeat size={25} className="shrink-0" />
            Recurring Expenses
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-1
              leading-relaxed
            "
          >
            Manage rent, EMI, subscriptions and monthly bills.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            w-full
            sm:w-auto
            flex
            items-center
            justify-center
            gap-2

            bg-green-600
            hover:bg-green-700

            text-white
            px-4
            py-3
            sm:py-2.5

            rounded-xl
            font-medium
            transition
          "
        >
          <Plus size={18} />
          Add Recurring
        </button>
      </div>

      {error && (
        <div
          className="
            bg-red-100
            text-red-700
            p-3
            rounded-xl
            text-sm
            break-words
          "
        >
          {error}
        </div>
      )}

      <RecurringStats items={items} />

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-4
          sm:gap-6
          min-w-0
        "
      >
        <div className="min-w-0">
          <RecurringGraph items={items} />
        </div>

        <div className="min-w-0">
          <RecurringCalendar items={items} />
        </div>
      </div>

      <div className="min-w-0">
        <RecurringList
          items={items}
          loading={loading}
          onView={(item) => setSelectedItem(item)}
          onToggle={(id) => dispatch(toggleRecurring(id))}
          onDelete={(id) => dispatch(deleteRecurring(id))}
        />
      </div>

      {open && (
        <RecurringModal onClose={() => setOpen(false)} />
      )}

      {selectedItem && (
        <RecurringSingleItem
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}