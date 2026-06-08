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
    <div className="p-4 md:p-6 space-y-6">

      <div className="flex flex-col sm:flex-row justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Repeat size={25} />
            Recurring Expenses
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage rent, EMI, subscriptions and monthly bills.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} />
          Add Recurring
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl">
          {error}
        </div>
      )}

      <RecurringStats items={items} />

      <div className="grid lg:grid-cols-2 gap-6">
        <RecurringGraph items={items} />
        <RecurringCalendar items={items} />
      </div>

      <RecurringList
        items={items}
        loading={loading}
        onView={(item) => setSelectedItem(item)}
        onToggle={(id) => dispatch(toggleRecurring(id))}
        onDelete={(id) => dispatch(deleteRecurring(id))}
      />

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