import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearMessages } from "../../redux/features/authSlice";

export default function SignUp() {
  const isLight = useSelector((state) => state.theme.isLight);
  const { error, success, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

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

  // ---------------- PASSWORD STRENGTH ----------------
  const calculateStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[@$!%*?&]/.test(value)) score++;

    return score;
  };

  const getStrengthData = (score) => {
    if (!password) return { text: "", color: "", width: "0%" };

    if (score <= 2)
      return { text: "Weak", color: "bg-red-500", width: "33%" };

    if (score <= 4)
      return { text: "Medium", color: "bg-yellow-500", width: "66%" };

    return { text: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = calculateStrength(password);
  const strengthData = getStrengthData(strength);

  // ---------------- REDIRECT ----------------
  useEffect(() => {
    if (success || isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [success, isAuthenticated, navigate]);

  // ---------------- CLEAR MESSAGES ----------------
  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const isFormValid =
    name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8 &&
    password === confirmPassword &&
    strength >= 3;

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmErr("");

    if (name.trim().length < 3) {
      setNameErr("Name must be at least 3 characters");
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter valid email");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmErr("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    dispatch(
      signup({
        name: name.trim(),
        email: email.trim(),
        password,
      })
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center p-12 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to SpendWise
            </h2>
            <p className="text-lg opacity-90">
              Track your expenses smarter.
              <br />
              Save more. Live better.
            </p>
          </div>
        </div>

        <div
          className={`w-full md:w-1/2 p-6 sm:p-8 md:p-10 transition-all duration-300 ${
            isLight ? "bg-white text-black" : "bg-[#0b2a1a] text-white"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Create an account
          </h1>

          {error && (
            <p className="text-red-500 text-center text-sm mb-4">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 text-center text-sm mb-4">
              {success}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameErr("");
                  dispatch(clearMessages());
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black"
                placeholder="Enter your name"
              />
              {nameErr && <p className="text-red-500 text-sm">{nameErr}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr("");
                  dispatch(clearMessages());
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black"
                placeholder="name@email.com"
              />
              {emailErr && <p className="text-red-500 text-sm">{emailErr}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErr("");
                    dispatch(clearMessages());
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black"
                  placeholder="Minimum 8 characters"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-300 rounded">
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
                <p className="text-red-500 text-sm">{passwordErr}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmErr("");
                    dispatch(clearMessages());
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black"
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {confirmErr && (
                <p className="text-red-500 text-sm">{confirmErr}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                !isFormValid || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}