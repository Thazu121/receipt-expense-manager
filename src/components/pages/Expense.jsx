import { useSelector } from "react-redux";
import { useState } from "react";

import ExpenseHeader from "../expenses/ExpenseHeader";
import ExpenseStats from "../expenses/ExpenseStats";
import ExpenseFilters from "../expenses/ExpenseFilters";
import ExpenseTable from "../expenses/ExpenseTable";



export default function Expenses() {

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const [search, setSearch] =
    useState("");



  return (

    <div
      className={`
        min-h-screen
        w-full
        overflow-x-hidden

        transition-colors
        duration-300

        px-3
        py-4

        sm:px-5
        sm:py-6

        lg:px-8

        ${
          isLight

            ? `
              bg-green-50
              sm:bg-gray-100
              lg:bg-gray-200

              text-gray-900
            `

            : `
              bg-emerald-950

              sm:bg-gradient-to-br
              sm:from-emerald-950
              sm:via-emerald-900
              sm:to-black

              text-white
            `
        }
      `}
    >

      <div
        className="
          max-w-7xl
          mx-auto

          space-y-5
          sm:space-y-6
          lg:space-y-8
        "
      >


        {/* ================= HEADER ================= */}

        <div
          className="
            w-full
            overflow-hidden
          "
        >
          <ExpenseHeader />
        </div>



        {/* ================= STATS ================= */}

        <div className="w-full">
          <ExpenseStats />
        </div>



        {/* ================= FILTERS ================= */}

        <div
          className="
            w-full
            overflow-hidden
          "
        >

          <ExpenseFilters
            search={search}
            setSearch={setSearch}
          />

        </div>



        {/* ================= TABLE ================= */}

        <div
          className="
            w-full
            overflow-x-auto

            rounded-2xl
          "
        >

          <ExpenseTable
            search={search}
          />

        </div>

      </div>

    </div>
  );
}