import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearMessages } from "../../redux/features/authSlice";

export default function SignUp() {
  const isLight = useSelector((state) => state.theme.isLight);
  const { error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const [strength, setStrength] = useState(0);

  /* ================= PASSWORD STRENGTH ================= */

  const calculateStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[@$!%*?&]/.test(value)) score++;
    return score;
  };

  const getStrengthData = () => {
    if (!password)
      return { text: "", color: "", width: "0%" };

    if (strength <= 2)
      return { text: "Weak", color: "bg-red-500", width: "33%" };
    if (strength <= 4)
      return { text: "Medium", color: "bg-yellow-500", width: "66%" };
    return { text: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strengthData = getStrengthData();

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate("/login"), 1500);
    }

    return () => {
      dispatch(clearMessages());
    };
  }, [success, navigate, dispatch]);

  /* ================= VALIDATION ================= */

  const validate = () => {
    let valid = true;

    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmErr("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setNameErr("Name is required");
      valid = false;
    } else if (trimmedName.length < 3) {
      setNameErr("Name must be at least 3 characters");
      valid = false;
    }

    if (!trimmedEmail) {
      setEmailErr("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailErr("Enter valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordErr("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmErr("Confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmErr("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(
      signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      })
    );
  };

  const isFormValid =
    name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8 &&
    password === confirmPassword &&
    strength >= 3;

  /* ================= UI ================= */

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
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

          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-center mb-4 font-medium">
              {success}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* NAME */}
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameErr) setNameErr("");
                }}
                type="text"
                placeholder="Enter your Name"
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }`}
              />
              {nameErr && (
                <p className="text-red-500 text-sm mt-1">
                  {nameErr}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailErr) setEmailErr("");
                }}
                type="email"
                placeholder="name@company.com"
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }`}
              />
              {emailErr && (
                <p className="text-red-500 text-sm mt-1">
                  {emailErr}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setStrength(calculateStrength(value));
                    if (passwordErr) setPasswordErr("");
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  className={`w-full px-4 py-3 rounded-lg outline-none ${
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

              {password && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-300 rounded">
                    <div
                      className={`h-2 rounded ${strengthData.color}`}
                      style={{ width: strengthData.width }}
                    />
                  </div>
                  <p className="text-xs mt-1">
                    Strength: {strengthData.text}
                  </p>
                </div>
              )}

              {passwordErr && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErr}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmErr) setConfirmErr("");
                  }}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 rounded-lg outline-none ${
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

              {confirmErr && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmErr}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold text-white ${
                !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
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
