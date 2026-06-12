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

import { toggleNotifications } from "../../redux/features/settingSlice";
import { toggleTheme } from "../../redux/features/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const { user, error, success, loading } = useSelector(
    (state) => state.auth
  );

  const { notificationsEnabled } = useSelector(
    (state) => state.settings
  );

  const isLight = useSelector((state) => state.theme.isLight);

  const [username, setUsername] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const message = localError || error || success;
  const isError = Boolean(localError || error);

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

  const strength = strengthCheck(newPassword);

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
    const confirmDelete = window.confirm(
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
        w-full
        overflow-x-hidden
        px-3
        py-4
        sm:px-5
        sm:py-6
        lg:px-8
        lg:py-8
        transition-colors
        duration-300
        ${
          isLight
            ? "bg-gradient-to-br from-[#f2fff9] via-[#e6fff3] to-[#dbffec] text-gray-900"
            : "bg-gradient-to-br from-[#031a13] via-[#042e1e] to-[#001d13] text-white"
        }
      `}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-4
          sm:gap-6
          lg:gap-8
        "
      >
        <div
          className="
            order-2
            xl:order-1
            space-y-4
            sm:space-y-6
            min-w-0
            xl:sticky
            xl:top-6
            xl:h-fit
          "
        >
          <ProfileCard
            user={user}
            fileRef={fileRef}
            handlePhoto={handlePhoto}
            isLight={isLight}
          />

          <section
            className={`
              rounded-3xl
              p-4
              sm:p-6
              shadow-xl
              border
              space-y-4
              ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <h3 className="font-bold text-base sm:text-lg">
              Preferences
            </h3>

            <SettingButton
              icon={isLight ? <Moon size={18} /> : <Sun size={18} />}
              title="Theme"
              value={isLight ? "Light" : "Dark"}
              onClick={() => dispatch(toggleTheme())}
              isLight={isLight}
            />

            <SettingButton
              icon={<Bell size={18} />}
              title="Notifications"
              value={notificationsEnabled ? "ON" : "OFF"}
              active={notificationsEnabled}
              onClick={() => dispatch(toggleNotifications())}
              isLight={isLight}
            />
          </section>

          <section
            className={`
              rounded-3xl
              p-4
              sm:p-6
              shadow-xl
              border
              space-y-3
              ${
                isLight
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
            order-1
            xl:order-2
            xl:col-span-2
            space-y-4
            sm:space-y-6
            min-w-0
          "
        >
          <section
            className={`
              rounded-3xl
              p-4
              sm:p-6
              lg:p-8
              shadow-xl
              border
              ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <SectionTitle
              icon={<User size={22} />}
              title="Account Settings"
              subtitle="Update your profile information"
            />

            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className={inputClass(isLight)}
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
              {loading ? "Saving..." : "Save Username"}
            </button>
          </section>

          <section
            className={`
              rounded-3xl
              p-4
              sm:p-6
              lg:p-8
              shadow-xl
              border
              ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <SectionTitle
              icon={<Lock size={22} />}
              title="Security"
              subtitle="Change your account password"
            />

            <div className="space-y-4">
              <PasswordInput
                value={currentPassword}
                onChange={setCurrentPassword}
                placeholder="Current Password"
                isLight={isLight}
              />

              <PasswordInput
                value={newPassword}
                onChange={setNewPassword}
                placeholder="New Password"
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
                    Password Strength:{" "}
                    <span className="font-semibold">
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}

              <PasswordInput
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm Password"
                isLight={isLight}
              />

              <button
                onClick={handleUpdatePassword}
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
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </section>

          <section
            className={`
              rounded-3xl
              p-4
              sm:p-6
              shadow-xl
              border
              ${
                isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/10 backdrop-blur-xl"
              }
            `}
          >
            <div className="flex items-start gap-3">
              <Shield className="text-emerald-500 shrink-0" />

              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg">
                  Account Protection
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Keep your password private and review your account activity regularly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {message && (
        <div
          className={`
            fixed
            top-4
            left-3
            right-3
            sm:left-auto
            sm:right-5
            z-50
            px-4
            py-3
            rounded-xl
            shadow-xl
            text-white
            text-sm
            sm:text-base
            ${
              isError
                ? "bg-red-500"
                : "bg-emerald-600"
            }
          `}
        >
          {message}
        </div>
      )}
    </div>
  );
}

function ProfileCard({ user, fileRef, handlePhoto, isLight }) {
  return (
    <section
      className={`
        rounded-3xl
        p-4
        sm:p-6
        shadow-xl
        border
        ${
          isLight
            ? "bg-white border-gray-200"
            : "bg-white/5 border-white/10 backdrop-blur-xl"
        }
      `}
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
          max-w-full
        "
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
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
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
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
              transition
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

        <h2 className="mt-4 max-w-full text-lg sm:text-xl font-bold break-words">
          {user?.name || "User"}
        </h2>

        <p className="max-w-full text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-all">
          {user?.email || ""}
        </p>
      </div>
    </section>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div
        className="
          shrink-0
          w-10
          h-10
          sm:w-11
          sm:h-11
          rounded-2xl
          bg-emerald-500/20
          text-emerald-500
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold break-words">
          {title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
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
        min-w-0
        flex
        items-center
        justify-between
        gap-3
        p-3
        sm:p-4
        rounded-2xl
        border
        transition
        ${
          isLight
            ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
            : "bg-[#0e2d22] border-white/10 hover:bg-white/10"
        }
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-emerald-500 shrink-0">
          {icon}
        </div>

        <span className="font-medium truncate">
          {title}
        </span>
      </div>

      <span
        className={`
          shrink-0
          text-xs
          px-3
          py-1
          rounded-full
          font-semibold
          ${
            active === false
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
}) {
  return (
    <input
      type="password"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass(isLight)}
    />
  );
}

function inputClass(isLight) {
  return `
    w-full
    min-w-0
    rounded-2xl
    px-4
    py-3
    outline-none
    border
    focus:ring-2
    focus:ring-emerald-500
    ${
      isLight
        ? "bg-gray-100 border-gray-200 text-gray-900"
        : "bg-[#0e2d22] border-white/10 text-white"
    }
  `;
}