import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  ScanLine,
  BarChart3,
  Settings,
  HelpCircle,
  X
} from "lucide-react";
import { useState } from "react";

export default function SideNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-white border-r
          px-4 py-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-3">MAIN MENU</p>

        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={active} setActive={setActive} />
        <NavItem icon={<CreditCard size={18} />} label="Transactions" active={active} setActive={setActive} />
        <NavItem icon={<Wallet size={18} />} label="Budgets" active={active} setActive={setActive} />
        <NavItem icon={<ScanLine size={18} />} label="Receipt Scanner" active={active} setActive={setActive} />
        <NavItem icon={<BarChart3 size={18} />} label="Reports" active={active} setActive={setActive} />

        <p className="text-xs text-slate-400 mt-8 mb-3">PREFERENCE</p>

        <NavItem icon={<Settings size={18} />} label="Settings" active={active} setActive={setActive} />
        <NavItem icon={<HelpCircle size={18} />} label="Support" active={active} setActive={setActive} />
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30  p-2 rounded-lg shadow"
        >
          ☰
        </button>
      )}
    </>
  )
}

function NavItem({ icon, label, active, setActive }) {
  const isActive = active === label;

  return (
    <div
      onClick={() => setActive(label)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer mb-1
        ${isActive
          ? "bg-green-500 text-white"
          : "text-slate-600 hover:bg-slate-100"
        }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}
