import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SideNavbar from "../components/layout/SideNavbar";

export default function RootLayout() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div className={isLight ? "" : "dark"}>
      <div className="min-h-screen flex overflow-x-hidden bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">

        {/* Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
