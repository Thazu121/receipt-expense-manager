import { useState } from "react";
import { Eye, EyeOff, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../layout/ThemeToggle"
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
    const isLight = useSelector((state) => state.theme.isLight);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
  
      <main className="flex items-center justify-center px-4 py-16">
            <div
        className={`w-full max-w-md rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 ${
          isLight
            ? "bg-white shadow-xl border-gray-200"
            : "bg-[#0b2a1a]/80 border-white/10 shadow-2xl"
        }`}
      >

        {/* <div className="w-full max-w-md bg-green-950/40 border border-green-900/40 rounded-2xl p-8 shadow-xl backdrop-blur"> */}
          <h1 className="text-3xl font-bold text-center mb-2">
            Create an account
          </h1>
            <p
          className={`text-center mb-8 ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
            Start managing your expenses smarter today.
        </p>
        

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
   className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
 className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
 className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  
                  className="absolute right-3 top-1/2 -translate-y-1/2 block text-sm mb-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
 className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 "
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition">
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-green-700 text-sm">
            <div className="flex-1 h-px bg-green-900" />
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-green-900" />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-green-900 rounded-lg py-2 hover:bg-green-900/40">
  <FcGoogle size={22} />
  Google
            </button>
            
          </div>

          <p className="text-center text-green-400 mt-6">
            Already have an account?{" "}
            <Link to="/login"
             className="text-green-500 font-semibold cursor-pointer hover:underline">
              Sign In
            </Link>
          </p>
        {/* </div> */}
        </div>

      </main>

  )
}
