import { LayoutDashboard, CreditCard, ScanLine, BarChart3, Settings, Menu } from "lucide-react";

export default function SideNavbar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`
        h-[calc(100vh-80px)]
        bg-[#0f1c22]
        border-r border-[#1f2f36]
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">


        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="space-y-3 px-2">
        <Item icon={<LayoutDashboard size={20} />} text="Dashboard" collapsed={collapsed} />
        <Item icon={<CreditCard size={20} />} text="Transactions" collapsed={collapsed} />
        <Item icon={<ScanLine size={20} />} text="Receipt Scanner" collapsed={collapsed} />
        <Item icon={<BarChart3 size={20} />} text="Reports" collapsed={collapsed} />
        <Item icon={<Settings size={20} />} text="Settings" collapsed={collapsed} />
      </nav>
    </aside>
  );
}

function Item({ icon, text, collapsed }) {
  return (
    <div
      className={`
        flex items-center
        ${collapsed ? "justify-center" : "gap-3"}
        p-3 rounded-lg
        hover:bg-[#13242c]
        cursor-pointer transition
      `}
    >
      {icon}
      {!collapsed && <span className="text-gray-300">{text}</span>}
    </div>
  );
}
