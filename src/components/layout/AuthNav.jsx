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

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="absolute top-4 left-4 right-4 md:top-6 md:left-10 md:right-10 z-50">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg md:text-xl font-semibold"
        >
          <Wallet size={22} className="text-emerald-500" />
          <span className="text-emerald-500">Spend</span>
          <span className={isLight ? "text-gray-900" : "text-white"}>
            Wise
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-emerald-500 font-medium hover:opacity-80"
          >
            Home
          </Link>

          {isSignin && (
            <>
              <span className={isLight ? "text-gray-600" : "text-gray-300"}>
                New here?
              </span>
              <Link to="/signup" className="text-emerald-500 hover:opacity-80">
                Create account
              </Link>
            </>
          )}

          {isSignup && (
            <>
              <span className={isLight ? "text-gray-600" : "text-gray-300"}>
                Already registered?
              </span>
              <Link to="/login" className="text-emerald-500 hover:opacity-80">
                Sign in
              </Link>
            </>
          )}

          {/* THEME BUTTON */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
              isLight
                ? "bg-white border-gray-300"
                : "bg-white/10 border-white/20"
            }`}
          >
            {isLight ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full bg-emerald-100 dark:bg-white/10 z-50"
        >
          {isOpen ? (
            <X size={22} className="text-emerald-600" />
          ) : (
            <Menu size={22} className="text-emerald-600" />
          )}
        </button>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
        />
      )}

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 md:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`h-full p-6 space-y-6 ${
            isLight
              ? "bg-white text-gray-900"
              : "bg-[#0b2a1a] text-white"
          }`}
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-emerald-500 font-medium"
          >
            Home
          </Link>

          {isSignin && (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-emerald-500"
            >
              Create account
            </Link>
          )}

          {isSignup && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-emerald-500"
            >
              Sign in
            </Link>
          )}

          <div className="border-t pt-4 border-emerald-500/30">
            <button
              onClick={() => {
                dispatch(toggleTheme());
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-emerald-500"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}