import { NavLink } from "react-router-dom";
import { Sun, Moon, Settings, Scan } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    
    <header className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-slate-700 px-8 py-4 flex justify-between items-center transition-colors duration-300">

      <h1 className="text-xl font-bold text-emerald-500">
        SpendWise
      </h1>

      <nav className="hidden md:flex items-center gap-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/transactions"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`
          }
          
        >
          Transactions
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="/dashboard/scanner"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`
          }
        >
          <Scan size={18} />
          Scan Receipt
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition"
      >
        {isLight ? (
          <Moon size={20} className="text-gray-800 dark:text-white" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>

    </header>
  );
}
