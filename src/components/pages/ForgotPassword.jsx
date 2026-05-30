import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  forgotPassword,
  resetPassword,
  clearMessages,
} from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const isLight = useSelector((state) => state.theme.isLight);
  const { error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  // 1 = email, 2 = reset password

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------- CLEAR ----------------
  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  // ---------------- REDIRECT ----------------
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [success, navigate]);

  // ---------------- VALIDATE ----------------
  const validate = () => {
    let err = {};

    if (!form.email.trim()) {
      err.email = "Email required";
    }

    if (step === 2) {
      if (!form.newPassword || form.newPassword.length < 8) {
        err.newPassword = "Min 8 characters";
      }

      if (form.newPassword !== form.confirmPassword) {
        err.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (step === 1) {
      dispatch(forgotPassword({ email: form.email.trim() }));
      setStep(2);
    } else {
      dispatch(
        resetPassword({
          email: form.email.trim(),
          newPassword: form.newPassword,
        })
      );
    }
  };

  const isFormValid =
    form.email.trim() &&
    (step === 1 ||
      (form.newPassword.length >= 8 &&
        form.newPassword === form.confirmPassword));

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div
        className={`w-full max-w-md rounded-2xl p-8 transition ${
          isLight
            ? "bg-white shadow-xl"
            : "bg-[#0b2a1a]/80 border border-white/10"
        }`}
      >

        <h2 className="text-3xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        {/* ERROR / SUCCESS */}
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

          {/* STEP 1 EMAIL */}
          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            disabled={step === 2}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-gray-100"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}

          {/* STEP 2 PASSWORD */}
          {step === 2 && (
            <>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword}
                </p>
              )}

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-3 top-3"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {step === 1 ? "Send Reset Link" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}