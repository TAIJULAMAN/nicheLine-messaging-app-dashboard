import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { IoChevronBack } from "react-icons/io5";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../Redux/api/profileApi";
import Loader from "../../components/Loader/Loader";
import { imgUrl } from "../../config/envConfig";
import Swal from "sweetalert2";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const navigate = useNavigate();

  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  console.log(profileData, "profileData");

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({}));
      formData.append("file", file);

      const result = await updateProfile(formData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: result?.message || "Profile picture updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error?.data?.message || "Failed to upload profile picture. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="overflow-y-auto">
      <div className="md:px-5 pb-5 h-full">
        <div className="bg-[#00e0b7] px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-[#0E1527] hover:opacity-90 transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-[#0E1527] text-xl sm:text-2xl font-bold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row justify-center items-center bg-[#0e1527] mt-5 text-white w-full max-w-3xl mx-auto p-6 md:p-8 gap-6 rounded-2xl shadow-lg shadow-gray-200/50">

            <div className="relative">
              <div className="w-[122px] h-[122px] bg-[#1f2937] rounded-full border-4 border-[#00e0b7] shadow-xl flex justify-center items-center">
                <img
                  src={profileData?.data?.photo ?
                    `${imgUrl}/${profileData?.data?.photo}` :
                    "1.avif"
                  }
                  alt="profile"
                  className="h-full w-full rounded-full object-cover"
                />
                {/* Loading Overlay */}
                {isUpdating && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00e0b7]"></div>
                  </div>
                )}
                {/* Upload Icon */}
                <div className="absolute bottom-1 right-1 bg-[#00e0b7] p-2 rounded-full shadow-md cursor-pointer border-2 border-[#0e1527]">
                  <label htmlFor="profilePicUpload" className={`cursor-pointer ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <FaCamera className="text-[#0E1527] text-sm" />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleProfilePicUpload}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {profileData?.data?.name || "N/A"}
              </p>
              <p className="text-lg font-medium text-[#00e0b7]">
                {profileData?.data?.email || "N/A"}
              </p>
            </div>


          </div>

          {/* Tab Navigation Section */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 text-sm sm:text-base md:text-lg font-semibold my-6 md:my-8">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === "editProfile"
                ? "bg-[#00e0b7] text-[#0E1527] shadow-lg shadow-[#00e0b7]/20"
                : "bg-[#0e1527] text-white hover:bg-[#1f2937]"
                }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === "changePassword"
                ? "bg-[#00e0b7] text-[#0E1527] shadow-lg shadow-[#00e0b7]/20"
                : "bg-[#0e1527] text-white hover:bg-[#1f2937]"
                }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-0 md:p-0 rounded-md w-full">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile profileData={profileData} />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
