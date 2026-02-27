import { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  Menu,
  Scan,
  Images,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Reports", path: "/dashboard/insight", icon: PieChart },
    { name: "Settings", path: "/dashboard/setting", icon: Settings },
    {name:"Scan Receipt",path:"/dashboard/scanner",icon:Scan},
    {name:"Gallery",path:"/dashboard/gallery",icon:Images}
  ];

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0F172A] border-b dark:border-gray-800">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          ExpenseTracker
        </h1>
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-white dark:bg-[#0F172A] p-4 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              ExpenseTracker
            </h1>
            <button onClick={() => setMobileOpen(false)}>
              <X className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`
          hidden lg:flex
          ${collapsed ? "w-20" : "w-64"}
          h-screen
          p-4
          flex-col
          bg-white dark:bg-[#0F172A]
          border-r border-gray-100 dark:border-gray-800
          transition-all duration-300
        `}
      >
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              ExpenseTracker
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
