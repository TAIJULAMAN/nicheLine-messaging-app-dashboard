import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { IoChevronBack } from "react-icons/io5";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <div className="bg-[#6BB43A] px-5 py-3 rounded-md mb-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-90 transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex justify-center items-center bg-[#74AA2E] mt-5 text-white w-[900px] mx-auto p-5 gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  alt="profile"
                  className="h-30 w-32 rounded-full"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#575757]" />
                  </label>
                  <input type="file" id="profilePicUpload" className="hidden" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xl md:text-3xl font-bold">Shah Aman</p>
              <p className="text-xl font-semibold">Admin</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#74AA2E] border-b-2 border-[#74AA2E]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#74AA2E] border-b-2 border-[#74AA2E]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
