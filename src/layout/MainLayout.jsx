import { useState, useEffect } from "react";
import Sidebar from "../shared/Sidebar/Sidebar";
import MainHeader from "../shared/MainHeader/MainHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Ensure: initially closed on mobile, open on desktop (lg: 1024px)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const updateOpenState = () => setIsSidebarOpen(mql.matches);
    updateOpenState();
    if (mql.addEventListener) {
      mql.addEventListener("change", updateOpenState);
      return () => mql.removeEventListener("change", updateOpenState);
    } else {
      // Fallback for older browsers
      mql.addListener(updateOpenState);
      return () => mql.removeListener(updateOpenState);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Auto-close sidebar on route change when on mobile
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 lg:hidden"
        />
      )}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col w-full overflow-hidden my-5">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="p-5 bg-white flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
