import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  login,
  clearMessages,
} from "../../redux/features/authSlice";

export default function Login() {
  const isLight = useSelector((state) => state.theme.isLight);

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const validate = () => {
    let valid = true;

    setEmailErr("");
    setPasswordErr("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailErr("Enter valid email");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(
      login({
        email: email.trim(),
        password,
      })
    );
  };

  const isFormValid =
    /^\S+@\S+\.\S+$/.test(email) && password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6">
      <div
        className={`
          w-full
          max-w-md
          sm:max-w-lg
          rounded-2xl
          p-6
          sm:p-8
          transition-all
          ${
            isLight
              ? "bg-white shadow-xl"
              : "bg-[#0b2a1a]/80 border border-white/10 text-white"
          }
        `}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p
          className={`text-center text-sm mb-6 ${
            isLight ? "text-gray-500" : "text-gray-300"
          }`}
        >
          Login to continue
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
                dispatch(clearMessages());
              }}
              className={`
                w-full
                px-4
                py-3
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-green-500
                ${
                  isLight
                    ? "bg-gray-100 text-black"
                    : "bg-white/5 border border-white/10 text-white"
                }
              `}
            />

            {emailErr && (
              <p className="text-red-500 text-sm mt-1">
                {emailErr}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr("");
                dispatch(clearMessages());
              }}
              className={`
                w-full
                px-4
                py-3
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-green-500
                ${
                  isLight
                    ? "bg-gray-100 text-black"
                    : "bg-white/5 border border-white/10 text-white"
                }
              `}
            />

            {passwordErr && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErr}
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

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`
              w-full
              py-3
              rounded-lg
              font-semibold
              text-white
              transition
              ${
                !isFormValid || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }
            `}
          >
            {loading ? "Logging in..." : "Login"}
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