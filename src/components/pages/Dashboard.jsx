import { useState } from "react";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SideNavbar from "../layout/SideNavbar";
import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-300 overflow-x-hidden">
      

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        
        {/* Removed max-w-7xl for better mobile */}
        <div className="w-full">

          {/* ================= HEADER ================= */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">

            {/* Left */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                User Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Welcome back! Here’s your financial overview.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Export Button */}
              <button
                className="
                  flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl
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

              {/* New Expense Button */}
              <button
                onClick={() => navigate("/add-expense")}
                className="
                  flex items-center gap-2 px-5 sm:px-7 py-2 rounded-xl
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

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Balance" value="$12,450.00" />
            <StatCard title="Monthly Spend" value="$3,240.50" />
            <StatCard title="Savings Goal" value="$15,000.00" />
            <StatCard title="Pending Receipts" value="Review Scan" />
          </div>

          {/* ================= CHART + CATEGORIES ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
            <CategoriesCard />
          </div>

          {/* ================= TRANSACTIONS ================= */}
          <TransactionsTable />

        </div>
      </div>
    </div>
  );
}
