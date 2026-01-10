import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import RecentUsers from "../../components/dashboard/RecentUsers";
import TotalView from "../../components/dashboard/TotalView";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 whitespace-nowrap min-h-[100px] md:h-[100px] rounded-2xl bg-[#0e1527] text-[#fff] p-4 md:p-0 shadow-lg shadow-gray-200/50">
        <div className="relative flex flex-col justify-center items-center p-3 gap-1 border-b border-gray-700 md:border-b-0">
          <p className="text-3xl font-bold bg-gradient-to-r from-[#00E0B7] to-white/80 bg-clip-text text-transparent">1200k</p>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total User</p>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gray-700" />
        </div>
        <div className="relative flex flex-col justify-center items-center p-3 gap-1 border-b border-gray-700 md:border-b-0">
          <p className="text-3xl font-bold bg-gradient-to-r from-[#00E0B7] to-white/80 bg-clip-text text-transparent">120</p>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Last Month User</p>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gray-700" />
        </div>
        <div className="flex flex-col justify-center items-center p-3 gap-1">
          <p className="text-3xl font-bold bg-gradient-to-r from-[#00E0B7] to-white/80 bg-clip-text text-transparent">120</p>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">This Week User</p>
        </div>
      </div>

      <div className="w-full p-5 bg-[#0e1527] rounded-lg shadow-md mt-5">
        <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
          <div>
            <h1 className="text-white text-xl font-semibold">User Growth</h1>
          </div>
          <div className="flex justify-between items-center gap-5 whitespace-nowrap">
            <div className="relative w-full md:w-32">
              {/* Selected Year Display */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-[#00e0b7] rounded-md flex justify-between items-center bg-white transition"
              >
                <span className="text-[#00e0b7]">{selectedYear}</span>
                <FaChevronDown className="text-[#00e0b7] w-5 h-5 ml-5" />
              </button>

              {/* Dropdown List */}
              {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-lg">
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => handleSelect(year)}
                      className={`p-2 cursor-pointer hover:bg-gray-100 transition ${year === selectedYear ? "bg-gray-200" : ""
                        }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <TotalView />
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-5">Recent Joined User</h1>
        <RecentUsers />
      </div>
    </div>
  );
}

export default DashboardPage;
