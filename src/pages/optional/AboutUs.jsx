import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoChevronBack } from "react-icons/io5";
import { useGetAboutUsQuery, useCreateAboutUsMutation } from "../../Redux/api/aboutUsApi";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";

function AboutUs() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { data: aboutUsData, isLoading: isFetching, } = useGetAboutUsQuery();
  console.log("aboutUsData", aboutUsData);
  const [createAboutUs, { isLoading: isUpdating }] = useCreateAboutUsMutation();

  useEffect(() => {
    if (aboutUsData?.data?.aboutUs) {
      setContent(aboutUsData?.data?.aboutUs);
    }
  }, [aboutUsData]);

  const handleSave = async () => {
    if (!content || content.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "About Us content cannot be empty",
        confirmButtonColor: "#00e0b7",
      });
      return;
    }
    try {
      const response = await createAboutUs({ aboutUs: content }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "About Us updated successfully!",
        confirmButtonColor: "#00e0b7",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Update About Us error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Failed to update About Us. Please try again.",
        confirmButtonColor: "#00e0b7",
      });
    }
  };

  if (isFetching || isUpdating) return <Loader />

  return (
    <div className="md:p-0 space-y-5">
      <div className="bg-[#00e0b7] px-5 py-3 rounded-md mb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0E1527] hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-[#0E1527] text-xl sm:text-2xl font-bold">About Us</h1>
      </div>
      <div className="bg-[#0e1527] rounded-2xl shadow-lg shadow-gray-200/50 p-6 h-full">
        <div className="bg-white rounded-lg overflow-hidden">
          <ReactQuill
            style={{ minHeight: "300px" }}
            theme="snow"
            value={content}
            onChange={setContent}
            className="text-gray-800"
          />
        </div>
      </div>
      <div className="text-center py-5">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUpdating ? (
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
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>

    </div>
  );
}

export default AboutUs;
