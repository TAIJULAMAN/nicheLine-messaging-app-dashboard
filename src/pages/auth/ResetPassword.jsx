import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-3xl bg-[#0e1527] p-5 md:px-18 md:py-28 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-2xl">
        <div className="flex justify-center items-center mb-10">
          <img src="/logo.png" alt="" />
        </div>
        <form className="space-y-6">
          <div className="w-full">
            <label className="text-xl text-white mb-2 font-bold">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                className="w-full px-5 py-3 border-2 border-white rounded-md outline-none mt-5 placeholder:text-xl text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
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
            <label className="text-xl text-white mb-2 font-bold">
              Confirm New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                className="w-full px-5 py-3 border-2 border-white rounded-md outline-none mt-5 placeholder:text-xl text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/sign-in")}
              type="button"
              className="w-1/3 bg-[#00e0b7] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
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
