import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { Sun, Moon, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  const dispatch = useDispatch()
    const isLight = useSelector((state) => state.theme.isLight);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md
      bg-white/80 dark:bg-[#071a10]/80
      border-b border-gray-200 dark:border-green-900/40"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a href="#home" className="flex items-center gap-2 font-semibold text-lg">
          <Wallet />
          <span>SpendWise</span>
        </a>

        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-white/70 font-medium">
          <a
            href="#home"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Features
          </a>

          <a
            href="#steps"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Steps
          </a>
        </nav>

        <div className="flex items-center gap-4">
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
         <Link
  to="/login"
  className="hidden md:inline-block
  bg-green-600 hover:bg-green-700
  text-white px-5 py-2 rounded-lg transition"
>
  Login
</Link>
         <Link
  to="/signup"
  className="hidden md:inline-block
  bg-green-600 hover:bg-green-700
  text-white px-5 py-2 rounded-lg transition"
>
  SignUp
</Link>

        </div>

      </div>
    </header>
  );
}
