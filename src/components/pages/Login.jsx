import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../redux/features/authSlice"

export default function Login() {
  const isLight = useSelector((state) => state.theme.isLight);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [formErr, setFormErr] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // 🔒 Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailErr("");
    setPasswordErr("");
    setFormErr("");
    setIsSuccess(false);

    let isValid = true;

    if (!email.trim()) {
      setEmailErr("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailErr("Enter valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordErr("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!existingUser) {
      setFormErr("Invalid email or password");
      return;
    }

    // 🔐 Update Redux + localStorage
    dispatch(login(existingUser));

    setIsSuccess(true);

    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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

        {formErr && (
          <p className="text-red-500 text-center mb-3">{formErr}</p>
        )}

        {isSuccess && (
          <p className="text-green-500 text-center mb-3">
            Login successful 🎉
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
            {emailErr && (
              <p className="text-red-500 text-sm mt-1">{emailErr}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg outline-none transition ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
            {passwordErr && (
              <p className="text-red-500 text-sm mt-1">{passwordErr}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition text-white"
          >
            Login
          </button>
        </form>

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
