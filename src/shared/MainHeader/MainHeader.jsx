/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IoMenu, IoNotificationsOutline } from "react-icons/io5";
import { useGetProfileQuery } from "../../Redux/api/profileApi";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfileQuery();
  console.log(profileData, "profileData");

  return (
    <div className="sticky top-0 z-30 mx-0 md:top-4 md:mx-6">
      <header className="bg-white/90 md:bg-white/80 backdrop-blur-md shadow-sm md:shadow-lg md:shadow-gray-200/50 rounded-b-2xl md:rounded-2xl border-b md:border border-white/50 transition-all duration-300">
        <div className="flex justify-between items-center px-4 md:px-6 h-[70px] md:h-[80px]">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none cursor-pointer lg:hidden"
            >
              <IoMenu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-gray-800 text-xl font-bold tracking-tight">Welcome, {profileData?.data?.name?.split(" ")[0] || "User"}</h1>
              <p className="text-gray-500 text-xs font-medium">Have a nice day!</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors active:scale-95 duration-200"
            >
              <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#00E0B7] ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>

            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300"
            >
              <img
                src={profileData?.data?.photo || "1.avif"}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <h3 className="text-sm font-bold text-gray-700 leading-tight">
                  {profileData?.data?.name || "N/A"}
                </h3>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">ADMIN</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
