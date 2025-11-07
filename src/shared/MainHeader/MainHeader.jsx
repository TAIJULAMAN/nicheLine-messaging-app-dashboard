/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IoMenu, IoNotificationsOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full px-5">
      <header className="bg-[#0e1527] shadow-sm rounded-lg">
        <div className="flex justify-between items-center px-5 md:px-10 h-[80px]">
          <div>
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="p-2 rounded hover:opacity-80 focus:outline-none cursor-pointer"
            >
              <IoMenu className="w-8 h-8 text-white" />
            </button>
            <div className="hidden md:inline-block ml-4 text-white">
              <h1 className="text-white text-2xl font-bold">Welcome, Aman</h1>
              <p>Have a nice day!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full border border-[#00e0b7]"
            >
              <IoNotificationsOutline className="w-6 h-6 text-[#00e0b7]" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00e0b7] text-white text-[10px] px-1 leading-none">3</span>
            </button>
            {/* Chat */}
            <button
              type="button"
              aria-label="Open chat"
              onClick={() => navigate('/chat')}
              className="p-2 rounded-full border border-[#00e0b7]"
            >
              <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#00e0b7]" />
            </button>
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-default"
            >
              <img
                src="https://avatar.iran.liara.run/public/31"
                className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
                alt="User Avatar"
              />
              <div className="hidden md:block">
                <h3 className="text-white text-lg font-semibold">
                  Mr. Admin
                </h3>
                <p className="text-white text-lg font-semibold">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
