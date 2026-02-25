import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Wallet, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useState } from "react";

export default function AuthNav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLight = useSelector((state) => state.theme.isLight);

  const [isOpen, setIsOpen] = useState(false);

  const isSignup = location.pathname === "/signup";
  const isSignin = location.pathname === "/login";

  return (
    <div className="absolute top-6 left-6 right-6 md:left-10 md:right-10 z-20">
      
      <div className="flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Wallet size={22} />
          <span className="text-green-400">Spend</span>
          <span className={isLight ? "text-gray-900" : "text-white"}>
            Wise
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="text-green-400 font-medium hover:text-green-300 hover:underline transition"
          >
            Home
          </Link>

          {isSignin && (
            <>
              <span className={isLight ? "text-gray-700" : "text-gray-300"}>
                New to SpendWise?
              </span>
              <Link
                to="/signup"
                className="text-green-400 font-medium hover:text-green-300 hover:underline transition"
              >
                Create an account
              </Link>
            </>
          )}

          {isSignup && (
            <>
              <span className={isLight ? "text-gray-700" : "text-gray-300"}>
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-green-400 font-medium hover:text-green-300 hover:underline transition"
              >
                Sign in
              </Link>
            </>
          )}

          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 border hover:scale-105 ${
              isLight
                ? "bg-white border-gray-300 hover:bg-gray-100"
                : "bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            }`}
          >
            {isLight ? (
              <Moon size={20} className="text-gray-700" />
            ) : (
              <Sun size={20} className="text-yellow-400" />
            )}
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`mt-4 p-6 rounded-2xl shadow-lg md:hidden ${
            isLight
              ? "bg-white text-gray-900"
              : "bg-[#0b2a1a] text-white"
          }`}
        >
          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-green-400 font-medium hover:underline"
            >
              Home
            </Link>

            {isSignin && (
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-green-400 font-medium hover:underline"
              >
                Create an account
              </Link>
            )}

            {isSignup && (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-green-400 font-medium hover:underline"
              >
                Sign in
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => {
                dispatch(toggleTheme());
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-green-400 font-medium"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
              Toggle Theme
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
