import { Moon, Sun, Bell, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { logout } from "../../redux/features/authSlice"; // ✅ better
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLight = useSelector((state) => state.theme.isLight);
  const profileImage = useSelector((state) => state.user.profileImage);
  const username = useSelector(
    (state) => state.auth.user?.name
  );

  const [profileOpen, setProfileOpen] = useState(false);
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

  return (
    <header
      className={`h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b shadow-sm transition-all
      ${
        isLight
          ? "bg-gradient-to-r from-green-100 to-green-200 border-green-200"
          : "bg-gradient-to-r from-[#0F172A] to-[#111827] border-gray-800"
      }`}
    >
      {/* Logo */}
      <h1
        className={`text-lg md:text-xl font-semibold truncate ${
          isLight ? "text-gray-800" : "text-white"
        }`}
      >
        SpendWise
      </h1>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-lg transition ${
            isLight ? "bg-white" : "bg-[#1E293B]"
          }`}
        >
          {isLight ? (
            <Moon size={18} className="text-gray-700" />
          ) : (
            <Sun size={18} className="text-yellow-400" />
          )}
        </button>

        {/* Notification */}
        <Bell
          size={20}
          className={`hidden sm:block ${
            isLight ? "text-gray-700" : "text-gray-300"
          }`}
        />

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-emerald-400 cursor-pointer"
          >
            <img
              src={
                profileImage ||
                "https://i.pravatar.cc/100?img=12"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-3 w-44 md:w-52 rounded-xl shadow-lg border z-50
              ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-[#1E293B] border-gray-700"
              }`}
            >
              {/* Username */}
              <div className="px-4 py-3 border-b text-sm font-medium truncate">
                {username || "User"}
              </div>

              {/* Settings */}
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

              {/* Logout */}
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
      </div>
    </header>
  );
}
