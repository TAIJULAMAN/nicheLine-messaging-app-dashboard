import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../Redux/api/auth/authApi";
import Swal from "sweetalert2";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter your email address",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }

    try {
      const response = await forgotPassword({ email }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Verification code sent to your email!",
        confirmButtonColor: "#00e0b7",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/verification-code");
    } catch (error) {
      console.error("Forgot password error:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error?.data?.message || "Failed to send verification code. Please try again.",
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
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-base text-gray-300 mb-2 font-medium block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
              disabled={isLoading}
            />
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
                  Sending Code...
                </>
              ) : (
                "Send Code"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
