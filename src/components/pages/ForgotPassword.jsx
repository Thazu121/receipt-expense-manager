import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetPassword,
  clearMessages,
} from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } =
    useSelector((state) => state.auth);

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const [step, setStep] = useState(1);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearMessages());

    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success && step === 1) {
      setStep(2);
    }

    if (
      success &&
      success.toLowerCase().includes("password")
    ) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate, step]);

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    }

    if (step === 2) {
      if (
        !form.newPassword ||
        form.newPassword.length < 8
      ) {
        newErrors.newPassword =
          "Password must be at least 8 characters";
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (step === 1) {
      dispatch(
        forgotPassword({
          email: form.email.trim(),
        })
      );
    } else {
      dispatch(
        resetPassword({
          email: form.email.trim(),
          newPassword:
            form.newPassword,
        })
      );
    }
  };

  return (
    <div
      className={`
        min-h-screen
        flex
        items-center
        justify-center
        px-4

        ${
          isLight
            ? "bg-gray-100"
            : "bg-gradient-to-br from-emerald-950 via-emerald-900 to-black"
        }
      `}
    >
      <div
        className={`
          w-full
          max-w-md

          rounded-3xl
          p-8

          transition-all

          ${
            isLight
              ? "bg-white shadow-xl"
              : "bg-white/5 backdrop-blur-xl border border-white/10"
          }
        `}
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          Forgot Password
        </h2>

        <p
          className="
            text-center
            text-sm
            text-gray-500
            dark:text-gray-400
            mb-6
          "
        >
          {step === 1
            ? "Enter your email address"
            : "Create a new password"}
        </p>

        {error && (
          <div
            className="
              mb-4
              rounded-xl
              bg-red-100
              text-red-600
              p-3
              text-sm
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
              mb-4
              rounded-xl
              bg-green-100
              text-green-600
              p-3
              text-sm
            "
          >
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <Mail
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="email"
              placeholder="Email"
              disabled={step === 2}
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
              className="
                w-full
                pl-10
                pr-4
                py-3

                rounded-xl

                border
                border-gray-300

                bg-gray-50

                focus:outline-none
                focus:ring-2
                focus:ring-emerald-500
              "
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}

          {step === 2 && (
            <>
              <div className="relative">
                <Lock
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type={
                    showNew
                      ? "text"
                      : "password"
                  }
                  placeholder="New Password"
                  value={
                    form.newPassword
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newPassword:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    pl-10
                    pr-10
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew(
                      !showNew
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                  "
                >
                  {showNew ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {
                    errors.newPassword
                  }
                </p>
              )}

              <div className="relative">
                <Lock
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={
                    form.confirmPassword
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    pl-10
                    pr-10
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(
                      !showConfirm
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                  "
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {
                    errors.confirmPassword
                  }
                </p>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3

              rounded-xl

              bg-emerald-500
              hover:bg-emerald-600

              text-white
              font-semibold

              transition
            "
          >
            {loading
              ? "Please wait..."
              : step === 1
              ? "Send Reset Link"
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
