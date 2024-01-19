import  {React, useEffect}from "react";
import { IoClose } from "react-icons/io5";

const VerificationModal = ({ verification, onClose }) => {

    useEffect(() => {
        
        document.body.classList.add('modal-open');
    
        return () => {
          document.body.classList.remove('modal-open');
        };
      }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:max-w-md">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-4 "
          >
            <IoClose size={30} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5 text-center  font-bold text-lg">
          <p>{verification}</p>
         
        </div>
      </div>
    </div>


//     <div className="modal">
//     <div className="modal-content">
//       <p>{verification}</p>
//       <button onClick={onClose}>Close</button>
//     </div>
//   </div>
  );
};

export default VerificationModal;
