export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full h-16 bg-white border-b">
            <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <span className="text-2xl">🧾</span>
                    <span className="text-lg font-bold">Fintech AI</span>
                </div>

                <nav className="flex items-center gap-6 text-sm font-medium">
                    <a className="text-slate-500 hover:text-slate-900">Dashboard</a>

                    <a className="text-slate-500 hover:text-slate-900">Upload</a>
                    <a className="text-slate-500 hover:text-slate-900">Receipts</a>
                    <a className="text-slate-500 hover:text-slate-900">Expenses</a>
                    <a className="text-slate-500 hover:text-slate-900">Reports</a>
                </nav>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="hidden md:block w-64 px-4 py-2 text-sm
             border rounded-lg
             bg-white text-slate-700
             placeholder-slate-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-2 rounded-lg hover:bg-slate-100">
                        🔔
                    </button>

                    <button className="p-2 rounded-lg hover:bg-slate-100">
                        ⚙️
                    </button>
                    <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold">
                        A
                    </div>



                </div>

            </div>
        </header>
    )
}
