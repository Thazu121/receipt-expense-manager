import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Wallet, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useState, useEffect, useRef } from "react";

export default function AuthNav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLight = useSelector((state) => state.theme.isLight);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const isSignup = location.pathname === "/signup";
  const isSignin = location.pathname === "/login";

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-6 left-6 right-6 md:left-10 md:right-10 z-50">
      
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <Wallet size={22} className="text-emerald-500" />
          <span className="text-emerald-500">Spend</span>
          <span className={isLight ? "text-gray-900" : "text-white"}>
            Wise
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-emerald-500 font-medium hover:text-emerald-400 transition">
            Home
          </Link>

          {isSignin && (
            <>
              <span className={isLight ? "text-gray-700" : "text-gray-300"}>
                New here?
              </span>
              <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 transition">
                Create account
              </Link>
            </>
          )}

          {isSignup && (
            <>
              <span className={isLight ? "text-gray-700" : "text-gray-300"}>
                Already registered?
              </span>
              <Link to="/login" className="text-emerald-500 hover:text-emerald-400 transition">
                Sign in
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition hover:scale-105 ${
              isLight
                ? "bg-white border-gray-300 hover:bg-gray-100"
                : "bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md"
            }`}
          >
            {isLight ? (
              <Moon size={20} className="text-gray-700" />
            ) : (
              <Sun size={20} className="text-yellow-400" />
            )}
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-full transition-all duration-300 ${
            isLight ? "bg-emerald-100" : "bg-white/10 backdrop-blur-md"
          }`}
        >
          <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            {isOpen ? (
              <X size={24} className="text-emerald-500" />
            ) : (
              <Menu size={24} className="text-emerald-500" />
            )}
          </div>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"></div>
      )}

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`absolute right-0 mt-4 w-full md:hidden transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`p-6 rounded-2xl shadow-2xl space-y-4 ${
            isLight
              ? "bg-white text-gray-900"
              : "bg-[#0b2a1a] text-white border border-emerald-500/20"
          }`}
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-emerald-500 font-medium hover:text-emerald-400 transition"
          >
            Home
          </Link>

          {isSignin && (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-emerald-500 hover:text-emerald-400 transition"
            >
              Create account
            </Link>
          )}

          {isSignup && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-emerald-500 hover:text-emerald-400 transition"
            >
              Sign in
            </Link>
          )}

          <div className="border-t border-emerald-500/30 pt-4">
            <button
              onClick={() => {
                dispatch(toggleTheme());
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
