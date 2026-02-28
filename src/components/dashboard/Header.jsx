import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();

  const receipts = useSelector(
    (state) => state.receipt.receipts
  )

  const handleExport = () => {
    if (!receipts || receipts.length === 0) {
      alert("No expenses to export.")
      return
    }

    try {
      const headers = ["Store", "Category", "Date", "Amount"];

      const rows = receipts.map((r) => [
        `"${r.store || ""}"`,
        `"${r.category || ""}"`,
        `"${r.date || ""}"`,
        r.amount || 0,
      ]);

      const csv =
        headers.join(",") +
        "\n" +
        rows.map((row) => row.join(",")).join("\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      })

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url
      link.download = "expenses.csv"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Something went wrong while exporting.")
    }
  }

  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
          User Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Welcome back! Here’s your financial overview.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

        <button
          onClick={handleExport}
          className="
            w-full sm:w-auto
            flex items-center justify-center gap-2
            px-4 sm:px-6 py-2 rounded-xl
            text-sm font-medium border
            bg-white text-gray-700 border-gray-300
            hover:bg-gray-100
            dark:bg-[#1E293B] dark:text-gray-300 dark:border-gray-700
            dark:hover:bg-[#334155]
            transition
          "
        >
          <Download size={16} />
          Export
        </button>

        <button
          onClick={() => navigate("/expense")}
          className="
            w-full sm:w-auto
            flex items-center justify-center gap-2
            px-5 sm:px-7 py-2 rounded-xl
            text-sm font-semibold
            bg-emerald-500 text-white
            hover:bg-emerald-600
            dark:bg-emerald-500 dark:text-black
            dark:hover:bg-emerald-400
            shadow-md transition
          "
        >
          <Plus size={16} />
          New Expense
        </button>

      </div>
    </header>
  );
}
