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
      className={`bg-[#0E1527] text-white h-screen overflow-y-auto my-5 rounded-lg py-5 md:py-0 z-50 transition-all duration-300 transform overflow-hidden
        w-[80%] sm:w-[70%] md:w-[50%] ${isOpen ? "lg:w-68 xl:w-72" : "lg:w-0"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} ${
        isOpen ? "lg:translate-x-0" : "lg:-translate-x-full"
      }
        fixed top-0 left-0
        lg:static
      `}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-[#00E0B7] focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>

      {/* Logo */}
      <div className="flex justify-center items-center gap-2 px-5 mt-2 md:mt-5">
        <img src="/logo.png" className="w-[150px] h-[40px]" alt="User Avatar" />
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-10 px-5 text-[10px]">
        <Link to="/">
          <li
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <RxDashboard className="w-5 h-5" />
            <p className="text-lg font-semibold">Dashboard</p>
          </li>
        </Link>
        <Link to="/user-details">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/user-details")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <LuUsers className="w-5 h-5" />
            <p className="text-lg font-semibold">User Management</p>
          </li>
        </Link>
        <Link to="/product">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/product")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <MdOutlineInventory2 className="w-5 h-5" />
            <p className="text-lg font-semibold">Product</p>
          </li>
        </Link>
        <Link to="/gamification">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/gamification")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <MdOutlineInventory2 className="w-5 h-5" />
            <p className="text-lg font-semibold">Gamification</p>
          </li>
        </Link>
        <Link to="/category">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/category")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <MdOutlineInventory2 className="w-5 h-5" />
            <p className="text-lg font-semibold">Category</p>
          </li>
        </Link>
        <Link to="/create-admin">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/create-admin")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <MdAdminPanelSettings className="w-5 h-5" />
            <p className="text-lg font-semibold">Create Admin</p>
          </li>
        </Link>
        <Link to="/chat">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/chat")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <TbBrandWechat className="w-5 h-5" />
            <p className="text-lg font-semibold">Chat</p>
          </li>
        </Link>
        <Link to="/reports">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/reports")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <TbReport className="w-5 h-5 text-lg font-semibold" />
            <p className="text-lg font-semibold">Reports</p>
          </li>
        </Link>
        <Link to="/settings">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/settings")
                ? "bg-[#00E0B7] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
          >
            <IoMdSettings className="w-5 h-5 text-lg font-semibold" />
            <p className="text-lg font-semibold">Settings</p>
          </li>
        </Link>
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-8 md:mt-20 mmd:mt-20 w-full px-5">
        <Link to="/sign-in">
          <button className="flex items-center gap-4 w-full py-3 rounded-lg bg-[#00E0B7]  px-3 duration-200 text-white justify-center ">
            <IoLogOutOutline className="w-5 h-5 font-bold" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
