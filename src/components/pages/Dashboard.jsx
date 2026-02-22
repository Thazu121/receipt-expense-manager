export default function Dashboard() {
  return (
    <main className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Good morning, Alex
          </h2>
          <p className="text-slate-400 text-sm">
            Here's what's happening with your expenses today.
          </p>
        </div>

        <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">
            cloud_upload
          </span>
          Upload Receipt
        </button>
      </div>

      {/* stats cards etc */}
    </main>
  );
}
