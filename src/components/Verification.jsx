import { React, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const VerificationModal = ({ verification, onClose }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");

    // Add event listener to close modal when clicking outside of it
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);

    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className=" bg-white rounded-lg shadow-md p-6 w-[90%] md:max-w-md modal-content">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 "
          >
            <IoClose size={30} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="w-[90%] p-4 md:p-5 text-center  font-bold text-lg">
          <p>{verification}</p>
        </div>
      </div>
    </div>


  );
};

export default VerificationModal;
