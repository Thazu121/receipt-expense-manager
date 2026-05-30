import { useEffect, useMemo } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import Header from "../dashboard/Header";
import StatCard from "../dashboard/StatCard";
import SpendingChart from "../dashboard/SpendingChart";
import CategoriesCard from "../dashboard/CategoriesCard";
import TransactionsTable from "../dashboard/TransactionTables";

import {
  getExpenses,
} from "../../redux/features/expenseSlice";



export default function Dashboard() {

  const dispatch = useDispatch();



  const {
    expenses = [],
    loading,
    error,
  } = useSelector(
    (state) => state.expense || {}
  );




  useEffect(() => {

    dispatch(
      getExpenses()
    );

  }, [dispatch]);




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
          bg-[#F8FAFC]
          dark:bg-[#0B1120]
        "
      >

        <div
          className="
            bg-white
            dark:bg-[#0F1B22]

            p-8

            rounded-3xl

            shadow-lg

            border
            border-red-200
            dark:border-red-500/20

            max-w-md
            w-full
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-red-500
            "
          >
            Failed to Load Dashboard
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-3
            "
          >
            {error}
          </p>

        </div>

      </div>
    );
  }




  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#F8FAFC]
          dark:bg-[#0B1120]
        "
      >

        <div
          className="
            h-16
            w-16

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




  const {
    totalBalance,
    monthlySpend,
    totalSavings,
    pendingExpenses,
    verifiedExpenses,
  } = useMemo(() => {

    const verified =
      expenses.filter(
        (e) =>
          e.status?.toLowerCase() ===
          "verified"
      );



    const total =
      verified.reduce(
        (sum, e) =>
          sum +
          Number(e.amount || 0),
        0
      );



    const currentMonth =
      new Date().getMonth();

    const currentYear =
      new Date().getFullYear();



    const monthly =
      verified
        .filter((e) => {

          if (!e.date) return false;

          const d =
            new Date(e.date);

          return (
            d.getMonth() ===
              currentMonth &&
            d.getFullYear() ===
              currentYear
          );
        })

        .reduce(
          (sum, e) =>
            sum +
            Number(e.amount || 0),
          0
        );



    const pending =
      expenses.filter(
        (e) =>
          e.status?.toLowerCase() ===
          "pending"
      ).length;



    return {

      totalBalance:
        total,

      monthlySpend:
        monthly,

      totalSavings:
        total * 0.2,

      pendingExpenses:
        pending,

      verifiedExpenses:
        verified.length,
    };

  }, [expenses]);




  const isEmpty =
    expenses.length === 0;



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


        <div
          className="
            mb-6
            sm:mb-8
          "
        >
          <Header />
        </div>




        {isEmpty ? (

          <div
            className="
              rounded-3xl

              border
              border-dashed
              border-gray-300
              dark:border-white/10

              bg-white
              dark:bg-[#0F1B22]

              py-20
              px-6

              text-center

              shadow-sm
            "
          >

            <h2
              className="
                text-3xl
                font-bold

                text-gray-800
                dark:text-white
              "
            >
              No Expenses Yet
            </h2>

            <p
              className="
                mt-4

                text-gray-500
                dark:text-gray-400

                max-w-md
                mx-auto
              "
            >
              Start adding expenses
              to see spending insights,
              analytics and reports.
            </p>

          </div>

        ) : (

          <>


            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-5

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
                title="Pending"
                value={pendingExpenses}
              />

              <StatCard
                title="Verified"
                value={verifiedExpenses}
              />

            </div>



            {/* ================= CHART SECTION ================= */}

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
                  expenses={expenses}
                />

              </div>



              <div className="min-w-0">

                <CategoriesCard
                  expenses={expenses}
                />

              </div>

            </div>



            {/* ================= TRANSACTIONS ================= */}

            <div
              className="
                rounded-2xl
                overflow-hidden
              "
            >

              <TransactionsTable
                expenses={expenses}
              />

            </div>

          </>
        )}

      </div>
    </div>
  );
}