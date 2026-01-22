import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../Redux/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slice/authSlice";
import Swal from "sweetalert2";
import { decodeAuthToken } from "../../utils/decode-access-token";

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logIn, { isLoading }] = useLogInMutation();

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }

    try {
      const response = await logIn(formData).unwrap();
      console.log(response, "response");

      dispatch(setUser({
        user: response?.data?.user,
        token: response?.data?.accessToken,
        refreshToken: response?.data?.refreshToken,
      }));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Login successful!",
        confirmButtonColor: "#00e0b7",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.data?.message || "Login failed. Please try again.",
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
              disabled={isLoading}
            />
          </div>
          <div className="w-full">
            <label className="text-base text-gray-300 mb-2 font-medium block">
              Password
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

          <div className="flex justify-between items-center text-sm mt-4 mb-8">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="hidden"
                onChange={handleCheckboxChange}
              />
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked
                  ? "bg-[#00e0b7] border-[#00e0b7]"
                  : "border-gray-500 bg-transparent"
                  }`}
              >
                {isChecked && (
                  <svg
                    className="w-3 h-3 text-[#0e1527] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className="text-[#00e0b7] font-semibold">
                Remember Password
              </span>
            </label>
            <Link
              to="/forget-password"
              className="text-[#00e0b7] font-semibold hover:text-[#00c0b5] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center items-center">
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
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
