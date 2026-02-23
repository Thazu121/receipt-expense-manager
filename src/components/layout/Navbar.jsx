export default function TopNavbar() {
  return (
    <header className="flex items-center justify-between px-16 h-16 
    bg-[#0b1f16] border-b border-green-900">

      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2 text-green-400 font-semibold">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Wallet size={18} className="text-black" />
          </div>
          SpendWise
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <Link
            to="/dashboard"
            className="text-green-400 font-medium border-b-2 border-green-400 pb-1"
          >
            Dashboard
          </Link>

          <Link to="/expenses" className="hover:text-green-400">
            Expenses
          </Link>

          <Link to="/receipts" className="hover:text-green-400">
            Receipts
          </Link>

          <Link to="/reports" className="hover:text-green-400">
            Reports
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            placeholder="Search transactions..."
            className="bg-[#122b1e] border border-green-900 rounded-lg 
            pl-9 pr-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <Sun size={18} className="cursor-pointer hover:text-green-400" />
        <Settings size={18} className="cursor-pointer hover:text-green-400" />
        <Bell size={18} className="cursor-pointer hover:text-green-400" />
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      </div>
    </header>
  )
}
