import { Outlet } from "react-router-dom";
// import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div className={isLight ? "" : "dark"}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">


        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
}
