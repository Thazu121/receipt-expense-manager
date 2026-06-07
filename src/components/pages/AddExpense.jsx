import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

import {
  addReceipt,
} from "../../redux/features/receiptSlice";

import API from "../../api/api";

export default function AddExpense() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();



  const categories = [
    "Food",
    "Grocery",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment",
    "Medical",
    "General",
  ];



  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");



  const [form, setForm] =
    useState({

      store: "",

      amount: "",

      category: "",

      date:
        new Date()
          .toISOString()
          .split("T")[0],
    });




  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    });

  };



const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!form.store.trim()) {
    setError("Merchant name is required");
    return;
  }

  if (!form.amount || Number(form.amount) <= 0) {
    setError("Enter valid amount");
    return;
  }

  try {
    setLoading(true);

    await API.post("/expenses", {
      title: form.store.trim(),
      merchant: form.store.trim(),
      amount: Number(form.amount),
      category: form.category || "General",
      expenseDate: form.date,
      source: "manual",
    });

    setSuccess(true);

    setForm({
      store: "",
      amount: "",
      category: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    setTimeout(() => {
      navigate("/dashboard/expense");
    }, 1200);

  } catch (err) {
  console.log("SAVE ERROR:", err);
  console.log("RESPONSE:", err?.response?.data);

  setError(
    err?.response?.data?.message ||
    err?.message ||
    "Failed to save expense"
  );
}finally {
    setLoading(false);
  }
};

  return (

    <div
      className="
        min-h-screen

        px-3
        py-5

        sm:px-5
        sm:py-8

        lg:px-8

        bg-gradient-to-br
        from-emerald-50
        to-white

        dark:from-black
        dark:via-[#07130f]
        dark:to-gray-900
      "
    >



      <button

        onClick={() =>
          navigate(-1)
        }

        className="
          flex
          items-center
          gap-2

          mb-6

          text-sm
          sm:text-base

          text-gray-600
          dark:text-gray-300

          hover:text-emerald-600

          transition
        "
      >

        <ArrowLeft size={18} />

        Back

      </button>




      <div
        className="
          max-w-2xl
          mx-auto

          rounded-3xl

          border
          border-gray-200
          dark:border-white/10

          bg-white
          dark:bg-white/5

          backdrop-blur-xl

          p-5
          sm:p-8

          shadow-xl
        "
      >



        <div className="mb-8">

          <h1
            className="
              text-2xl
              sm:text-3xl

              font-bold

              text-center
            "
          >
            Add Expense
          </h1>

          <p
            className="
              mt-2

              text-center

              text-sm
              sm:text-base

              text-gray-500
              dark:text-gray-400
            "
          >
            Track and manage
            your spending
          </p>

        </div>




        {success && (

          <div
            className="
              mb-5

              rounded-2xl

              bg-green-100
              dark:bg-green-500/20

              px-4
              py-3

              text-center

              text-sm
              sm:text-base

              text-green-700
              dark:text-green-400
            "
          >
            ✅ Expense saved
            successfully
          </div>
        )}




        {error && (

          <div
            className="
              mb-5

              rounded-2xl

              bg-red-100
              dark:bg-red-500/20

              px-4
              py-3

              text-center

              text-sm
              sm:text-base

              text-red-600
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}




        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
          "
        >



          <div>

            <label
              className="
                mb-2
                block

                text-sm
                font-medium
              "
            >
              Merchant *
            </label>

            <input
              type="text"
              name="store"
              value={form.store}
              onChange={handleChange}
              placeholder="Enter merchant name"
              className="
                w-full

                rounded-2xl

                border
                border-gray-300
                dark:border-white/10

                bg-white
                dark:bg-transparent

                px-4
                py-3

                text-sm
                sm:text-base

                outline-none

                focus:ring-2
                focus:ring-emerald-500
              "
            />

          </div>




          <div>

            <label
              className="
                mb-2
                block

                text-sm
                font-medium
              "
            >
              Amount *
            </label>

            <div className="relative">

              <span
                className="
                  absolute

                  left-4
                  top-1/2
                  -translate-y-1/2

                  text-gray-500
                "
              >
                ₹
              </span>

              <input
                type="text"
                name="amount"
                value={form.amount}
                placeholder="0.00"
                onChange={(e) => {

                  const value =
                    e.target.value;

                  if (
                    /^\d*\.?\d*$/.test(value)
                  ) {

                    setForm({

                      ...form,

                      amount: value,
                    });
                  }
                }}
                className="
                  w-full

                  rounded-2xl

                  border
                  border-gray-300
                  dark:border-white/10

                  bg-white
                  dark:bg-transparent

                  pl-9
                  pr-4
                  py-3

                  text-sm
                  sm:text-base

                  outline-none

                  focus:ring-2
                  focus:ring-emerald-500
                "
              />

            </div>

          </div>




          <div
            className="relative"
            tabIndex={0}
            onBlur={() =>
              setOpen(false)
            }
          >

            <label
              className="
                mb-2
                block

                text-sm
                font-medium
              "
            >
              Category
            </label>

            <button
              type="button"
              onClick={() =>
                setOpen(!open)
              }
              className="
                w-full

                rounded-2xl

                border
                border-gray-300
                dark:border-white/10

                bg-white
                dark:bg-white/5

                px-4
                py-3

                text-left

                flex
                items-center
                justify-between

                text-sm
                sm:text-base
              "
            >

              <span>
                {form.category ||
                  "Select Category"}
              </span>

              <ChevronDown
                size={18}
              />

            </button>



            {open && (

              <div
                className="
                  absolute
                  z-50

                  mt-2

                  w-full

                  overflow-hidden

                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-white
                  dark:bg-[#0f1720]

                  shadow-xl
                "
              >

                {categories.map(
                  (cat) => (

                    <button
                      type="button"
                      key={cat}
                      onClick={() => {

                        setForm({

                          ...form,

                          category: cat,
                        });

                        setOpen(false);
                      }}
                      className="
                        w-full

                        px-4
                        py-3

                        text-left

                        text-sm
                        sm:text-base

                        hover:bg-emerald-100
                        dark:hover:bg-emerald-500/20

                        transition
                      "
                    >
                      {cat}
                    </button>
                  )
                )}

              </div>
            )}

          </div>




          <div>

            <label
              className="
                mb-2
                block

                text-sm
                font-medium
              "
            >
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="
                w-full

                rounded-2xl

                border
                border-gray-300
                dark:border-white/10

                bg-white
                dark:bg-transparent

                px-4
                py-3

                text-sm
                sm:text-base

                outline-none

                focus:ring-2
                focus:ring-emerald-500
              "
            />

          </div>




          <button
            type="submit"
            disabled={loading}
            className="
              w-full

              rounded-2xl

              bg-emerald-600
              hover:bg-emerald-700

              py-3

              text-sm
              sm:text-base

              font-semibold
              text-white

              transition-all

              active:scale-[0.98]

              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Saving..."
              : "Save Expense"}

          </button>

        </form>

      </div>

    </div>
  );
}