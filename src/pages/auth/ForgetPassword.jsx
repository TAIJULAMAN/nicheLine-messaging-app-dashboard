import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex items-center justify-center p-5">
      <div className="w-full md:max-w-xl bg-[#0e1527] p-8 md:px-10 md:py-12 shadow-2xl shadow-gray-200/50 rounded-2xl">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
        <form className="space-y-8">
          <div>
            <label className="text-base text-gray-300 mb-2 font-medium block">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              required
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/verification-code")}
              type="button"
              className="w-full bg-[#00e0b7] text-[#0E1527] font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95 transition-all duration-300"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
