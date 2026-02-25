import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold text-green-600">
          SpendWise
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>

          <a href="#steps" className="hover:text-green-600 transition">
            How It Works
          </a>

          <button onClick={() => dispatch(toggleTheme())}>
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/login" className="text-sm hover:text-green-600">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
