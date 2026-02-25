import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar"

export default function RootLayout() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    
    <div className={isLight ? "bg-white text-black" : "dark bg-slate-950 text-white"}>
     <Navbar />
      <Outlet />
    </div>
  );
}
