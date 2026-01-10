import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

export default function Settings() {
  return (
    <div className="w-full mx-auto">
      {/* Card */}
      <div className="bg-[#0e1527] rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-[#00e0b7] px-6 py-4">
          <h1 className="text-[#0E1527] text-xl sm:text-2xl font-bold">
            Settings
          </h1>
        </div>

        {/* List */}
        <ul className="divide-y divide-[#1f2937]">
          {/* Edit Profile */}
          <li>
            <Link
              to="/profile"
              className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition duration-300"
            >
              <span className="text-white text-base font-medium">Edit Profile</span>
              <IoChevronForward className="text-[#00E0B7] text-xl" />
            </Link>
          </li>
          {/* Privacy Policy */}
          <li>
            <Link
              to="/privacy-policy"
              className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition duration-300"
            >
              <span className="text-white text-base font-medium">Privacy Policy</span>
              <IoChevronForward className="text-[#00E0B7] text-xl" />
            </Link>
          </li>
          {/* Terms & Conditions */}
          <li>
            <Link
              to="/terms-and-condition"
              className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition duration-300"
            >
              <span className="text-white text-base font-medium">
                Terms & Conditions
              </span>
              <IoChevronForward className="text-[#00E0B7] text-xl" />
            </Link>
          </li>
          {/* About Us */}
          <li>
            <Link
              to="/about-us"
              className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition duration-300"
            >
              <span className="text-white text-base font-medium">About Us</span>
              <IoChevronForward className="text-[#00E0B7] text-xl" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
