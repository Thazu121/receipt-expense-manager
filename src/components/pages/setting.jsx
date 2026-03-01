import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  changePassword,
} from "../../redux/features/authSlice";
import {
  setProfileImage,
  removeProfileImage,
} from "../../redux/features/userSlice";
import { Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profileImage = useSelector((state) => state.user.profileImage);

  /* ================= PROFILE STATE ================= */
  const [name, setName] = useState(user?.name || "");
  const [profileMessage, setProfileMessage] = useState("");

  /* ================= PASSWORD STATE ================= */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  /* ================= PROFILE FUNCTION ================= */

  const handleSaveProfile = () => {
    if (!name.trim()) {
      setProfileMessage("Name cannot be empty.");
      return;
    }

    dispatch(updateName(name));
    setProfileMessage("Profile updated successfully!");

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
    reader.readAsDataURL(file);
  };

  /* ================= PASSWORD FUNCTION ================= */

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    try {
      dispatch(
        changePassword({
          currentPassword,
          newPassword,
        })
      );

      setPasswordSuccess("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setPasswordSuccess("");
      }, 3000);
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-10">

      {/* ================= PROFILE SECTION ================= */}
      <div className="bg-green-900/40 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-8">
          Profile Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-white text-sm"
            />

            {profileImage && (
              <button
                onClick={() => dispatch(removeProfileImage())}
                className="text-red-400 text-sm hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              onClick={handleSaveProfile}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
            >
              Save Profile
            </button>

            {profileMessage && (
              <p className="text-emerald-400 text-sm mt-3">
                {profileMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= PASSWORD SECTION ================= */}
      <div className="bg-green-900/40 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-8">
          Change Password
        </h2>

        <div className="space-y-5 max-w-md">

          {/* Current Password */}
          <div className="relative">
            <label className="block text-white mb-1">
              Current Password
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-white mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-white mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-400 text-sm">
              {passwordError}
            </p>
          )}

          {passwordSuccess && (
            <p className="text-emerald-400 text-sm">
              {passwordSuccess}
            </p>
          )}

          <button
            onClick={handleChangePassword}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
          >
            Update Password
          </button>

        </div>
      </div>
    </div>
  );
}
