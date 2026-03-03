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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
      className={`relative px-6 h-16 flex items-center justify-between border-b transition ${
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

      <div className="flex items-center gap-4">
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
              if (!notificationOpen) {
                dispatch(markAllRead());
              }
            }}
            className={`relative p-2 rounded-lg transition ${
              isLight ? "bg-gray-100" : "bg-[#1E293B]"
            }`}
          >
            <Bell size={18} />

            {notifications?.some((n) => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
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
              <div
                className={`flex justify-between items-center px-4 py-3 border-b text-sm font-semibold ${
                  isLight ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Notifications

                {notifications.length > 0 && (
                  <button
                    onClick={() =>
                      dispatch(clearNotifications())
                    }
                    className="text-xs text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-400 text-center">
                    No notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`px-4 py-3 text-sm border-b ${
                        isLight
                          ? "hover:bg-gray-50 text-gray-700"
                          : "hover:bg-gray-800 text-gray-300"
                      } ${!item.read ? "font-semibold" : ""}`}
                    >
                      {item.message}
                    </div>
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
              <div className="w-full h-full flex items-center justify-center bg-emerald-500 text-white font-semibold">
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
              <div
                className={`px-4 py-3 border-b text-sm font-medium ${
                  isLight ? "text-gray-700" : "text-gray-200"
                }`}
              >
                {username || "User"}
              </div>

              <button
                onClick={() => {
                  navigate("/dashboard/settings");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-emerald-100 transition"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
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
          className={`absolute top-16 left-0 w-full border-t md:hidden ${
            isLight
              ? "bg-white border-gray-200"
              : "bg-[#0f172a] border-gray-800"
          }`}
        >
          <nav className="flex flex-col p-6 gap-4">
            <Link
              to="/dashboard"
              className={linkStyle("dashboard")}
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/expense"
              className={linkStyle("expense")}
              onClick={() => setMobileOpen(false)}
            >
              Expense
            </Link>

            <Link
              to="/dashboard/report"
              className={linkStyle("report")}
              onClick={() => setMobileOpen(false)}
            >
              Insights
            </Link>

            <button
              onClick={() => {
                navigate("/dashboard/scanner");
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Upload size={16} />
              Scan Receipt
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
