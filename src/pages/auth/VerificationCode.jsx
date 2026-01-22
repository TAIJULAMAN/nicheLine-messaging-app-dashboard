import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useVerifyEmailMutation } from "../../Redux/api/auth/authApi";
import { setUser } from "../../Redux/Slice/authSlice";
import { decodeAuthToken } from "../../utils/decode-access-token";
import Swal from "sweetalert2";

function VerificationCode() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleVerifyCode = async () => {
    // Combine the code array into a single string
    const verificationCodeString = code.join("");

    // Validate that all digits are filled
    if (verificationCodeString.length !== 4) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter the complete 4-digit verification code",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }

    // Convert to number as required by the API
    const verificationCode = parseInt(verificationCodeString, 10);

    try {
      const response = await verifyEmail({ verificationCode }).unwrap();

      // Decode the token to get user information
      const token = response?.data?.token || response.token;
      if (token) {
        const decodedToken = decodeAuthToken(token);
        console.log("Decoded Token:", decodedToken);
        console.log("User ID from token:", decodedToken?.userId || decodedToken?.id || decodedToken?._id);

        // Store user data in Redux for password reset
        dispatch(setUser({
          user: {
            _id: decodedToken?.userId || decodedToken?.id || decodedToken?._id,
            ...decodedToken
          },
          token: token,
          refreshToken: response?.data?.refreshToken || response.refreshToken,
        }));
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Verification successful!",
        confirmButtonColor: "#00e0b7",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate to reset password page after a short delay
      setTimeout(() => {
        navigate("/new-password");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error?.data?.message || "Invalid verification code. Please try again.",
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

        <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-center items-center">
            <p className="text-xl text-white font-bold mb-4">
              Enter Verification Code
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-5">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-2xl text-center bg-[#1f2937] border border-gray-700 text-[#00e0b7] rounded-xl focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] focus:outline-none transition-all placeholder:text-gray-600"
                disabled={isLoading}
              />
            ))}
          </div>
        </form>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleVerifyCode}
            type="button"
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
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
