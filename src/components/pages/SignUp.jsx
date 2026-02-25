import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignUp() {
  const isLight = useSelector((state) => state.theme.isLight);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setFormError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    let isValid = true;

    // If all empty
    if (!name && !email && !password && !confirmPassword) {
      setFormError("All fields are required");
    }

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    alert("Account created successfully 🎉");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center p-12 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to SpendWise
            </h2>
            <p className="text-lg opacity-90">
              Track your expenses smarter. <br />
              Save more. Live better.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`w-full md:w-1/2 p-10 transition-all duration-300 ${
            isLight
              ? "bg-white text-black"
              : "bg-[#0b2a1a] text-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Create an account
          </h1>

          {/* 🔥 SAME AS YOUR CODE */}
          <p className="text-red-600 text-center mb-4 font-medium">
            {formError && formError}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }`}
              />
              <p className="text-red-600 text-sm mt-1">
                {nameError && nameError}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }`}
              />
              <p className="text-red-600 text-sm mt-1">
                {emailError && emailError}
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                    isLight
                      ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                      : "bg-white/5 border border-white/10 focus:border-green-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-red-600 text-sm mt-1">
                {passwordError && passwordError}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                    isLight
                      ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                      : "bg-white/5 border border-white/10 focus:border-green-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-red-600 text-sm mt-1">
                {confirmError && confirmError}
              </p>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition">
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
