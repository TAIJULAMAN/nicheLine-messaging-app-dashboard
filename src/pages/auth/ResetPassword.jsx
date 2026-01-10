import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-xl bg-[#0e1527] p-8 md:px-10 md:py-12 shadow-2xl shadow-gray-200/50 rounded-2xl">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
        <form className="space-y-6">
          <div className="w-full">
            <label className="text-base text-gray-300 mb-2 font-medium block">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
                required
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
                required
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
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => navigate("/sign-in")}
              type="button"
              className="w-full bg-[#00e0b7] text-[#0E1527] font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95 transition-all duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
