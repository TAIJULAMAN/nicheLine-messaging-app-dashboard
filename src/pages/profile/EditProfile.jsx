import { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "../../Redux/api/profileApi";
import Swal from "sweetalert2";

function EditProfile({ profileData }) {
  console.log(profileData, "profileData");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        fullName: profileData.data.name || "",
        email: profileData.data.email || "",
        location: profileData.data.location || "",
      });
    }
  }, [profileData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Full name is required",
      });
      return;
    }

    if (!formData.email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Email is required",
      });
      return;
    }

    if (!formData.location.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Location is required",
      });
      return;
    }

    try {
      const result = await updateProfile(formData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: result?.message || "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-0">
      <div className="bg-[#0e1527] w-full max-w-xl px-6 sm:px-8 md:px-10 py-8 rounded-2xl shadow-lg shadow-gray-200/50">
        <p className="text-white text-center font-bold text-xl sm:text-2xl mb-8">
          Edit Your Profile
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              User Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 transition-all opacity-60 cursor-not-allowed"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl hover:opacity-90 transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0E1527]"></div>
                  Updating...
                </span>
              ) : (
                "Save & Change"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
