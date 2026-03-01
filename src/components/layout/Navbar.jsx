import { Moon, Sun, LogOut, Settings, Menu, X, Upload } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { logout } from "../../redux/features/authSlice";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLight = useSelector((state) => state.theme.isLight);
  const profileImage = useSelector((state) => state.user.profileImage);
  const username = useSelector((state) => state.auth.user?.name);

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
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
      {/* Logo */}
      <h1
        className={`text-lg font-semibold ${
          isLight ? "text-gray-800" : "text-white"
        }`}
      >
        SpendWise
      </h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center">
        <Link to="/dashboard" className={linkStyle("dashboard")}>
          Dashboard
        </Link>

        <Link to="/dashboard/transaction" className={linkStyle("transaction")}>
          Expense
        </Link>

        <Link to="/dashboard/report" className={linkStyle("report")}>
          Insights
        </Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* 🔥 Upload Receipt Button (Desktop Only) */}
        <button
          onClick={() => navigate("/dashboard/scanner")}
          className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Upload size={16} />
          Scan Receipt
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg transition ${
            isLight ? "bg-gray-100" : "bg-[#1E293B]"
          }`}
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 cursor-pointer"
          >
            <img
              src={profileImage || "https://i.pravatar.cc/100?img=12"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-3 w-44 rounded-xl shadow-lg border z-50 ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-[#1E293B] border-gray-700"
              }`}
            >
              <div className="px-4 py-3 border-b text-sm font-medium">
                {username || "User"}
              </div>

              <button
                onClick={() => {
                  navigate("/dashboard/settings");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-emerald-50 transition"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              to="/dashboard/transaction"
              className={linkStyle("transaction")}
              onClick={() => setMobileOpen(false)}
            >
              Transactions
            </Link>

            <Link
              to="/dashboard/report"
              className={linkStyle("report")}
              onClick={() => setMobileOpen(false)}
            >
              Insights
            </Link>

            {/* 🔥 Upload Receipt (Mobile) */}
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
