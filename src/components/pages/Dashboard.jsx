import { useState } from "react";
import SideNavbar from "../layout/SideNavbar";

import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1418] flex">

      <SideNavbar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 p-8 transition-all duration-300">

        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            User Dashboard
          </h1>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Balance" value="$12,450.00" />
          <StatCard title="Monthly Spend" value="$3,240.50" />
          <StatCard title="Savings Goal" value="$15,000.00" />
          <StatCard title="Pending Receipts" value="Review Scan" />
        </div>

        {/* Chart + Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <CategoriesCard />
        </div>

        {/* Transactions */}
        <TransactionsTable />

      </div>
    </div>
  );
}
