import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, clearMessages } from "../../redux/features/authSlice";

export default function Login() {
  const isLight = useSelector((state) => state.theme.isLight);
  const { isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated)
      navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const validate = () => {
    let newErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter valid email";

    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(login({ email, password }));
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

        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg outline-none ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className={`w-full px-4 py-3 rounded-lg outline-none ${
                isLight
                  ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                  : "bg-white/5 border border-white/10 focus:border-green-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

            <div className="text-right mt-2">
              <Link
                to="/login/forgot-password"
                className="text-sm text-green-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
