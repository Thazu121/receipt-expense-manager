import { useSelector } from "react-redux"
import { useState } from "react"
import ExpenseHeader from "../expenses/ExpenseHeader"
import ExpenseStats from "../expenses/ExpenseStats"
import ExpenseFilters from "../expenses/ExpenseFilters"
import ExpenseTable from "../expenses/ExpenseTable"
export default function Expenses() {
  const isLight = useSelector((state) => state.theme.isLight);
  const [search, setSearch] = useState("");

  return (
    <div
      className={`
        min-h-screen p-4 sm:p-6 transition-colors duration-300
        
        ${
          isLight
            ? "bg-green-50 sm:bg-gray-100 lg:bg-gray-200 text-gray-900"
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
      <div className="max-w-7xl mx-auto">
        <ExpenseHeader />
        <ExpenseStats />

        <ExpenseFilters
          search={search}
          setSearch={setSearch}
        />

        <ExpenseTable search={search} />
      </div>
    </div>
  );
}
