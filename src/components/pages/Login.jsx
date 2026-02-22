import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sun } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1f14] via-[#0e2b1b] to-[#08150e] text-white">
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <div className="h-9 w-9 rounded-lg bg-green-500 flex items-center justify-center font-bold text-black">
            S
          </div>
          SpendWise
        </div>

        <div className="flex items-center gap-6 text-sm">
          <span className="text-gray-300">
            New to SpendWise?{" "}
            <span className="text-green-400 font-medium cursor-pointer">
              Create an account
            </span>
          </span>
          <button className="h-9 w-9 rounded-full border border-green-500/40 flex items-center justify-center">
            <Sun size={18} className="text-green-400" />
          </button>
        </div>
      </header>

      <main className="flex items-center justify-center mt-16">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
          <h1 className="text-2xl text-center font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-center text-gray-400 mb-6">
            Please enter your details to sign in.
          </p>

          <button className="w-full flex items-center justify-center gap-3 border border-green-500/30 rounded-lg py-3 mb-6 hover:bg-green-500/10 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="h-5 w-5"
            />
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
            <div className="h-px bg-white/10 flex-1" />
            OR CONTINUE WITH
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <label className="text-sm text-gray-300">Email Address</label>
          <div className="relative mt-1 mb-4">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <label className="text-sm text-gray-300">Password</label>
          <div className="relative mt-1 mb-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="text-right text-sm text-green-400 mb-6 cursor-pointer">
            Forgot password?
          </div>

          <button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-lg transition">
            Sign In
          </button>
        </div>
      </main>

      <footer className="mt-10 flex justify-center gap-6 text-xs text-gray-400">
        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
        <span className="cursor-pointer hover:text-white">Terms of Service</span>
        <span className="cursor-pointer hover:text-white">Contact Support</span>
      </footer>
    </div>
  )
}
