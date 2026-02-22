import { Search, Bell, Sun, Camera } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-green-900">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-green-400 font-semibold">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Camera size={18} className="text-black" />
          </div>
          SpendWise
        </div>

        <nav className="flex gap-6 text-sm text-slate-300">
          <span>Dashboard</span>
          <span className="text-green-400">Expenses</span>
          <span>Receipts</span>
          <span>Budgets</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            placeholder="Search transactions..."
            className="bg-[#122b1e] border border-green-900 rounded-lg pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <Sun size={18} />
        <Bell size={18} />
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      </div>
    </header>
  )
}
