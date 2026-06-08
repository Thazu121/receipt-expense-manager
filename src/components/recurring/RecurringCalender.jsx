import { useMemo } from "react";
import {
  CalendarDays,
  Repeat,
} from "lucide-react";

export default function RecurringCalendar({
  items = [],
}) {
  const grouped = useMemo(() => {
    const map = {};

    items.forEach((item) => {
      if (!item.nextDueDate) return;

      const date = new Date(
        item.nextDueDate
      )
        .toISOString()
        .split("T")[0];

      if (!map[date]) {
        map[date] = [];
      }

      map[date].push(item);
    });

    return map;
  }, [items]);

  const entries =
    Object.entries(grouped);

  return (
    <div
      className="
        bg-white
        dark:bg-zinc-900
        border
        dark:border-zinc-700
        rounded-2xl
        shadow-sm
        p-4
        sm:p-5
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <CalendarDays
          size={20}
          className="text-green-600"
        />

        <h2 className="text-lg font-bold">
          Upcoming Dues
        </h2>
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <div
          className="
            border
            border-dashed
            dark:border-zinc-700
            rounded-xl
            p-8
            text-center
          "
        >
          <CalendarDays
            size={40}
            className="
              mx-auto
              mb-3
              text-gray-400
            "
          />

          <h3 className="font-semibold">
            No Upcoming Dues
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Add recurring expenses to
            see future payments here.
          </p>
        </div>
      )}

      {/* Due Groups */}
      <div className="space-y-6">
        {entries.map(
          ([date, list]) => (
            <div key={date}>
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                "
              >
                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-green-500
                  "
                />

                <h3
                  className="
                    text-sm
                    sm:text-base
                    font-semibold
                    text-green-600
                  "
                >
                  {new Date(
                    date
                  ).toLocaleDateString()}
                </h3>
              </div>

              <div className="space-y-3">
                {list.map((item) => (
                  <div
                    key={item._id}
                    className="
                      border
                      dark:border-zinc-700
                      rounded-xl
                      p-4
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-3
                    "
                  >
                    {/* Left */}
                    <div className="min-w-0">
                      <h4
                        className="
                          font-semibold
                          truncate
                        "
                      >
                        {item.title}
                      </h4>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          mt-2
                        "
                      >
                        <span
                          className="
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            bg-green-100
                            text-green-700
                            dark:bg-green-500/20
                            dark:text-green-300
                          "
                        >
                          {item.category ||
                            "General"}
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            bg-blue-100
                            text-blue-700
                            dark:bg-blue-500/20
                            dark:text-blue-300
                          "
                        >
                          <Repeat size={12} />

                          {item.frequency}
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <div
                      className="
                        text-left
                        sm:text-right
                      "
                    >
                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        Due Amount
                      </p>

                      <h4
                        className="
                          text-lg
                          font-bold
                          text-green-600
                        "
                      >
                        ₹
                        {Number(
                          item.amount || 0
                        ).toLocaleString()}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}