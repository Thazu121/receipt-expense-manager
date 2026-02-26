import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SideNavbar from "../components/layout/SideNavbar";

export default function RootLayout() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div className={isLight ? "" : "dark"}>
      <div className="min-h-screen flex bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">

        {/* Sidebar */}
        <SideNavbar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">

          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
}
