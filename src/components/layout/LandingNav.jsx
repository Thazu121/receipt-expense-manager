import { Link } from "react-router-dom";
import { Sun, Moon, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

export default function LandingNavbar() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Wallet size={22} />
          <span className="text-green-500">Spend</span>
          <span>Wise</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-6">

          <a href="#features" className="hover:text-green-500 transition">
            Features
          </a>

          <a href="#why" className="hover:text-green-500 transition">
            Why SpendWise
          </a>

          <Link
            to="/login"
            className="hover:text-green-500 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Get Started
          </Link>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

        </div>
      </div>
    </header>
  );
}
