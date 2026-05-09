import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 xl:px-25">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
