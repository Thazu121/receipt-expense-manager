import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignUp() {
  const isLight = useSelector((state) => state.theme.isLight)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmError, setConfirmError] = useState("")
  const [formError, setFormError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

const calculateStrength = (value) => {
  let score = 0

  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[a-z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[@$!%*?&]/.test(value)) score++

  return score
}

const getStrengthData = () => {
  if (strength <= 2)
    return { text: "Weak", color: "bg-red-500", width: "33%" }

  if (strength <= 4)
    return { text: "Medium", color: "bg-yellow-500", width: "66%" }

  return { text: "Strong", color: "bg-green-500", width: "100%" }
}

const strengthData = getStrengthData()

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError("")
    setNameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmError("")
    setSuccessMessage("")

    if (!name && !email && !password && !confirmPassword) {
      setFormError("All fields are required");
      return
    }

    let isValid = true

    if (!name.trim()) {
      setNameError("Name is required")
      isValid = false
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters")
      isValid = false
    }

    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
      const hasSpecialChar = /[@$!%*?&]/.test(password)
      const isLongEnough = password.length >= 8

      if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        setPasswordError(
          "Password must be 8+ characters and include uppercase, lowercase, number & special character"
        )
        isValid = false
      }
    }


    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    setSuccessMessage("Account created successfully 🎉")

    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }


  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl">

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

        <div
          className={`w-full md:w-1/2 p-10 transition-all duration-300 ${isLight
              ? "bg-white text-black"
              : "bg-[#0b2a1a] text-white"
            }`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Create an account
          </h1>

          <p className="text-red-600 text-center mb-4 font-medium">
            {formError}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your Name"
                className={`w-full px-4 py-3 rounded-lg outline-none transition ${isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                  }`}
              />
              <p className="text-red-600 text-sm mt-1">{nameError}</p>
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-lg outline-none transition ${isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                  }`}
              />
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            </div>

           <div>
  <label className="block text-sm mb-2">Password</label>

  <div className="relative">
    <input
      value={password}
      onChange={(e) => {
        const value = e.target.value;
        setPassword(value);
        setStrength(calculateStrength(value));
      }}
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

  <p className="text-red-600 text-sm mt-1">{passwordError}</p>

  {password && (
    <div className="mt-3 space-y-2">
      <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthData.color}`}
          style={{ width: strengthData.width }}
        />
      </div>

      <p
        className={`text-sm font-medium ${
          strengthData.text === "Weak"
            ? "text-red-500"
            : strengthData.text === "Medium"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        {strengthData.text} Password
      </p>
    </div>
  )}
</div>


            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 rounded-lg outline-none transition ${isLight
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
              <p className="text-red-600 text-sm mt-1">{confirmError}</p>
            </div>

            <button
  type="submit"
  disabled={strength < 3}
  className={`w-full py-3 rounded-lg font-semibold transition text-white ${
    strength < 3
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-500 hover:bg-green-600"
  }`}
>
  Create Account
</button>

          </form>

          <p className="text-green-600 text-center mt-4 font-medium">
            {successMessage}
          </p>

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
  )
}
