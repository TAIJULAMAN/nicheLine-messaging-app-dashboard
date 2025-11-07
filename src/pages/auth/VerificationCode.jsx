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

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    navigate(`/new-password`);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-3xl bg-[#0e1527] p-5 md:px-18 md:py-28 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-2xl">
        <div className="flex justify-center items-center mb-10">
          <img src="/logo.png" alt="" />
        </div>

        <form className="space-y-5 mt-5">
        <div className="flex justify-center items-center">
            <p className="text-xl text-white my-5 font-bold">
            Enter Verification Code
          </p>
        </div>
          <div className="flex justify-center gap-2 mt-5">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#00e0b7] text-[#00e0b7] rounded-lg focus:outline-none"
              />
            ))}
          </div>
        </form>
        <div className="flex justify-center items-center my-5">
          <button
            onClick={handleVerifyCode}
            type="button"
            className="w-1/3 bg-[#00e0b7] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>

  );
}

export default VerificationCode;
