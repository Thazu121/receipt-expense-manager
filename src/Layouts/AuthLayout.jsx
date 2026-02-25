import { Outlet } from "react-router-dom";
import AuthNav from "../components/layout/AuthNav";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-6 py-6 md:px-12 md:py-8 ${
        isLight
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-br from-[#071a10] via-[#0b2a1a] to-[#04110a] text-white"
      }`}
    >
      {!isLight && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px]" />
        </div>
      )}

      <AuthNav />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <Outlet />
      </div>
    </div>
  );
}
