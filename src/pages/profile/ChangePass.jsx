import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#0e1527] w-full max-w-xl mx-auto px-6 sm:px-8 md:px-10 pt-8 py-8 rounded-2xl shadow-lg shadow-gray-200/50">
      <p className="text-white text-center font-bold text-xl sm:text-2xl mb-8">
        Change Password
      </p>
      <form className="space-y-6">
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
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
          <label
            htmlFor="password"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
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
          <label
            htmlFor="password"
            className="text-sm md:text-base text-gray-300 mb-2 font-medium block"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none px-4 py-3 placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
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
        <div className="text-center pt-4">
          <button className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl hover:opacity-90 transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30">
            Save & Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
