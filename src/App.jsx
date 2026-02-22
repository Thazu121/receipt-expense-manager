export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧾</span>
          <span className="text-lg font-bold">Fintech AI</span>
        </div>

        {/* MIDDLE */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a className="text-indigo-600 border-b-2 border-indigo-600 pb-4">
            Dashboard
          </a>
          <a className="text-slate-500 hover:text-slate-900">Upload</a>
          <a className="text-slate-500 hover:text-slate-900">Receipts</a>
          <a className="text-slate-500 hover:text-slate-900">Expenses</a>
          <a className="text-slate-500 hover:text-slate-900">Reports</a>
        </nav>

        {/* RIGHT (empty for now) */}
        <div></div>

      </div>
    </header>
  );
}
