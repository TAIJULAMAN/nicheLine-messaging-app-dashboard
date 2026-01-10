import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerificationCode() {
  const [code, setCode] = useState(new Array(5).fill(""));

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    navigate(`/new-password`);
  };

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-xl bg-[#0e1527] p-8 md:px-10 md:py-12 shadow-2xl shadow-gray-200/50 rounded-2xl">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>

        <form className="space-y-6 mt-5">
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
                className="w-14 h-14 text-2xl text-center bg-[#1f2937] border border-gray-700 text-[#00e0b7] rounded-xl focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] focus:outline-none transition-all placeholder:text-gray-600"
              />
            ))}
          </div>
        </form>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleVerifyCode}
            type="button"
            className="w-full bg-[#00e0b7] text-[#0E1527] font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95 transition-all duration-300"
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
