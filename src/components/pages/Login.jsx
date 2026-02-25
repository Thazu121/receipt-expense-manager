import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


export default function Login() {
  const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isSucess, setIsSucess] = useState(false)
    const [nameErr, setNameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [err, setErr] = useState("")
  const isLight = useSelector((state) => state.theme.isLight);
  const handleSubmit =(ev )=> {
    ev.preventDefault()
     setIsSucess(false)
        setEmailErr("")
        setNameErr("")
        setErr("")
        // if(name.trim()===" " && email.trim()=== "" )
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div
        className={`w-full max-w-md rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 ${
          isLight
            ? "bg-white shadow-xl border-gray-200"
            : "bg-[#0b2a1a]/80 border-white/10 shadow-2xl"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p
          className={`text-center mb-8 ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Login to continue managing your expenses
        </p>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
            on
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-green-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition text-white"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p
          className={`text-center mt-6 text-sm ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
