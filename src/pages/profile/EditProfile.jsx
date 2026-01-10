function EditProfile() {
  return (
    <div className="w-full flex justify-center items-center p-0">
      <div className="bg-[#0e1527] w-full max-w-xl px-6 sm:px-8 md:px-10 py-8 rounded-2xl shadow-lg shadow-gray-200/50">
        <p className="text-white text-center font-bold text-xl sm:text-2xl mb-8">
          Edit Your Profile
        </p>
        <form className="space-y-6">
          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              User Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-gray-300 mb-2 font-medium block">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              className="w-full px-4 py-3 bg-[#1f2937] border border-gray-700 text-white rounded-xl outline-none placeholder:text-gray-500 focus:border-[#00e0b7] focus:ring-1 focus:ring-[#00e0b7] transition-all"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="text-center pt-4">
            <button className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl hover:opacity-90 transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30">
              Save & Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
