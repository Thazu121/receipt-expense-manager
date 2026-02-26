import {
  Search,
  Moon,
  Sun,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);
  const [open, setOpen] = useState(false);
  const navItems = [
{ label: "Scan Receipt", path: "/dashboard/scanner" },
    { label: "Expenses", path: "/dashboard/expense" },
    { label: "Gallery", path: "/dashboard/gallery" },
  ];

  return (
    <>
      <header
        className={`
          h-20 px-4 md:px-8 flex items-center justify-between
          border-b transition-all duration-300 shadow-sm
          ${
            isLight
              ? "bg-gradient-to-r from-green-100 to-green-200 border-green-200"
              : "bg-gradient-to-r from-[#0F172A] to-[#111827] border-gray-800"
          }
        `}
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 md:gap-10">

          {/* Mobile Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className={isLight ? "text-gray-800" : "text-white"} />
            ) : (
              <Menu className={isLight ? "text-gray-800" : "text-white"} />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-black">
              💰
            </div>
            <h1
              className={`text-lg md:text-xl font-semibold ${
                isLight ? "text-gray-800" : "text-white"
              }`}
            >
              SpendWise
            </h1>
          </div>

          {/* Search (Desktop only) */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isLight ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className={`
                w-64 lg:w-72 pl-11 pr-4 py-2 rounded-xl border transition
                ${
                  isLight
                    ? "bg-white text-gray-700 border-green-200 focus:ring-2 focus:ring-green-400"
                    : "bg-[#1E293B] text-gray-200 border-gray-700 focus:ring-2 focus:ring-emerald-500"
                }
                focus:outline-none
              `}
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 md:gap-8">

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? isLight
                        ? "text-green-600"
                        : "text-white"
                      : isLight
                      ? "text-gray-600 hover:text-green-600"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`
              p-2 rounded-lg transition
              ${
                isLight
                  ? "bg-white hover:bg-green-100"
                  : "bg-[#1E293B] hover:bg-[#334155]"
              }
            `}
          >
            {isLight ? (
              <Moon size={18} className="text-gray-700" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          {/* Notification */}
          <button
            className={`
              relative p-2 rounded-lg transition
              ${
                isLight
                  ? "bg-white hover:bg-green-100"
                  : "bg-[#1E293B] hover:bg-[#334155]"
              }
            `}
          >
            <Bell
              size={18}
              className={isLight ? "text-gray-700" : "text-gray-300"}
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-400 flex items-center justify-center font-semibold text-black">
            S
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div
          className={`
            lg:hidden px-6 py-4 space-y-4 border-b shadow-md
            ${
              isLight
                ? "bg-white border-green-200"
                : "bg-[#0F172A] border-gray-800"
            }
          `}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition ${
                  isActive
                    ? isLight
                      ? "text-green-600"
                      : "text-white"
                    : isLight
                    ? "text-gray-700 hover:text-green-600"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
