import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { addReceipt } from "../../redux/features/receiptSlice"

export default function AddExpense() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categories = [
    "Food",
    "Grocery",
    "Transport",
    "Bills",
    "Shopping",
    "General"
  ]

  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    store: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0]
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.store || !form.amount) {
      setError("Please fill required fields")
      return
    }

    dispatch(
      addReceipt({
        id: Date.now(),
        ...form,
        amount: Number(form.amount)
      })
    )

    setError("")
    setSuccess(true)

    setTimeout(() => {
      navigate("../expense")
    }, 1200)
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:py-10 
                    bg-gradient-to-br from-emerald-50 to-white 
                    dark:from-black dark:to-gray-900">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 
                   hover:text-emerald-600 transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-xl mx-auto 
                      bg-white dark:bg-white/5 
                      backdrop-blur-xl
                      p-6 sm:p-8 
                      rounded-3xl shadow-xl 
                      border border-gray-200 
                      dark:border-white/10">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Add Expense
        </h2>

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 text-center">
            ✅ Expense Saved Successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Merchant */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Merchant *
            </label>
            <input
              type="text"
              name="store"
              value={form.store}
              onChange={handleChange}
              placeholder="Enter Merchant name"
              className="w-full p-3 rounded-xl border
                         border-gray-300 dark:border-white/10
                         bg-white dark:bg-transparent
                         focus:outline-none focus:ring-2 
                         focus:ring-emerald-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Amount (INR) *
            </label>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="text"
                name="amount"
                value={form.amount}
                placeholder="0.00"
                onChange={(e) => {
                  const value = e.target.value
                  if (/^\d*\.?\d*$/.test(value)) {
                    setForm({ ...form, amount: value })
                  }
                }}
                className="w-full pl-8 p-3 rounded-xl border
                           border-gray-300 dark:border-white/10
                           bg-white dark:bg-transparent
                           focus:outline-none focus:ring-2 
                           focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div
            className="relative"
            tabIndex={0}
            onBlur={() => setOpen(false)}
          >
            <label className="block mb-1 text-sm font-medium">
              Category
            </label>

            <div
              onClick={() => setOpen(!open)}
              className="w-full p-3 rounded-xl border cursor-pointer
                         border-gray-300 bg-white text-gray-800
                         dark:border-white/10 dark:bg-white/5 dark:text-white
                         flex justify-between items-center"
            >
              {form.category || "Select Category"}
              <span className="text-sm">▼</span>
            </div>

            {open && (
              <div
                className="absolute w-full mt-2 rounded-xl shadow-lg z-50
                           border border-gray-200
                           bg-white text-gray-800
                           dark:bg-gray-900 dark:text-white dark:border-white/10"
              >
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setForm({ ...form, category: cat })
                      setOpen(false)
                    }}
                    className="px-4 py-2 cursor-pointer
                               hover:bg-emerald-100
                               dark:hover:bg-emerald-600/20"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border
                         border-gray-300 bg-white text-gray-800
                         dark:bg-transparent dark:text-white
                         dark:border-white/20
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 
                       hover:bg-emerald-700 
                       active:scale-95
                       text-white py-3 rounded-xl 
                       font-semibold transition-all duration-200"
          >
            Save Expense
          </button>

        </form>
      </div>
    </div>
  )
}
