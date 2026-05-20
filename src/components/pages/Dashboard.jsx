import { useSelector } from "react-redux";
import { useMemo } from "react";

import Header from "../dashboard/Header";
import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";



export default function Dashboard() {

  const {
    receipts = [],
    loading,
    error,
  } = useSelector(
    (state) => state.receipt || {}
  );



  /* ================= ERROR ================= */

  if (error) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          text-center
        "
      >
        <div>
          <h2 className="text-xl font-bold text-red-500">
            Failed to load dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>
        </div>
      </div>
    );
  }



  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            h-14
            w-14
            rounded-full
            border-4
            border-emerald-500
            border-t-transparent
            animate-spin
          "
        />
      </div>
    );
  }



  /* ================= ANALYTICS ================= */

  const {
    totalBalance,
    monthlySpend,
    totalSavings,
    pendingReceipts,
  } = useMemo(() => {

    const verifiedReceipts =
      receipts.filter(
        (r) =>
          r.status?.toLowerCase() ===
          "verified"
      );



    const total =
      verifiedReceipts.reduce(
        (sum, r) =>
          sum +
          Number(r.amount || 0),
        0
      );



    const currentMonth =
      new Date().getMonth();

    const currentYear =
      new Date().getFullYear();



    const monthly =
      verifiedReceipts
        .filter((r) => {

          if (!r.date) return false;

          const d =
            new Date(r.date);

          return (
            d.getMonth() ===
              currentMonth &&
            d.getFullYear() ===
              currentYear
          );
        })

        .reduce(
          (sum, r) =>
            sum +
            Number(r.amount || 0),
          0
        );



    const pending =
      receipts.filter(
        (r) =>
          r.status?.toLowerCase() ===
          "pending"
      ).length;



    return {
      totalBalance: total,

      monthlySpend: monthly,

      totalSavings:
        total * 0.2,

      pendingReceipts:
        pending,
    };

  }, [receipts]);



  /* ================= EMPTY STATE ================= */

  const isEmpty =
    receipts.length === 0;



  return (
    <div
      className="
        min-h-screen
        bg-[#F8FAFC]
        dark:bg-[#0B1120]
        transition-colors
        duration-300
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-5
          sm:py-8
          lg:py-10
        "
      >

        {/* ================= HEADER ================= */}

        <div className="mb-6 sm:mb-8">
          <Header />
        </div>



        {/* ================= EMPTY ================= */}

        {isEmpty ? (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-gray-300
              dark:border-white/10

              bg-white
              dark:bg-white/5

              py-20
              px-6

              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
                dark:text-white
              "
            >
              No Expenses Yet
            </h2>

            <p
              className="
                mt-3
                text-gray-500
                dark:text-gray-400
              "
            >
              Start adding expenses to
              view your dashboard analytics.
            </p>

          </div>

        ) : (

          <>
            {/* ================= STATS ================= */}

            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4

                gap-4
                sm:gap-6

                mb-8
                sm:mb-10
              "
            >

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



            {/* ================= CHARTS ================= */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-3

                gap-6

                mb-8
                sm:mb-10
              "
            >

              <div
                className="
                  lg:col-span-2
                  min-w-0
                "
              >
                <SpendingChart
                  receipts={receipts}
                />
              </div>

              <div className="min-w-0">
                <CategoriesCard
                  receipts={receipts}
                />
              </div>

            </div>



            {/* ================= TABLE ================= */}

            <div
              className="
                overflow-x-auto
                rounded-2xl
              "
            >
              <TransactionsTable
                receipts={receipts}
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}