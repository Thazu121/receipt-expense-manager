import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { Sun, Moon, Wallet, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`
        sticky top-0 z-50 backdrop-blur-md border-b
        transition-all duration-500
        ${
          isLight
            ? "bg-gradient-to-r from-green-100 to-emerald-200 border-green-200"
            : "bg-[#071a10]/80 border-green-900/40"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a
          href="#home"
          className={`flex items-center gap-2 font-semibold text-lg ${
            isLight ? "text-gray-900" : "text-white"
          }`}
        >
          <Wallet className={isLight ? "text-emerald-600" : "text-green-400"} />
          <span>SpendWise</span>
        </a>

        <nav
          className={`hidden md:flex gap-8 font-medium ${
            isLight ? "text-gray-800" : "text-white/70"
          }`}
        >
          <a href="#home" className="hover:text-emerald-600 transition">
            Home
          </a>
          <a href="#features" className="hover:text-emerald-600 transition">
            Features
          </a>
          <a href="#steps" className="hover:text-emerald-600 transition">
            Steps
          </a>
        </nav>

        <div className="flex items-center gap-4">

          <button
            onClick={() => dispatch(toggleTheme())}
            className={`
              w-11 h-11 flex items-center justify-center rounded-full
              transition-all duration-500 border hover:scale-105
              ${
                isLight
                  ? "bg-white border-green-300 hover:bg-green-100"
                  : "bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md"
              }
            `}
          >
            {isLight ? (
              <Moon size={20} className="text-gray-700" />
            ) : (
              <Sun size={20} className="text-yellow-400" />
            )}
          </button>

          <div className="hidden md:flex gap-3">
            <Link
              to="/login"
              className={`px-5 py-2 rounded-lg transition font-medium ${
                isLight
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-green-600 hover:bg-green-500 text-black"
              }`}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`px-5 py-2 rounded-lg transition font-medium ${
                isLight
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-green-600 hover:bg-green-500 text-black"
              }`}
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className={isLight ? "text-black" : "text-white"} />
            ) : (
              <Menu className={isLight ? "text-black" : "text-white"} />
            )}
          </button>
        </div>
      </div>
{isOpen && (
  <div
    className={`md:hidden px-6 pb-6 space-y-4 ${
      isLight ? "text-gray-800" : "text-white"
    }`}
  >
    <a
      href="#home"
      onClick={() => setIsOpen(false)}
      className="block hover:text-emerald-600"
    >
      Home
    </a>

    <a
      href="#features"
      onClick={() => setIsOpen(false)}
      className="block hover:text-emerald-600"
    >
      Features
    </a>

    <a
      href="#steps"
      onClick={() => setIsOpen(false)}
      className="block hover:text-emerald-600"
    >
      Steps
    </a>

    <div className="pt-4 border-t border-emerald-500/20 space-y-3">

      <Link
        to="/login"
        onClick={() => setIsOpen(false)}
        className={`block w-full text-center py-3 rounded-lg font-medium transition ${
          isLight
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-green-500 hover:bg-green-400 text-black"
        }`}
      >
        Login
      </Link>

      <Link
        to="/signup"
        onClick={() => setIsOpen(false)}
        className={`block w-full text-center py-3 rounded-lg font-medium transition ${
          isLight
            ? "bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
        }`}
      >
        Sign Up
      </Link>

    </div>
  </div>
)}

    </div>
  );
}
