/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { TbBrandWechat, TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineInventory2, MdAdminPanelSettings } from "react-icons/md";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  return (
    <div
      className={`bg-[#0E1527] flex flex-col transition-all duration-300 z-50
        fixed top-0 bottom-0 left-0 w-[280px] shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        
        lg:static lg:w-[290px] lg:translate-x-0 lg:h-[calc(100vh-2rem)] lg:my-4 lg:ml-4 lg:rounded-[20px] lg:shadow-none
      `}
    >
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        {/* Close Button (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 lg:hidden text-white bg-[#00E0B7]/20 hover:bg-[#00E0B7]/30 transition-colors p-2 rounded-full backdrop-blur-sm z-50"
        >
          <IoCloseSharp className="w-5 h-5 text-[#00E0B7]" />
        </button>

        {/* Logo */}
        <div className="flex justify-center items-center py-8">
          <img src="/logo.png" className="w-[160px] object-contain transition-transform hover:scale-105 duration-300" alt="Logo" />
        </div>

        {/* Sidebar Menu */}
        <ul className="px-4 space-y-1 pb-24">
          {[
            { path: "/", icon: RxDashboard, label: "Dashboard" },
            { path: "/user-details", icon: LuUsers, label: "User Management" },
            { path: "/subscribers", icon: LuUsers, label: "All Subscribers" },
            { path: "/subscription", icon: MdOutlineInventory2, label: "Subscription" },
            // { path: "/category", icon: MdOutlineInventory2, label: "Category" },
            // { path: "/create-admin", icon: MdAdminPanelSettings, label: "Create Admin" },
            // { path: "/chat", icon: TbBrandWechat, label: "Chat" },
            // { path: "/reports", icon: TbReport, label: "Reports" },
            { path: "/settings", icon: IoMdSettings, label: "Settings" },
          ].map((item) => (
            <Link to={item.path} key={item.path}>
              <li
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${isActive(item.path)
                  ? "bg-gradient-to-r from-[#00E0B7] to-[#00b392] text-white shadow-lg shadow-[#00E0B7]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive(item.path) ? "scale-110" : "group-hover:scale-110"}`} />
                <p className="text-[15px] font-medium tracking-wide">{item.label}</p>
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Logout Button (Fixed at bottom) */}
      <div className="p-4 bg-[#0E1527] absolute bottom-0 w-full rounded-b-[20px] bg-gradient-to-t from-[#0E1527] via-[#0E1527] to-transparent">
        <Link to="/sign-in">
          <button className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-white/5 hover:bg-[#ff4757]/10 text-gray-400 hover:text-[#ff4757] border border-white/5 hover:border-[#ff4757]/20 transition-all duration-300 group">
            <IoLogOutOutline className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-medium">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
