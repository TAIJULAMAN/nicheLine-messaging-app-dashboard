import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../Redux/api/auth/authApi";
import { decodeAuthToken } from "../../utils/decode-access-token";
import Swal from "sweetalert2";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Get token from Redux state or localStorage
  const reduxToken = useSelector((state) => state?.auth?.token);
  const token = reduxToken || localStorage.getItem("token");

  // Decode token to extract userId
  const decodedToken = token ? decodeAuthToken(token) : null;
  // console.log("Decoded Token:", decodedToken);
  const userId = decodedToken?.id;

  // Debug logging
  // console.log("Redux Token:", reduxToken);
  // console.log("Token (from Redux or localStorage):", token);
  // console.log("Decoded Token:", decodedToken);
  // console.log("Extracted User ID:", userId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }
    if (formData.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Session Error",
        text: "User session not found. Please start the password reset process again.",
        confirmButtonColor: "#00e0b7",
      });
      navigate("/forget-password");
      return;
    }

    try {
      const response = await resetPassword({
        userId,
        password: formData.password,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Password reset successfully!",
        confirmButtonColor: "#00e0b7",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/sign-in");
    } catch (error) {
      console.error("Reset password error:", error);
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: error?.data?.message || "Failed to reset password. Please try again.",
        confirmButtonColor: "#00e0b7",
      });
    }
  };

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-xl bg-[#0e1527] p-8 md:px-10 md:py-12 shadow-2xl shadow-gray-200/50 rounded-2xl">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="text-base text-gray-300 mb-2 font-medium block">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="**********"
                className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="text-base text-gray-300 mb-2 font-medium block">
              Confirm New Password
            </label>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="**********"
                className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00e0b7] text-[#0E1527] font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
