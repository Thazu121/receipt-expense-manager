import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded-lg transition-all duration-300 border ${
        isLight
          ? "bg-white border-gray-300 hover:bg-gray-100"
          : "bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md"
      }`}
    >
      {isLight ? (
        // Light mode → show Moon (switch to dark)
        <Moon size={18} className="text-gray-700" />
      ) : (
        // Dark mode → show Sun (switch to light)
        <Sun size={18} className="text-yellow-400" />
      )}
    </button>
  );
}
