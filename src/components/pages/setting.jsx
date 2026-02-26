import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/features/authSlice";

import {
  User,
  Bell,
  Lock,
  LogOut,
} from "lucide-react";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailAlerts, setEmailAlerts] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className="
      min-h-screen px-4 sm:px-6 lg:px-8 py-6
      bg-gray-100 dark:bg-gradient-to-br dark:from-[#071B11] dark:to-[#04140C]
      text-gray-800 dark:text-white
      transition-all duration-300"
    >
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account preferences.
        </p>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="
        bg-white dark:bg-[#0D2318]
        border border-gray-200 dark:border-green-900/40
        rounded-2xl p-6 mb-8 shadow-md">

        <div className="flex items-center gap-3 mb-6">
          <User className="text-blue-500 dark:text-green-400" />
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="
            bg-gray-50 dark:bg-[#132D21]
            border border-gray-300 dark:border-green-900/40
            rounded-xl px-4 py-3 outline-none
            focus:border-blue-500 dark:focus:border-green-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="
            bg-gray-50 dark:bg-[#132D21]
            border border-gray-300 dark:border-green-900/40
            rounded-xl px-4 py-3 outline-none
            focus:border-blue-500 dark:focus:border-green-500"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="
            bg-blue-500 dark:bg-green-500
            hover:bg-blue-600 dark:hover:bg-green-600
            text-white px-6 py-2.5 rounded-xl transition"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="
        bg-white dark:bg-[#0D2318]
        border border-gray-200 dark:border-green-900/40
        rounded-2xl p-6 mb-8 shadow-md">

        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-blue-500 dark:text-green-400" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span>Email Alerts</span>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="accent-blue-500 dark:accent-green-500 w-5 h-5"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Monthly Reports</span>
          <input
            type="checkbox"
            checked={monthlyReports}
            onChange={() => setMonthlyReports(!monthlyReports)}
            className="accent-blue-500 dark:accent-green-500 w-5 h-5"
          />
        </div>
      </div>

      {/* ================= PASSWORD ================= */}
      <div className="
        bg-white dark:bg-[#0D2318]
        border border-gray-200 dark:border-green-900/40
        rounded-2xl p-6 mb-8 shadow-md">

        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-blue-500 dark:text-green-400" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Current Password", "New Password", "Confirm Password"].map(
            (item) => (
              <input
                key={item}
                type="password"
                placeholder={item}
                className="
                bg-gray-50 dark:bg-[#132D21]
                border border-gray-300 dark:border-green-900/40
                rounded-xl px-4 py-3 outline-none
                focus:border-blue-500 dark:focus:border-green-500"
              />
            )
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="
            bg-blue-500 dark:bg-green-500
            hover:bg-blue-600 dark:hover:bg-green-600
            text-white px-6 py-2.5 rounded-xl transition"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* ================= LOGOUT ================= */}
      <div className="
        bg-white dark:bg-[#0D2318]
        border border-red-200 dark:border-red-900/40
        rounded-2xl p-6 shadow-md">

        <div className="flex items-center gap-3 mb-6">
          <LogOut className="text-red-500" />
          <h2 className="text-lg font-semibold text-red-500">
            Account
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="
          w-full
          bg-red-500 hover:bg-red-600
          text-white px-6 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}
