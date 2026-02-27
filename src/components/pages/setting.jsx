import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  updatePassword,
} from "../../redux/features/authSlice";
import {
  setProfileImage,
  removeProfileImage,
} from "../../redux/features/userSlice";

export default function Settings() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profileImage = useSelector((state) => state.user.profileImage);

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");

  const handleSaveProfile = () => {
    if (!name.trim()) return;
    dispatch(updateName(name));
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!password.trim()) return;
    dispatch(updatePassword(password));
    alert("Password updated successfully!");
    setPassword("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-8">

      {/* Profile Section */}
      <div className="bg-green-900/40 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          Profile Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-400">
              <img
                src={
                  profileImage ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    dispatch(setProfileImage(reader.result));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="text-white text-sm"
            />

            {profileImage && (
              <button
                onClick={() => dispatch(removeProfileImage())}
                className="text-red-400 text-sm"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-white mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
            />

            <button
              onClick={handleSaveProfile}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-green-900/40 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white text-black"
        />

        <button
          onClick={handleChangePassword}
          className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
