import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="max-w-screen-2xl w-full min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 w-full bg-slate-200">
      <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
