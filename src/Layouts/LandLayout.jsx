import LandingNavbar from "../components/layout/LandingNav"
import Footer from "../components/layout/footer";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <LandingNavbar />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
