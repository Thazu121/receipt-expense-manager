import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

export default function AuthNav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLight = useSelector((state) => state.theme.isLight);

  const isSignup = location.pathname === "/signup";
  const isSignin = location.pathname === "/login";

  return (
    <div className="absolute top-6 left-10 right-10 flex items-center justify-between z-20">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <Wallet size={22} />
        <span className="text-green-400">Spend</span>
        <span className={isLight ? "text-gray-900" : "text-white"}>
          Wise
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">

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

        {/* Theme Toggle */}
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
    </div>
  );
}
