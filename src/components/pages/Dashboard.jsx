import { useSelector } from "react-redux";
import Header from "../dashboard/Header";
import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";
import { useMemo } from "react";

export default function Dashboard() {
  const receipts = useSelector(
    (state) => state.receipt?.receipts || []
  );

  if (!Array.isArray(receipts)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Something went wrong loading your data.
      </div>
    );
  }

  const {
    totalBalance,
    monthlySpend,
    totalSavings,
    pendingReceipts,
  } = useMemo(() => {
    // ✅ Only count verified receipts for totals
    const verifiedReceipts = receipts.filter(
      (r) => r.status?.toLowerCase() === "verified"
    );

    const total = verifiedReceipts.reduce(
      (sum, r) => sum + Number(r.amount || 0),
      0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthly = verifiedReceipts
      .filter((r) => {
        if (!r.date) return false;
        const d = new Date(r.date);
        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce(
        (sum, r) => sum + Number(r.amount || 0),
        0
      );

    // ✅ FIXED: Case insensitive pending check
    const pending = receipts.filter(
      (r) => r.status?.toLowerCase() === "pending"
    ).length;

    return {
      totalBalance: total,
      monthlySpend: monthly,
      totalSavings: total * 0.2,
      pendingReceipts: pending,
    };
  }, [receipts]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Header />
        </div>

        {/* Stats Section */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-2 
          xl:grid-cols-4 
          gap-4 sm:gap-6 
          mb-8 sm:mb-10
        ">
          <StatCard
            title="Total Balance"
            value={totalBalance}
            isCurrency
          />

          <StatCard
            title="Monthly Spend"
            value={monthlySpend}
            isCurrency
          />

          <StatCard
            title="Savings Goal"
            value={totalSavings}
            isCurrency
          />

          <StatCard
            title="Pending Receipts"
            value={pendingReceipts}
          />
        </div>

        {/* Charts + Categories */}
        <div className="
          grid 
          grid-cols-1 
          lg:grid-cols-3 
          gap-6 
          mb-8 sm:mb-10
        ">
          <div className="lg:col-span-2 w-full">
            <SpendingChart receipts={receipts} />
          </div>

          <div className="w-full">
            <CategoriesCard receipts={receipts} />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="w-full overflow-x-auto">
          <TransactionsTable receipts={receipts} />
        </div>

      </div>
    </div>
  );
}
