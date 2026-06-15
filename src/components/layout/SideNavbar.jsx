import { useState } from "react";
import {
  LayoutDashboard,
  PieChart,
  Settings,
  Menu,
  Scan,
  Images,
  BanknoteArrowDown,
  X,
  Repeat,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reports",
      path: "/dashboard/insight",
      icon: PieChart,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Scan Receipt",
      path: "/dashboard/scanner",
      icon: Scan,
    },
    {
      name: "Gallery",
      path: "/dashboard/gallery",
      icon: Images,
    },
    {
      name: "Expense",
      path: "/dashboard/expense",
      icon: BanknoteArrowDown,
    },
    {
      name: "Recurring",
      path: "/dashboard/recurring",
      icon: Repeat,
    },
  ];

  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
          ExpenseTracker
        </h1>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu
            className="text-gray-700 dark:text-gray-300"
            size={22}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-dvh w-[82%] max-w-[280px] z-50
          bg-white dark:bg-[#0F172A]
          p-4 shadow-2xl transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            ExpenseTracker
          </h1>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X
              className="text-gray-700 dark:text-gray-300"
              size={22}
            />
          </button>
        </div>

        <nav className="space-y-2 overflow-y-auto max-h-[calc(100dvh-90px)] pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3 px-3 py-3 rounded-xl
                    text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className="truncate">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <aside
        className={`
          hidden lg:flex
          ${collapsed ? "w-20" : "w-60"}
          h-screen sticky top-0 p-4 flex-col
          bg-white dark:bg-[#0F172A]
          border-r border-gray-100 dark:border-gray-800
          transition-all duration-300 shrink-0
        `}
      >
        <div className="flex items-center justify-between mb-8 min-w-0">
          {!collapsed && (
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              ExpenseTracker
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition shrink-0"
          >
            <Menu
              size={18}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                  `
                    flex items-center
                    ${collapsed ? "justify-center" : "gap-3"}
                    px-3 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `
                }
              >
                <Icon size={20} className="shrink-0" />

                {!collapsed && (
                  <span className="truncate">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}