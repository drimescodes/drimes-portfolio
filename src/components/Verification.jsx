import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { drimes_avatar } from "../assets";

const VerificationModal = ({ verification, onClose }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");

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

  const isSuccess = verification.includes("Sent");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#222222] border border-[#3a3a3d] rounded-2xl shadow-xl p-6 w-[90%] md:max-w-sm modal-content relative animate-[fadeIn_0.2s_ease-out]">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-[#cacaca] transition-colors"
        >
          <IoClose size={22} />
        </button>

        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <img
            src={drimes_avatar}
            alt="Drimes"
            className="w-16 h-16 rounded-full mb-4 border-2 border-[#54d5bb]/30"
          />
          <p className={`text-base font-medium ${isSuccess ? "text-[#54d5bb]" : "text-red-400"}`}>
            {verification}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VerificationModal;
