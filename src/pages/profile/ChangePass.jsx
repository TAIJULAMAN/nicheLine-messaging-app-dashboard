import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangeAdminPasswordMutation } from "../../Redux/api/profileApi";
import Swal from "sweetalert2";

function ChangePass() {
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });

  const [changePassword, { isLoading }] = useChangeAdminPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldpassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Current password is required",
      });
      return;
    }

    if (!formData.newpassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "New password is required",
      });
      return;
    }

    if (formData.newpassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "New password must be at least 6 characters long",
      });
      return;
    }



    try {
      const { oldpassword, newpassword } = formData;
      const result = await changePassword({ oldpassword, newpassword }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: result?.message || "Password changed successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setFormData({
        oldpassword: "",
        newpassword: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Password Change Failed",
        text: error?.data?.message || "Failed to change password. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#0e1527] w-full max-w-xl mx-auto px-6 sm:px-8 md:px-10 pt-8 py-8 rounded-2xl shadow-lg shadow-gray-200/50">
      <p className="text-white text-center font-bold text-xl sm:text-2xl mb-8">
        Change Password
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="w-full">
          <label
            htmlFor="oldpassword"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              name="oldpassword"
              value={formData.oldpassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition"
            >
              {showPasswords.current ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="newpassword"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition"
            >
              {showPasswords.new ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {/* <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition"
            >
              {showPasswords.confirm ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div> */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl hover:opacity-90 transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0E1527]"></div>
                Changing Password...
              </span>
            ) : (
              "Save & Change"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
