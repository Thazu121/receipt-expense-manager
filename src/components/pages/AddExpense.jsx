import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addReceipt } from "../../redux/features/receiptSlice"

export default function AddExpense() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

    // Clear form
    setForm({
      store: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0]
    })

    // Redirect after 1.5 seconds
    setTimeout(() => {
      navigate("../expense")
    }, 1500)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-white/5 
                    p-8 rounded-2xl border 
                    border-gray-200 dark:border-white/10 transition">

      <h2 className="text-2xl font-bold mb-6">
        Add Expense
      </h2>

      {/* ✅ Success Message */}
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700">
          ✅ Receipt Saved Successfully!
        </div>
      )}

      {/* ❌ Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="store"
          placeholder="Store / Merchant"
          value={form.store}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border 
                     border-gray-300 dark:border-white/10 
                     bg-white dark:bg-transparent"
        />

      <input
  type="text"
  name="amount"
  placeholder="Amount"
  value={form.amount}
  onChange={(e) => {
    const value = e.target.value

    // Allow only digits and optional decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setForm({ ...form, amount: value })
    }
  }}
  className="w-full p-3 rounded-xl border 
             border-gray-300 dark:border-white/10 
             bg-white dark:bg-transparent"
/>


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border 
                     border-gray-300 dark:border-white/10 
                     bg-white dark:bg-transparent"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border 
                     border-gray-300 dark:border-white/10 
                     bg-white dark:bg-transparent"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 
                     text-white py-3 rounded-xl 
                     font-semibold transition"
        >
          Save Expense
        </button>

      </form>
    </div>
  )
}
