import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TermsCondition() {
  const navigate = useNavigate();
  const [content, setContent] = useState(
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum."
  );

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
        <h1 className="text-[#0E1527] text-xl sm:text-2xl font-bold">
          Terms & Conditions
        </h1>
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
          onClick={() => console.log(content)}
          className="bg-[#00e0b7] text-[#0E1527] font-bold w-full py-3.5 rounded-xl transition duration-300 shadow-lg shadow-[#00e0b7]/20 hover:shadow-xl hover:shadow-[#00e0b7]/30 hover:opacity-95"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default TermsCondition;
