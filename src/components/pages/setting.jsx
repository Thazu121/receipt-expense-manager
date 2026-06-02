import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import {
  updateUsername,
  changePassword,
  logout,
  deleteAccount,
  updateProfilePhoto,
} from "../../redux/features/authSlice";

import {
  toggleNotifications,
  toggleTheme,
} from "../../redux/features/settingSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const { user, error, success, loading } = useSelector((s) => s.auth);
  const settings = useSelector((s) => s.settings);

  const [username, setUsername] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dark = settings.theme === "dark";

  const bg = dark
    ? "bg-gradient-to-br from-[#031a13] via-[#042e1e] to-[#001d13] text-white"
    : "bg-gradient-to-br from-[#f2fff9] via-[#e6fff3] to-[#dbffec] text-black";

  const card = dark ? "bg-[#081f17]" : "bg-white";
  const input = dark ? "bg-[#0e2d22] text-white" : "bg-gray-100";

  // ---------------- PASSWORD STRENGTH ----------------
  const strengthCheck = (pass) => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;

    if (s <= 1) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (s <= 3) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = strengthCheck(newPassword);

  const message = localError || error || success;
  const isError = !!(localError || error);

  // ---------------- HANDLERS ----------------
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateProfilePhoto(file));
    }
  };

  const handleUpdateUsername = () => {
    dispatch(updateUsername(username));
  };

  const handleUpdatePassword = () => {
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

  return (
    <div className={`min-h-screen p-4 md:p-6 ${bg}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-6 order-2 lg:order-1">

          {/* PROFILE */}
          <div className={`p-6 rounded-3xl ${card} text-center`}>
            <div className="w-24 h-24 mx-auto">
              {user?.photo ? (
                <img
                  src={user.photo}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-2xl text-white">
                  {(username?.charAt(0) || "U").toUpperCase()}
                </div>
              )}
            </div>

            <button
              onClick={() => fileRef.current.click()}
              className="mt-4 w-full py-2 border border-green-600 rounded-xl"
            >
              Change Photo
            </button>

            <input
              type="file"
              ref={fileRef}
              onChange={handlePhoto}
              className="hidden"
            />
          </div>

          {/* SETTINGS */}
          <div className={`p-6 rounded-3xl ${card} space-y-3`}>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-full py-2 bg-green-600 text-white rounded-xl"
            >
              Toggle Theme
            </button>

            <button
              onClick={() => dispatch(toggleNotifications())}
              className="w-full py-2 border border-green-600 rounded-xl"
            >
              Notifications: {settings.notificationsEnabled ? "ON" : "OFF"}
            </button>

            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login", { replace: true });
              }}
              className="w-full py-2 bg-green-600 text-white rounded-xl"
            >
              Logout
            </button>

            <button
              onClick={() => {
                dispatch(deleteAccount());
                navigate("/signup");
              }}
              className="w-full py-2 border border-red-500 text-red-500 rounded-xl"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">

          {/* USERNAME */}
          <div className={`p-6 rounded-3xl ${card}`}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-3 w-full rounded-xl ${input}`}
            />

            <button
              onClick={handleUpdateUsername}
              disabled={loading}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl w-full md:w-auto"
            >
              Save Username
            </button>
          </div>

          {/* PASSWORD */}
          <div className={`p-6 rounded-3xl ${card}`}>

            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`p-3 w-full rounded-xl ${input}`}
            />

            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`p-3 w-full rounded-xl mt-3 ${input}`}
            />

            {newPassword && (
              <div className="mt-2">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div
                    className={`${strength.color} h-2 rounded-full`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className="text-sm mt-1">{strength.label}</p>
              </div>
            )}

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`p-3 w-full rounded-xl mt-3 ${input}`}
            />

            <button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl w-full"
            >
              Update Password
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`p-3 rounded-xl text-white ${
                isError ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}