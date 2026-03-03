import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, clearMessages } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const isLight = useSelector((state) => state.theme.isLight);
  const { error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};
    const trimmedEmail = form.email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Enter valid email address";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword =
        "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      resetPassword({
        email: form.email.trim(),
        newPassword: form.newPassword,
      })
    );
  };

  const isFormValid =
    form.email.trim() &&
    form.newPassword.length >= 8 &&
    form.newPassword === form.confirmPassword;

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
          Reset Password
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-center mb-3">
            {success}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
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

          {/* NEW PASSWORD */}
          <div>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
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

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
