import {
  Moon,
  Sun,
  LogOut,
  Settings,
  Menu,
  X,
  Upload,
  Bell,
  Repeat,
  LayoutDashboard,
  ReceiptText,
  BarChart3,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { toggleTheme } from "../../redux/features/themeSlice";
import { logout } from "../../redux/features/authSlice";

import {
  selectNotifications,
  selectUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
} from "../../redux/features/notificationSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLight = useSelector((state) => state.theme.isLight);
  const profileImage = useSelector((state) => state.auth.user?.photo);
  const username = useSelector((state) => state.auth.user?.name);

  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const closeMobile = () => setMobileOpen(false);

  const getNotificationId = (n) => n._id || n.id || n.uniqueKey;

  const isDashboardActive = location.pathname === "/dashboard";
  const isExpenseActive = location.pathname.includes("/dashboard/expense");
  const isReportActive = location.pathname.includes("/dashboard/report");
  const isSettingsActive = location.pathname.includes("/dashboard/settings");

  const desktopLink = (active) =>
    `relative text-sm font-semibold transition-all duration-200 ${
      active
        ? "text-emerald-600"
        : isLight
        ? "text-slate-600 hover:text-emerald-600"
        : "text-slate-300 hover:text-emerald-400"
    }`;

  const activeLine =
    "after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:rounded-full after:bg-emerald-500";

  const mobileLink = (active) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
      active
        ? "bg-emerald-500 text-white shadow-sm"
        : isLight
        ? "text-slate-700 hover:bg-slate-100"
        : "text-slate-200 hover:bg-white/10"
    }`;

  const iconButton = `p-2 rounded-xl border transition ${
    isLight
      ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
      : "bg-[#1E293B] border-slate-700 text-slate-200 hover:bg-slate-700"
  }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between border-b shadow-sm transition ${
        isLight
          ? "bg-slate-50 border-slate-200"
          : "bg-[#0f172a] border-slate-800"
      }`}
    >
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className={`shrink-0 text-base sm:text-lg lg:text-xl font-extrabold tracking-tight ${
          isLight ? "text-slate-900" : "text-white"
        }`}
      >
        SpendWise
      </button>

      <nav className="hidden lg:flex gap-6 xl:gap-8 items-center">
        <Link
          to="/dashboard"
          className={`${desktopLink(isDashboardActive)} ${
            isDashboardActive ? activeLine : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/dashboard/expense"
          className={`${desktopLink(isExpenseActive)} ${
            isExpenseActive ? activeLine : ""
          }`}
        >
          Expense
        </Link>

        <Link
          to="/dashboard/report"
          className={`${desktopLink(isReportActive)} ${
            isReportActive ? activeLine : ""
          }`}
        >
          Insights
        </Link>
      </nav>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/scanner")}
          className="hidden lg:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition"
        >
          <Upload size={16} />
          Scan Receipt
        </button>

        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className={iconButton}
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setNotificationOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className={`relative ${iconButton}`}
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`fixed sm:absolute right-3 sm:right-0 top-16 sm:top-auto sm:mt-3 w-[calc(100vw-24px)] sm:w-96 rounded-2xl shadow-2xl border z-[9999] overflow-hidden ${
                isLight
                  ? "bg-white border-slate-200 text-slate-800"
                  : "bg-[#1E293B] border-slate-700 text-white"
              }`}
            >
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isLight ? "border-slate-200" : "border-slate-700"
                }`}
              >
                <span className="text-sm font-bold">Notifications</span>

                <div className="flex gap-3">
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(markAllNotificationsRead())
                      }
                      className="text-xs font-semibold text-emerald-600"
                    >
                      Mark read
                    </button>
                  )}

                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={() => dispatch(clearNotifications())}
                      className="text-xs font-semibold text-red-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-5 text-sm text-center text-slate-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n, index) => {
                    const id = getNotificationId(n);

                    return (
                      <button
                        type="button"
                        key={id || index}
                        onClick={() => {
                          if (id) dispatch(markNotificationRead(id));
                        }}
                        className={`w-full text-left px-4 py-3 border-b transition ${
                          isLight ? "border-slate-100" : "border-slate-700"
                        } ${
                          n.read
                            ? ""
                            : isLight
                            ? "bg-emerald-50"
                            : "bg-emerald-900/20"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              n.type === "recurring"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-emerald-100 text-emerald-600"
                            }`}
                          >
                            {n.type === "recurring" ? (
                              <Repeat size={16} />
                            ) : (
                              <Bell size={16} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-sm">
                              {n.type === "recurring" ? "🔁 " : ""}
                              {n.title || "Notification"}
                            </p>

                            <p
                              className={`text-sm mt-1 break-words ${
                                isLight
                                  ? "text-slate-500"
                                  : "text-slate-300"
                              }`}
                            >
                              {n.message}
                            </p>

                            <p className="text-xs text-slate-400 mt-2">
                              {n.createdAt
                                ? new Date(n.createdAt).toLocaleString()
                                : ""}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative hidden sm:block" ref={profileRef}>
          <div
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 cursor-pointer bg-emerald-500"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                {username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-3 w-44 rounded-xl shadow-xl border z-[9999] overflow-hidden ${
                isLight
                  ? "bg-white border-slate-200 text-slate-800"
                  : "bg-[#1E293B] border-slate-700 text-white"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  navigate("/dashboard/settings");
                  setProfileOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium ${
                  isLight ? "hover:bg-slate-100" : "hover:bg-white/10"
                }`}
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`lg:hidden ${iconButton}`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-[82%] max-w-sm lg:hidden z-50 transform transition-transform duration-300 shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } ${isLight ? "bg-white text-slate-900" : "bg-[#0f172a] text-white"}`}
      >
        <div
          className={`flex items-center justify-between px-5 py-5 border-b ${
            isLight ? "border-slate-200" : "border-slate-800"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                username?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>

            <div className="min-w-0">
              <h2 className="font-extrabold text-lg truncate">
                SpendWise
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {username || "Welcome back"}
              </p>
            </div>
          </div>

          <button type="button" onClick={closeMobile} className={iconButton}>
            <X size={20} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <Link
            onClick={closeMobile}
            to="/dashboard"
            className={mobileLink(isDashboardActive)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            onClick={closeMobile}
            to="/dashboard/expense"
            className={mobileLink(isExpenseActive)}
          >
            <ReceiptText size={18} />
            Expense
          </Link>

          <Link
            onClick={closeMobile}
            to="/dashboard/report"
            className={mobileLink(isReportActive)}
          >
            <BarChart3 size={18} />
            Insights
          </Link>

          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/scanner");
              closeMobile();
            }}
            className="mt-3 flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-sm"
          >
            <Upload size={18} />
            Scan Receipt
          </button>

          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/settings");
              closeMobile();
            }}
            className={mobileLink(isSettingsActive)}
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </header>
  );
}