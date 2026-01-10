import { useState, useEffect } from "react";
import Sidebar from "../shared/Sidebar/Sidebar";
import MainHeader from "../shared/MainHeader/MainHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full bg-[#f4f7fe] relative overflow-hidden">
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f7fe] p-4 md:p-6 scroll-smooth">
          <div className="mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
