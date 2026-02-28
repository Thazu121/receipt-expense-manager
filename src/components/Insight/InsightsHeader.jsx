import { Download, RefreshCcw } from "lucide-react";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function InsightsHeader() {
  const receipts = useSelector((state) => state.receipt.receipts);
  const [loading, setLoading] = useState(false);

  /* ===============================
     LAST 30 DAYS ANALYSIS
  =============================== */
  const { count, total } = useMemo(() => {
    const now = new Date();
    const last30 = new Date();
    last30.setDate(now.getDate() - 30);

    const filtered = receipts.filter((r) => {
      if (!r.date) return false;
      const d = new Date(r.date);
      return d >= last30 && d <= now;
    });

    const totalAmount = filtered.reduce(
      (sum, r) => sum + Math.abs(Number(r.amount || 0)),
      0
    );

    return {
      count: filtered.length,
      total: totalAmount,
    };
  }, [receipts]);

  /* ===============================
     REFRESH
  =============================== */
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-8">
      {/* LEFT CONTENT */}
      <div className="max-w-2xl">
        <p className="text-emerald-600 dark:text-green-400 text-xs tracking-widest mb-2 font-semibold">
          ✨ AI ENGINE ACTIVE
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          AI Spending Insights
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          We've analyzed your last 30 days of transactions.
          <br />
          <span className="font-medium">
            {count} transactions • ${total.toFixed(2)} spent
          </span>
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        {/* Export */}
        <button
          className="
            flex items-center justify-center gap-2
            px-4 py-2.5 rounded-lg
            transition-all duration-300
            text-sm font-medium
            bg-white/80 backdrop-blur-md
            border border-emerald-200
            text-gray-700
            hover:bg-emerald-100
            dark:bg-white/5
            dark:border-white/20
            dark:text-white
            dark:hover:bg-white/10
          "
        >
          <Download size={16} />
          Export Report
        </button>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="
            flex items-center justify-center gap-2
            px-4 py-2.5 rounded-lg
            transition-all duration-300
            text-sm font-medium
            bg-emerald-500 hover:bg-emerald-600
            text-white
            dark:bg-green-500
            dark:hover:bg-green-600
            dark:text-black
            disabled:opacity-60
          "
        >
          <RefreshCcw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? "Analyzing..." : "Refresh Analysis"}
        </button>
      </div>
    </div>
  );
}
