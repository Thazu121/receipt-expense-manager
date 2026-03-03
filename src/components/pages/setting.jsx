import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUsername,
  changePassword,
  logout,
  deleteAccount,
  clearMessages,
  updateProfilePhoto,
} from "../../redux/features/authSlice";
import { toggleNotifications } from "../../redux/features/settingSlice";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const { user, error, success } = useSelector((s) => s.auth);
  const notificationsEnabled = useSelector(
    (s) => s.settings.notificationsEnabled
  );
  const isLight = useSelector((s) => s.theme.isLight);
  const dark = !isLight;

  const [username, setUsername] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const bg = dark
    ? "bg-gradient-to-br from-[#031a13] via-[#042e1e] to-[#001d13] text-white"
    : "bg-gradient-to-br from-[#f2fff9] via-[#e6fff3] to-[#dbffec] text-black";

  const card = dark ? "bg-[#081f17]" : "bg-white";
  const input = dark ? "bg-[#0e2d22] text-white" : "bg-gray-100";

  const strengthCheck = (pass) => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;

    if (s <= 1)
      return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (s <= 3)
      return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = strengthCheck(newPassword);

  useEffect(() => {
    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (error || success) {
      const t = setTimeout(() => {
        dispatch(clearMessages());
        setLocalError("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [error, success, dispatch]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Upload image only");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updateProfilePhoto(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = () => {
    setLocalError("");

    if (username.length < 3)
      return setLocalError("Username min 3 chars");

    dispatch(updateUsername({ newName: username }));
  };

  const updatePass = () => {
    setLocalError("");

    if (!currentPassword || !newPassword || !confirmPassword)
      return setLocalError("All fields required");

    if (newPassword !== confirmPassword)
      return setLocalError("Passwords not match");

    dispatch(changePassword({ currentPassword, newPassword }));
  };

  return (
    <div className={`min-h-screen p-6 ${bg}`}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl ${card}`}>
            <div className="w-28 h-28 mx-auto">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-3xl text-white">
                  {username?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <button
              onClick={() => fileRef.current.click()}
              className="mt-6 w-full py-2 border border-green-600 rounded-xl"
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
              Notifications: {notificationsEnabled ? "ON" : "OFF"}
            </button>

            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
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

        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-3xl ${card}`}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-3 w-full rounded-xl ${input}`}
            />
            <button
              onClick={updateProfile}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Save
            </button>
          </div>

          <div className={`p-6 rounded-3xl ${card}`}>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className={`p-3 w-full rounded-xl ${input}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-3"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative mt-3">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className={`p-3 w-full rounded-xl ${input}`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

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

            <div className="relative mt-3">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className={`p-3 w-full rounded-xl ${input}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              onClick={updatePass}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Update Password
            </button>
          </div>

          {(error || success || localError) && (
            <div className="p-3 bg-red-500 text-white rounded-xl">
              {localError || error || success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
