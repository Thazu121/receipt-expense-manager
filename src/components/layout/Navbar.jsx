import {
  Moon,
  Sun,
  LogOut,
  Settings,
  Menu,
  X,
  Upload,
  Bell,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { logout } from "../../redux/features/authSlice";
import {
  markAllRead,
  clearNotifications,
} from "../../redux/features/settingSlice";

import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLight = useSelector((state) => state.theme.isLight);
  const profileImage = useSelector((state) => state.auth.user?.photo);
  const username = useSelector((state) => state.auth.user?.name);
  const notifications = useSelector(
    (state) => state.settings.notifications
  );

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const notificationRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
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
  }, [mobileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const closeMobile = () => setMobileOpen(false);

  const linkStyle = (path) =>
    `text-sm font-medium transition ${
      location.pathname.includes(path)
        ? "text-emerald-500"
        : isLight
        ? "text-gray-700 hover:text-emerald-600"
        : "text-gray-300 hover:text-emerald-400"
    }`;

  return (
    <header
      className={`relative px-4 md:px-6 h-16 flex items-center justify-between border-b transition ${
        isLight
          ? "bg-white border-gray-200"
          : "bg-[#0f172a] border-gray-800"
      }`}
    >
      <h1
        className={`text-lg font-semibold ${
          isLight ? "text-gray-800" : "text-white"
        }`}
      >
        SpendWise
      </h1>

      <nav className="hidden md:flex gap-8 items-center">
        <Link to="/dashboard" className={linkStyle("dashboard")}>
          Dashboard
        </Link>
        <Link to="/dashboard/expense" className={linkStyle("expense")}>
          Expense
        </Link>
        <Link to="/dashboard/report" className={linkStyle("report")}>
          Insights
        </Link>
      </nav>

      <div className="flex items-center gap-3 md:gap-4">

        {/* SCAN BUTTON */}
        <button
          onClick={() => navigate("/dashboard/scanner")}
          className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Upload size={16} />
          Scan Receipt
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg transition ${
            isLight ? "bg-gray-100" : "bg-[#1E293B]"
          }`}
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              if (!notificationOpen) dispatch(markAllRead());
            }}
            className={`relative p-2 rounded-lg transition ${
              isLight ? "bg-gray-100" : "bg-[#1E293B]"
            }`}
          >
            <Bell size={18} />

            {notifications?.some((n) => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            )}
          </button>

          {notificationOpen && (
            <div
              className={`absolute right-0 mt-3 w-72 rounded-xl shadow-lg border z-50 ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-[#1E293B] border-gray-700"
              }`}
            >
              <div className="flex justify-between px-4 py-3 border-b text-sm font-semibold">
                Notifications
                {notifications.length > 0 && (
                  <button
                    onClick={() => dispatch(clearNotifications())}
                    className="text-xs text-red-500"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-center text-gray-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <p
                      key={n.id}
                      className="px-4 py-3 text-sm border-b"
                    >
                      {n.message}
                    </p>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 cursor-pointer"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-500 text-white">
                {username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-3 w-44 rounded-xl shadow-lg border z-50 ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-[#1E293B] border-gray-700"
              }`}
            >
              <button
                onClick={() => {
                  navigate("/dashboard/settings");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-emerald-100"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm md:hidden z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isLight
            ? "bg-white text-black"
            : "bg-[#0f172a] text-white"
        }`}
      >
        <div className="p-6 space-y-5">
          <Link onClick={closeMobile} to="/dashboard">
            Dashboard
          </Link>
          <Link onClick={closeMobile} to="/dashboard/expense">
            Expense
          </Link>
          <Link onClick={closeMobile} to="/dashboard/report">
            Insights
          </Link>

          <button
            onClick={() => {
              navigate("/dashboard/scanner");
              closeMobile();
            }}
            className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg"
          >
            Scan Receipt
          </button>
        </div>
      </div>
    </header>
  );
}