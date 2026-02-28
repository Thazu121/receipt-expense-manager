import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function ExpenseHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
      
      <div>
        <h1 className="text-4xl font-bold">Expenses</h1>
        <p className="text-gray-400 mt-2">
          Manage and track your personal spending with ease.
        </p>
      </div>

      <Link
        to="/dashboard/add-expense"
        className="flex items-center gap-2 
                   bg-emerald-500 hover:bg-emerald-600 
                   px-6 py-3 rounded-xl 
                   font-semibold transition text-white"
      >
        <Plus size={18} />
        Add Expense
      </Link>

    </div>
  )
}
