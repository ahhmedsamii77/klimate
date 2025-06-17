import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

export default function Layout() {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Navbar />
      <main className="container mx-auto min-h-screen py-8 px-6 md:px-2  xl:px-25">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
