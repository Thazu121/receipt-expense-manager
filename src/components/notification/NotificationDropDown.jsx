import { useDispatch, useSelector } from "react-redux";

import {
  selectNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
} from "../../redux/features/notificationSlice";

export default function NotificationDropdown() {
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
        <h3 className="font-semibold">
          Notifications
        </h3>

        <button
          onClick={() => dispatch(markAllNotificationsRead())}
          className="text-xs text-emerald-500"
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <button
              key={n._id || n.id}
              onClick={() =>
                dispatch(markNotificationRead(n._id || n.id))
              }
              className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-zinc-800 ${
                n.read
                  ? "bg-white dark:bg-zinc-900"
                  : "bg-emerald-50 dark:bg-emerald-900/20"
              }`}
            >
              <p className="font-semibold text-sm">
                {n.title || "Notification"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {n.message}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {n.createdAt
                  ? new Date(n.createdAt).toLocaleString()
                  : ""}
              </p>
            </button>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 dark:border-zinc-700">
          <button
            onClick={() => dispatch(clearNotifications())}
            className="w-full py-2 rounded-lg bg-red-500 text-white text-sm"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}