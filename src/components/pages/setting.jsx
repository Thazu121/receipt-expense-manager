import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Bell,
  Moon,
  Sun,
  User,
  Lock,
  LogOut,
  Trash2,
  Shield,
} from "lucide-react";

import {
  updateUsername,
  changePassword,
  logout,
  deleteAccount,
  updateProfilePhoto,
  clearMessages,
} from "../../redux/features/authSlice";

import {
  toggleNotifications,
} from "../../redux/features/settingSlice";

import {
  toggleTheme,
} from "../../redux/features/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const {
    user,
    error,
    success,
    loading,
  } = useSelector((state) => state.auth);

  const {
    notificationsEnabled,
  } = useSelector((state) => state.settings);

  const isLight = useSelector(
    (state) => state.theme.isLight
  );

  const [username, setUsername] =
    useState(user?.name || "");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [localError, setLocalError] =
    useState("");

  const message =
    localError || error || success;

  const isError =
    Boolean(localError || error);

  useEffect(() => {
    setUsername(user?.name || "");
  }, [user?.name]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
      setLocalError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  useEffect(() => {
    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [success]);

  const strengthCheck = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        label: "Weak",
        color: "bg-red-500",
        width: "33%",
      };
    }

    if (score <= 3) {
      return {
        label: "Medium",
        color: "bg-yellow-500",
        width: "66%",
      };
    }

    return {
      label: "Strong",
      color: "bg-green-500",
      width: "100%",
    };
  };

  const strength =
    strengthCheck(newPassword);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    dispatch(updateProfilePhoto(file));

    e.target.value = "";
  };

  const handleUpdateUsername = () => {
    setLocalError("");

    if (!username.trim()) {
      setLocalError("Username is required");
      return;
    }

    dispatch(updateUsername(username.trim()));
  };

  const handleUpdatePassword = () => {
    setLocalError("");

    if (!currentPassword) {
      setLocalError("Current password is required");
      return;
    }

    if (!newPassword) {
      setLocalError("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(
      changePassword({
        currentPassword,
        newPassword,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", {
      replace: true,
    });
  };

  const handleDeleteAccount = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

    if (!confirmDelete) return;

    await dispatch(deleteAccount());

    navigate("/signup", {
      replace: true,
    });
  };

  return (
    <div
      className={`
        min-h-screen
        px-4
        py-6
        sm:px-6
        lg:px-8
        transition
        ${isLight
          ? "bg-gradient-to-br from-[#f2fff9] via-[#e6fff3] to-[#dbffec] text-gray-900"
          : "bg-gradient-to-br from-[#031a13] via-[#042e1e] to-[#001d13] text-white"
        }
      `}
    >
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >
        <div
          className="
            space-y-6
            order-2
            lg:order-1
          "
        >
          <section
            className={`
              rounded-3xl
              p-6
              shadow-xl
              border
              ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="
                      w-full
                      h-full
                      rounded-full
                      object-cover
                      border-4
                      border-emerald-500
                    "
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-full
                      rounded-full
                      bg-emerald-600
                      flex
                      items-center
                      justify-center
                      text-3xl
                      font-bold
                      text-white
                      border-4
                      border-emerald-500
                    "
                  >
                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    fileRef.current?.click()
                  }
                  className="
                    absolute
                    -bottom-1
                    -right-1
                    w-10
                    h-10
                    rounded-full
                    bg-emerald-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    hover:bg-emerald-700
                  "
                >
                  <Camera size={18} />
                </button>
              </div>

              <input
                type="file"
                ref={fileRef}
                onChange={handlePhoto}
                accept="image/*"
                className="hidden"
              />

              <h2 className="mt-4 text-xl font-bold">
                {user?.name || "User"}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
                {user?.email || ""}
              </p>
            </div>
          </section>

          <section
            className={`
              rounded-3xl
              p-6
              shadow-xl
              border
              space-y-4
              ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <h3 className="font-bold text-lg">
              Preferences
            </h3>

            <SettingButton
              icon={
                isLight ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )
              }
              title="Theme"
              value={isLight ? "Light" : "Dark"}
              onClick={() => dispatch(toggleTheme())}
              isLight={isLight}
            />

            <SettingButton
              icon={<Bell size={18} />}
              title="Notifications"
              value={
                notificationsEnabled
                  ? "ON"
                  : "OFF"
              }
              active={notificationsEnabled}
              onClick={() =>
                dispatch(toggleNotifications())
              }
              isLight={isLight}
            />
          </section>

          <section
            className={`
              rounded-3xl
              p-6
              shadow-xl
              border
              space-y-3
              ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-2xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-semibold
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-2xl
                border
                border-red-500
                text-red-500
                hover:bg-red-500
                hover:text-white
                font-semibold
                transition
              "
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </section>
        </div>

        <div
          className="
            lg:col-span-2
            space-y-6
            order-1
            lg:order-2
          "
        >
          <section
            className={`
              rounded-3xl
              p-6
              sm:p-8
              shadow-xl
              border
              ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-emerald-500/20
                  text-emerald-500
                  flex
                  items-center
                  justify-center
                "
              >
                <User size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Account Settings
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your profile information
                </p>
              </div>
            </div>

            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
              className={`
                w-full
                rounded-2xl
                px-4
                py-3
                outline-none
                border
                focus:ring-2
                focus:ring-emerald-500
                ${isLight
                  ? "bg-gray-100 border-gray-200 text-gray-900"
                  : "bg-[#0e2d22] border-white/10 text-white"
                }
              `}
            />

            <button
              onClick={handleUpdateUsername}
              disabled={loading}
              className="
                mt-5
                w-full
                sm:w-auto
                px-6
                py-3
                rounded-2xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-semibold
                disabled:opacity-60
                transition
              "
            >
              {loading
                ? "Saving..."
                : "Save Username"}
            </button>
          </section>

          <section
            className={`
    rounded-3xl
    p-6
    sm:p-8
    shadow-xl
    border
    ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
  `}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
        w-11
        h-11
        rounded-2xl
        bg-emerald-500/20
        text-emerald-500
        flex
        items-center
        justify-center
      "
              >
                <Lock size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Security
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Change your account password
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePassword();
              }}
              className="space-y-4"
            >
              <PasswordInput
                value={currentPassword}
                onChange={setCurrentPassword}
                placeholder="Current Password"
                autoComplete="current-password"
                isLight={isLight}
              />

              <PasswordInput
                value={newPassword}
                onChange={setNewPassword}
                placeholder="New Password"
                autoComplete="new-password"
                isLight={isLight}
              />

              {newPassword && (
                <div>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`${strength.color} h-full rounded-full transition-all`}
                      style={{
                        width: strength.width,
                      }}
                    />
                  </div>

                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                    Password Strength:
                    <span className="font-semibold ml-1">
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}

              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm Password"
                autoComplete="new-password"
                isLight={isLight}
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
                className="
        w-full
        py-3
        rounded-2xl
        bg-emerald-600
        hover:bg-emerald-700
        text-white
        font-semibold
        disabled:opacity-60
        transition
      "
              >
                {loading
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </form>
          </section>

          <section
            className={`
              rounded-3xl
              p-6
              shadow-xl
              border
              ${isLight
                ? "bg-white border-gray-200"
                : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <div className="flex items-start gap-3">
              <Shield className="text-emerald-500" />

              <div>
                <h3 className="font-bold text-lg">
                  Account Protection
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Keep your password private and review your account activity regularly.
                </p>
              </div>
            </div>
          </section>

          {message && (
            <div
              className={`
                p-4
                rounded-2xl
                text-white
                shadow-lg
                ${isError
                  ? "bg-red-500"
                  : "bg-emerald-600"
                }
              `}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingButton({
  icon,
  title,
  value,
  active,
  onClick,
  isLight,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        justify-between
        gap-3
        p-4
        rounded-2xl
        border
        transition
        ${isLight
          ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
          : "bg-[#0e2d22] border-white/10 hover:bg-white/10"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className="text-emerald-500">
          {icon}
        </div>

        <span className="font-medium">
          {title}
        </span>
      </div>

      <span
        className={`
          text-xs
          px-3
          py-1
          rounded-full
          font-semibold
          ${active === false
            ? "bg-red-100 text-red-600"
            : "bg-emerald-100 text-emerald-600"
          }
        `}
      >
        {value}
      </span>
    </button>
  );
}
function PasswordInput({
  value,
  onChange,
  placeholder,
  isLight,
  autoComplete = "current-password",
}) {
  return (
    <input
      type="password"
      name={autoComplete}
      autoComplete={autoComplete}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full rounded-2xl px-4 py-3 outline-none border
        focus:ring-2 focus:ring-emerald-500
        ${
          isLight
            ? "bg-gray-100 border-gray-200 text-gray-900"
            : "bg-[#0e2d22] border-white/10 text-white"
        }
      `}
    />
  );
}