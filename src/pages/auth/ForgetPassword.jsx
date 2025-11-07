import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
  
          <div className="w-full md:max-w-3xl bg-[#0e1527] p-5 md:px-18 md:py-28 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-2xl">
            <div className="flex justify-center items-center mb-10">
              <img src="/logo.png" alt="" />
            </div>
            <form className="space-y-5">
              <div>
                <label className="text-xl text-white mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="nahidhossain@gmail.com"
                  className="w-full px-5 py-3 border-2 border-white rounded-md outline-none mt-5 placeholder:text-xl text-white"
                  required
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate("/verification-code")}
                  type="button"
                  className="w-1/3 bg-[#00e0b7] text-white font-bold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
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
