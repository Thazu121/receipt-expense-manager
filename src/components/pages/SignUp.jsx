import { useState } from "react";
import { Eye, EyeOff, Sun } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08180f] via-[#0d2a1a] to-[#08180f] text-white">
      <header className="flex items-center justify-between px-8 py-4 border-b border-green-900/40">
        <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
          <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-black">
            💳
          </div>
          SpendWise
        </div>
        <button className="p-2 rounded-lg bg-green-900/40 hover:bg-green-900">
          <Sun className="w-5 h-5 text-green-400" />
        </button>
      </header>

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-green-950/40 border border-green-900/40 rounded-2xl p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create an account
          </h1>
          <p className="text-center text-green-400 mb-8">
            Start managing your expenses smarter today.
          </p>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="text-sm text-green-300">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg bg-green-950 border border-green-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-green-300">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="mt-1 w-full rounded-lg bg-green-950 border border-green-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-green-300">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-lg bg-green-950 border border-green-900 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-green-300">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  className="w-full rounded-lg bg-green-950 border border-green-900 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 text-green-700 text-sm">
            <div className="flex-1 h-px bg-green-900" />
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-green-900" />
          </div>

          {/* OAuth */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-green-900 rounded-lg py-2 hover:bg-green-900/40">
              <span className="text-lg">G</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-green-900 rounded-lg py-2 hover:bg-green-900/40">
              🏛 SSO
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-green-400 mt-6">
            Already have an account?{" "}
            <span className="text-green-500 font-semibold cursor-pointer">
              Sign In
            </span>
          </p>
        </div>
      </main>

      <footer className="text-center text-green-700 text-sm py-6">
        © 2024 SpendWise Inc. · Privacy Policy · Terms of Service
      </footer>
    </div>
  )
}
